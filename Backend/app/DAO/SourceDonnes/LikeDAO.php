<?php

namespace App\DAO\SourceDonnes;
use App\DAO\SourceDonnes\InterfaceDAO;

interface LikeDAO {

    public function addLikeToActivity(int $userId, int $activityId);

    public function deleteLikeToActivity(int $userId, int $activityId);

    public function getLikesByUserId(int $userId);

    public function userHasLikedActivity(int $userId, int $activityId): bool;

    public function incrementLikes(int $activityId);

    public function decrementLikes(int $activityId);
}