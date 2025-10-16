<?php

namespace App\DAO\BD;
use App\DAO\SourceDonnes\ConversationDAO;
use App\DAO\SourceDonnes\FollowDAO;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Conversation;
use App\Models\User;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class FollowDAOImpl implements FollowDAO {
    

     public function addFollow(User $follower, User $followed): void
    {
        $follower->followings()->syncWithoutDetaching([$followed->id]);
    }
}
