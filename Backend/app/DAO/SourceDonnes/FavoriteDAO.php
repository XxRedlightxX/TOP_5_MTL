<?php

namespace App\DAO\SourceDonnes;
use App\Models\User;
use App\DAO\SourceDonnes\InterfaceDAO;


interface FavoriteDAO extends InterfaceDAO {

    public function getFavoriteActivities(int $userId, int $activityId);

    public function addActivityToFavorite(int $userId, int $activityId);

    public function deleteActivityToFavorite(int $userId, int $activityId);
}