<?php

namespace App\DAO\SourceDonnes;
use App\Models\User;
use App\DAO\SourceDonnes\InterfaceDAO;


interface UserDAO extends InterfaceDAO {
    
    public function save(array $userData);
    public function update(int $userid, array $data): ?User;
    public function getByEmail(string $email);


}