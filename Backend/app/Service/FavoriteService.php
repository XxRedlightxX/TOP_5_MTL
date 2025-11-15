<?php

namespace App\Service;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\DAO\SourceDonnes\ConversationDAO;
use App\DAO\SourceDonnes\FavoriteDAO;
use App\Models\Conversation;
use App\Models\User;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FavoriteService {

    protected $favoriteDAO;
    protected $userDAO;
    protected $activiteDAO;

    public function __construct(FavoriteDAO $favoriteDAO, UserDAO $userDAO, ActiviteDAO $activiteDAO) {
        $this->favoriteDAO = $favoriteDAO;
        $this->userDAO = $userDAO;
        $this->activiteDAO = $activiteDAO;
    }

   public function addFavoriteActivity(int $userId, int $activityId): array
    {
        $existUser = $this->userDAO->findById($userId);
        $existActivity = $this->activiteDAO->getById($activityId);
        
        if (!$existUser || !$existActivity) {
            throw new \Exception('User or activity not found');
        }
        
        $isExisting = $this->favoriteDAO->isFavoriteActivityUser($existUser, $existActivity);
        
        if ($isExisting) {
            $this->favoriteDAO->deleteActivityToFavorite($existUser->id, $existActivity->id);
            $favorited = false;
        } else {
            $this->favoriteDAO->addActivityToFavorite($userId, $activityId);
            $favorited = true;
        }
        
        return [
            'favorited' => $favorited,
            
        ];
    }

    public function IsFavoriteActivityFromUser(int $userId, int $activityId): bool {
        $existUser = $this->userDAO->findById($userId);
        $existActivity = $this->activiteDAO->getById($activityId);
        
        if (!$existUser || !$existActivity) {
            throw new \Exception('User or activity not found');
        }
        return $this->favoriteDAO->isFavoriteActivityUser($existUser,$existActivity );
    }

    public function DeleteFavoriteActivityFromUser(int $userId, Int $activityId) {
        $existUser = $this->userDAO->findById($userId);
        $existActivity = $this->activiteDAO->getById($activityId);
        
        $isExisting = $this->IsFavoriteActivityFromUser($existUser->id, $existActivity->id);

          if (!$existUser || !$existActivity) {
            throw new \Exception('User or activity not found');
        }

        if ($isExisting) {
            $this->favoriteDAO->deleteActivityToFavorite($existUser->id, $existActivity->id);
            $favorited = false;
        }

        return $favorited;
    }
}