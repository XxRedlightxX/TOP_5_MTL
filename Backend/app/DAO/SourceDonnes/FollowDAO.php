<?php

namespace App\DAO\SourceDonnes;
use App\DAO\SourceDonnes\InterfaceDAO;
use App\Models\User;

interface FollowDAO {

    public function addFollow(User $follower, User $followed);

    

}
