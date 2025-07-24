<?php

namespace App\Http\Controllers;

use App\Service\LikeService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class LikeController extends Controller implements  HasMiddleware
{

    public static function middleware() {

       return [
            new Middleware('auth:sanctum')
        ];
    }
     protected $likeService;

    public function __construct(LikeService $likeService)
    {
        $this->likeService = $likeService;
    }


    public function addtoActivitybyUserId(Request $request, int $activityId) {

        $user =  $request->user();
        $result = $this->likeService->addLikeToActivityByUser($user->id, $activityId);
        try {
        return match ($result) {
            'liked' => response()->json(['message' => 'Like ajouté avec succès'], 200),
            'already_liked' => response()->json(['message' => 'Déjà liké'], 409),
            'user_not_found' => response()->json(['message' => 'Utilisateur non trouvé'], 404)};
           
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),500);
        }
        
    }

    public function deletelikeActivityByUser(Request $request, int $activityId)
    {
        $user =  $request->user();
        $result = $this->likeService->unlikeActivityByUser($user->id, $activityId);
        try {
            return match ($result) {
                'unliked' => response()->json(['message' => 'Like retiré avec succès'], 200),
                'not_liked' => response()->json(['message' => 'Like non trouvé'], 404),
                'user_not_found' => response()->json(['message' => 'Utilisateur non trouvé'], 404)};
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }


    public function getAllFromUserById(Request $request) {
        try {
           $user = $request->user(); // Authenticated user
            
            return $this->likeService->getAllFromUser($user->id);

        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

}
