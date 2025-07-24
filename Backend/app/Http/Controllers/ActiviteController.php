<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use App\Models\Avis;
use App\Models\User;
use App\Service\ActiviteService;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class ActiviteController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except : ['getAllActivities', 'getActivityByDayTime', 
            'getActivitybyType', 'getActivityBySeason',
            'getActivityByName'])
        ];
    }
    protected $userService;

    public function __construct(ActiviteService $userService)
    {
        $this->userService = $userService;
    }

    public function getAllActivities() {
        return $this->userService->getActivitiesList();
    }

    public function modifyActivity(int $activiteId, Request $request) {
         try {
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
            
      
        ]);

        $user =  $contenu->user();
        $userComment =$this->userService->addCommentToActivityFromUser( $user->id , $activityId, $validated['contenu']);
        
        return response()->json($userComment);
    } catch (\Exception $e) {
        return response()->json($e->getMessage());
    }
    }

    public function test(int $userId) {
       $avis = User::with('activites')->with('')
        
        ->get();

    return response()->json($avis);
    }


    
   public function getActivityByDayTime(Request $request)
    {
        $validated = $request->validate([
            'daytime' => 'required|string',
        ]);
        $activiteSaison = $this->userService->getActivitiesByDaytime($validated['daytime']);
        return response()->json($activiteSaison);
    }

    public function getActivitybyType(Request $request) {
        $validated =$request->validate([
            'type' => 'required|string', 
        ]);

        $activiteType = $this->userService->getActivitiesByType($validated['type']);
        return response()->json(  $activiteType);

    }
    
    public function getActivityBySeason(Request $request) {
        $validated =$request->validate([
            'season' => 'required|string', 
        ]);

        $activiteSaison = $this->userService->getActivitiesBySeason($validated['season']);
        return response()->json($activiteSaison);
    }

    public function getActivityByName(Request $request) {
        $validated =$request->validate([
            'title' => 'required|string', 
        ]);

        $activiteTitle = $this->userService->getActivitiesByName($validated['title']);
        return response()->json($activiteTitle);
    }







}
