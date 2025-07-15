<?php

namespace App\DAO\SourceDonnes;
use App\DAO\SourceDonnes\InterfaceDAO;

interface LikeDAO {

    public function AddLikeToActivity(int $userId, int $activityId);
}