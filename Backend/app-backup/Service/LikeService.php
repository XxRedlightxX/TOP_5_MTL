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

    /*public function AddLikeToActivitybyUser(int $userId, int $activityId) {
        $user=User::find($userId);

        if ($user->likes()->where('activite_id', $activityId)->exists()) {
            return response()->json(['message' => 'Déjà liké'], 409);
        }
        $this->daoLike->AddLikeToActivity($userId, $activityId);
        $this->daoLike->incrementLikes($activityId);
    }*/

    public function addLikeToActivityByUser(int $userId, int $activityId): string
    {
        $user = User::findOrFail($userId);
        if (!$user) {
            return 'user_not_found';
        }

        if ($this->daoLike->userHasLikedActivity($userId, $activityId)) {
            return 'already_liked';
        }

        $this->daoLike->addLikeToActivity($userId, $activityId);
        $this->daoLike->incrementLikes($activityId);

        return 'liked';
    }

    public function unlikeActivityByUser(int $userId, int $activityId): string
    {
        $user = User::find($userId);
        if (!$user) {
            return 'user_not_found';
        }

        if (!$this->daoLike->userHasLikedActivity($userId, $activityId)) {
            return 'not_liked';
        }

        $this->daoLike->deleteLikeToActivity($userId, $activityId);
        $this->daoLike->decrementLikes($activityId);

        return 'unliked';
    }


    public function getAllFromUser(int $userId) {
        return $this->daoLike->getLikesByUserId($userId);
    }
}