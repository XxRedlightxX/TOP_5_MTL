<?php

namespace App\DAO\SourceDonnes;
use App\DAO\SourceDonnes\InterfaceDAO;

interface LikeDAO {

    public function AddLikeToActivity(int $userId, int $activityId);

    public function GetLikesByUserId(int $userId);

    public function userHasLikedActivity(int $userId, int $activityId): bool;

    public function incrementLikes(int $activityId);
}