<?php

namespace App\DAO\SourceDonnes;
use App\Models\User;
use App\DAO\SourceDonnes\InterfaceDAO;


interface UserDAO extends InterfaceDAO {
    
    public function save(array $userData);

    public function checkEmailAndPasswordExist(string $email, $password);
    public function update(int $userid, array $data): ?User;
    public function getByEmail(string $email);
    public function addActivity(int $userId, array $activityData);

    public function isFollowing(User $follower, User $followed): bool;

    public function follow(User $follower, User $followed): void;

    public function unfollow(User $follower, User $followed): void;

    public function getFollowers(User $user);

     public function getFollowings(User $user);

     public function findById(int $userid);



}