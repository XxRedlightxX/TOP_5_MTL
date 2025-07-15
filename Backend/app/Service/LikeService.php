<?php

namespace App\Service;

use App\DAO\SourceDonnes\LikeDAO;
use App\Models\User;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;

class LikeService {
    private $daoLike;

    public function __construct(LikeDAO  $daoLike) {
        $this->daoLike = $daoLike;
    }

    public function AddLikeToActivitybyUser(int $userId, int $activityId) {
        $user=User::find($userId);
        if ($user->likes()->where('activite_id', $activityId)->exists()) {
            return response()->json(['message' => 'Déjà liké'], 409);
        }
        $this->daoLike->AddLikeToActivity($userId, $activityId);

    }
}