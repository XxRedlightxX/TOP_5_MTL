<?php

namespace App\Service;

use App\DAO\SourceDonnes\ConversationDAO;
use App\DAO\SourceDonnes\FavoriteDAO;
use App\Models\Conversation;
use App\Models\User;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FavoriteService {

    protected $favoriteDAO;

    public function __construct(FavoriteDAO $favoriteDAO) {
        $this->favoriteDAO = $favoriteDAO;
    }

    public function addFavoriteActivity(int $userId, Int $activityId) {
        $this->favoriteDAO->addActivityToFavorite($userId, $activityId);
    }

    public function DeleteFavoriteActivityFromUser(int $userId, Int $activityId) {
        $this->favoriteDAO->deleteActivityToFavorite($userId, $activityId);
    }
}