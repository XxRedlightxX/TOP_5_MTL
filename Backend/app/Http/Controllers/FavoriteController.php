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


    public function getAllFavoriteActivites(User $user) {

        return $user->load('favoris');
    }

    public function addActivityToFavorite(Request $request) {
        $validated = $request->validate([
            'id' => 'required'
        ]);

        $user =  $request->user();

        $this->userService->addFavoriteActivity($user->id, $validated['id']);

        return response()->json([
           ""
        
        ], 201);

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
