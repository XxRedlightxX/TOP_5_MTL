<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResource;
use App\Models\Activite;
use App\Models\Avis;
use App\Models\Saison;
use App\Models\Type;
use App\Models\User;
use App\Notifications\NewEventNotification;
use App\Service\ActiviteService;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Policies\ActivityPolicy;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Illuminate\Auth\Access\AuthorizationException;

class ActiviteController extends Controller 
{
   

    
    protected $userService;

    public function __construct(ActiviteService $userService)
    {
        $this->userService = $userService;
         $this->middleware('auth:sanctum')->only([
        'addActivityUser',
        'modifyActivity',
        'deleteActivityById',
        'addCommentToActivity',
        'getUserActivities',
    ]);
    }

    public function getAllActivities() {
        return $this->userService->getActivitiesList();
    }

    public function addActivityUser(Request $request)
    {
        $path = null;
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'lieu' => 'required|string|max:255',
            'statut_journee' => 'required|in:JOUR,NUIT', 
            'saison_name' => 'required|string|exists:saison,statut', // Change to name
            'type_name' => 'required|string|exists:type,nom', 
            'image_data' => 'nullable|image|mimes:jpeg,png,jpg,gif'
        ]);

        
        $user = $request->user();

         
        if ($request->hasFile('image_data')) {
            $path = $request->file('image_data')->store('events', 'public');
        }

        $saison = $this->userService->getActivityFromSeason($validated['saison_name']);
        $type =  $this->userService->getActivityFromCategory($validated['type_name']);

        
        $validated['saison_id'] = $saison->id;
        $validated['type_id'] = $type->id;

        $this->authorize('create',$user );

        $activity = $this->userService->createActivite($validated['titre'],$user->id, $validated);
        $activity->image_data=$path;
        $activity->update();

        Notification::send($user, new NewEventNotification($activity));

        return response()->json([ $path, $activity
        ], 201);
    }

    public function modifyActivity(int $activiteId, Request $request) {
        try {
        
            $activite = Activite::findOrFail($activiteId);
            //$this->authorize('update', $activite);
        
            $validatedInputActivity = $request->validate([
                'titre' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'image_data' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'date_debut' => 'nullable|date',
                'lieu' => 'nullable|string|max:255',
                'statut_journee' => 'nullable|in:JOUR,NUIT', 
            ]);

            if ($request->hasFile('image_data')) {
            $image = $request->file('image_data');
            $imagePath = $image->store('events', 'public'); // saves in storage/app/public/activities
            $validatedInputActivity['image_data'] = $imagePath;
        } else {
            // Keep old image if no new file uploaded
            $validatedInputActivity['image_data'] = $activite->image_data;
        }

        
            
        return response()->json($this->userService->updateActiviy($activiteId, $validatedInputActivity),
            202);
    } catch (\Exception $e) {
        return response()->json($e->getMessage(),500);
    }
    }

   public function deleteActivityById(int $activiteId)
    {
        try {

            $activite = Activite::findOrFail($activiteId);
            Gate::authorize('delete', $activite);     
            $this->userService->deleteActivity($activiteId);
            return response()->json(['message' => 'Deleted successfully']);
        } catch (ModelNotFoundException $e) {
        return response()->json(['error' => "Activity $activiteId not found"], 404);
        } catch (\Exception $e) {
        return response()->json($e->getMessage(),500);
        }
    }

    public function addCommentToActivity( int $activityId, Request $contenu) {
        try {
            $validated = $contenu->validate([
                'contenu'=> 'required|min:3|max:1000',
                'etoiles' => 'nullable|between:0,5'
            ]);

            $user =  $contenu->user();
            $userComment =$this->userService->addCommentToActivityFromUser( $user->id , $activityId, $validated['contenu'], $validated['etoiles']);
            
            $this->userService->getEventAvgEtoiles($activityId);
            return response()->json($userComment);
    } catch (\Exception $e) {
        return response()->json($e->getMessage());
    }
    }

    public function test(int $userId) {
      $user = User::findOrFail($userId);
      return $user->load('avis');
   
    }

    public function getUserActivities(Request $request) {
        $authUser = $request->user();

        return $authUser->load('activites');
    }

     public function getActivityById(Request $request, int $activityId) {
        $authUser = $request->user();

        return $this->userService->findActivityById($activityId);
    }

    public function getUpcomingActivities() {
          return $this->userService->getActivitiesByUpcoming();
    }

    public function getAvgRatingActiviy($activityId) {
    $activityRating= $this->userService->getEventAvgEtoiles($activityId);
    $activity=Activite::findOrFail($activityId);
    $activity->nombre_likes=$activityRating;
    $activity->save();

    return [
        'average_rating' => round( $activityRating, 1),
        'activity' => $activity 
    ];
    }

    public function getActivitiesMostLiked() {
       return $this->userService->getActivitiesMostLiked();
    }

    public function getActivityWithComments(int $activityId) {

        //$activity = Activite::findOrFail($activityId);
   $activity = Activite::with([
        'User',
        'avis.User'
    ])->findOrFail($activityId);

    
    return response()->json(
        (new ActivityResource($activity))
    );

    }


    public function getActivityFilters(Request $request)
    {
        $validated = $request->validate([
            'daytime' => 'nullable|string',
            'type'    => 'nullable|string',
            'season'  => 'nullable|string',
            'title'   => 'nullable|string',
        ]);

        $activities = $this->userService->getActivitiesFiltered($validated);

        return response()->json($activities);
    }

    public function getActivitiesCategories() {
        return $this->userService->getAllCategoriesActivities();
    }










}
