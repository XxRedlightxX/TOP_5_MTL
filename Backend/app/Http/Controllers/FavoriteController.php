<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use App\Models\User;
use App\Service\FavoriteService;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
     protected $userService;

    public function __construct(FavoriteService $userService)
    {
        $this->userService = $userService;
         $this->middleware('auth:sanctum');
    }


    public function getAllFavoriteActivites(Request $request) {
        $user =  $request->user();

        return $user->load('favoris');
    }

    public function IsFavoriteActivityFromUser(Request $request,int $activityId) {
        $authUser = $request->user();
        $IsExisting = $this->userService->IsFavoriteActivityFromUser($authUser->id, $activityId );
        return response()->json([
            'favorite' => $IsExisting,
            ], 200);
    }

    public function addActivityToFavorite(Request $request) 
    {
        $validated = $request->validate([
            'id' => 'required|integer'
        ]);

        $user = $request->user();

        try {
            $result = $this->userService->addFavoriteActivity($user->id, $validated['id']);
            
            $message = $result['favorited'] 
                ? 'Vous avez mis en favori un activite' 
                : 'Activité retirée des favoris';
            
            return response()->json([
                'message' => $message,
                'favorited' => $result['favorited'],
                
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function deleteFavoriteActivity(Request $request, int $activityId) {
         $user =  $request->user();

        $activite = Activite::find($activityId);

        $this->userService->DeleteFavoriteActivityFromUser($user->id, $activite->id );

         return response()->json([
           "This activity has been deleted from favorite ", $activite->id
        
        ], 204);


    }
}
