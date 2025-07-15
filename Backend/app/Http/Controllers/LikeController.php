<?php

namespace App\Http\Controllers;

use App\Service\LikeService;
use Illuminate\Http\Request;

class LikeController extends Controller
{
     protected $likeService;

    public function __construct(LikeService $likeService)
    {
        $this->likeService = $likeService;
    }


    public function AddtoActivitybyUserId(int $userId, int $activityId) {
        $result = $this->likeService->addLikeToActivityByUser($userId, $activityId);
        try {
        return match ($result) {
            'liked' => response()->json(['message' => 'Like ajouté avec succès'], 200),
            'already_liked' => response()->json(['message' => 'Déjà liké'], 409),
            'user_not_found' => response()->json(['message' => 'Utilisateur non trouvé'], 404),
            default => response()->json(['message' => 'Erreur inconnue'], 500)};
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
        
    }


    public function getAllFromUserById(int $userId) {
        try {
            $userActivitiesLikes = $this->likeService->getAllFromUser($userId);

            return response()->json($userActivitiesLikes);

        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }

}
