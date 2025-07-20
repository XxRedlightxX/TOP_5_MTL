<?php

namespace App\DAO\SourceDonnes;
use App\Models\User;
use App\DAO\SourceDonnes\InterfaceDAO;


interface ConversationDAO extends InterfaceDAO {
    
    public function getConversation(int $userA, int $userB);
}



