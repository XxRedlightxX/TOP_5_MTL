<?php

namespace App\Service;

use App\DAO\SourceDonnes\FollowDAO;
use App\DAO\SourceDonnes\LikeDAO;
use App\Models\User;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use Illuminate\Validation\ValidationException;



class FollowService {

   protected UserDAO $userDAO;

    public function __construct(UserDAO $userDAO)
    {
        $this->userDAO = $userDAO;
    }

    public function follow(int $followerId, int $followedId): User|string
    {
        $follower = $this->userDAO->findById($followerId);
        $followed = $this->userDAO->findById($followedId);

        if (!$follower || !$followed) {
             return 'user_not_found';
        }

        if ($follower->id === $followed->id) {
             return 'same_user';
        }

        $this->userDAO->follow($follower, $followed);
         return 'followed';
    }

    public function unfollow(int $followerId, int $followedId): void
    {
        $follower = $this->userDAO->findById($followerId);
        $followed = $this->userDAO->findById($followedId);

        if ($follower && $followed) {
            $this->userDAO->unfollow($follower, $followed);
        }
    }

    public function getFollowers(int $userId)
    {
        $user = $this->userDAO->findById($userId);
        return $user ? $this->userDAO->getFollowers($user) : [];
    }

    public function getFollowings(int $userId)
    {
        $user = $this->userDAO->findById($userId);
        return $user ? $this->userDAO->getFollowings($user) : [];
    }
     

}