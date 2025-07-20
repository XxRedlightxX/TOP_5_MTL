<?php

namespace App\Service;

use App\DAO\SourceDonnes\ConversationDAO;
use App\Models\Conversation;
use App\Models\User;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ConversationService {

    private $conversationDAO;

    public function __construct(ConversationDAO $conversationDAO) {
        $this->conversationDAO = $conversationDAO;
    }

    public function getConversationBetweenUsers(int $userA, int $userB)
    {
        return $this->conversationDAO->getConversation($userA, $userB);
    }

    public function sendMessage(int $senderId, int $receiverId, string $content): Conversation
    {
        return $this->conversationDAO->save([
            'expediteur_id' => $senderId,
            'destinataire_id' => $receiverId,
            'contenu' => $content,
            'date' => now()
        ]);
    }





}