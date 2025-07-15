<?php

namespace App\DAO\BD;
use App\DAO\SourceDonnes\LikeDAO;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use App\Models\Like;
use App\Models\User;

class LikeDAOImpl implements LikeDAO {
    

    /**
     * @inheritDoc
     */
    public function AddLikeToActivity(int $userId, int $activityId) {
       Like::create([
        'utilisateur_id' => $userId,
        'activite_id' => $activityId,
    ]);
    }
}