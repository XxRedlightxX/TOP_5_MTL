<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResource;
use App\Models\Activite;
use App\Models\Avis;
use App\Models\User;
use App\Service\ActiviteService;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Policies\ActivityPolicy;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Illuminate\Auth\Access\AuthorizationException;

class ActiviteController extends Controller 
{
   

    
    protected $userService;

    public function __construct(ActiviteService $userService)
    {
        $this->userService = $userService;
         $this->middleware('auth:sanctum');
    }

    public function getAllActivities() {
        return $this->userService->getActivitiesList();
    }

    public function addActivityUser(Request $request)
    {
          
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'lieu' => 'required|string|max:255',
            'statut_journee' => 'required|in:JOUR,NUIT', 
            'saison_id' => 'required|exists:saison,id',
            'image_data' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

         $path = $request->file('image_data')->store('events', 'public');
         $user =  $request->user();

         $this->authorize('create',$user );
        
        $activity = $this->userService->createActivite($validated['titre'],$user->id, $validated);
        $activity->image_data=$path;
        $activity->update();
        return response()->json([
           $path,
            $activity
        ], 201);
    }

    public function modifyActivity(int $activiteId, Request $request) {
         try {
          
             $activite = Activite::findOrFail($activiteId);
             $this->authorize('update', $activite);

         
            $validatedInputActivity = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'required|string',
                'date' => 'required|date',
                'lieu' => 'required|string|max:255',
                'statut_journee' => 'required|in:JOUR,NUIT', 
            ]);

            $userValidated = $this->userService->updateActiviy($activiteId, $validatedInputActivity);
            return response()->json($userValidated, 202);
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
            'etoiles'=> 'nullable|integer|between:0,5',
        ]);

        $user =  $contenu->user();
        $userComment =$this->userService->addCommentToActivityFromUser( 
            $user->id , $activityId, 
    $validated['contenu'], $validated['etoiles']);

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

    public function getActivityFilter(Request $request) {
        $validated = $request->validate([
            'daytime' => 'nullable|string',
            'type'    => 'nullable|string',
            'season'  => 'nullable|string',
            'title'   => 'nullable|string',
        ]);
        if ($request->filled("season")) {
             $activiteSaison = $this->userService->getActivitiesBySeason($validated['season']);
        }
         if ($request->filled("title")) {
             $activiteSaison = $this->userService->getActivitiesByName($validated['title']);
        }
         if ($request->filled("type")) {
             $activiteSaison = $this->userService->getActivitiesBySeason($validated['season']);
        }
         if ($request->filled("daytime")) {
             $activiteSaison = $this->userService->getActivitiesByDaytime($validated['daytime']);
        }

        return response()->json($activiteSaison);
    }

    public function getActivityWithComments(int $activityId) {

        //$activity = Activite::findOrFail($activityId);
   $activity = Activite::with([
        'User',
        'avis.User'
    ])->findOrFail($activityId);

    // This will remove "data" and still use your resource
    return response()->json(
        (new ActivityResource($activity))
    );

        //return $activity->load('User.activites.avis.User');

        //return $activity->load('User.activities');
    }










}
