<?php

namespace App\DAO\BD;
use App\DAO\SourceDonnes\ConversationDAO;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Conversation;
use App\Models\User;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class ConversationDAOImpl implements ConversationDAO {


    /**
     * @inheritDoc
     */
  

    /**
     * @inheritDoc
     */
    public function delete(int $id) {
    }

    /**
     * @inheritDoc
     */
    public function getAll() {
    }

    /**
     * @inheritDoc
     */
    public function getById(int $id) {
    }

    /**
     * @inheritDoc
     */
    public function save(array $conversationData) {
        return Conversation::create( $conversationData);
    }

    /**
     * @inheritDoc
     */
    public function update(int $id, array $data) {
    }

    /**
     * @inheritDoc
     */
    public function getConversation(int $userA, int $userB) {
        
        return Conversation::where(function ($query) use ($userA, $userB) {
            $query->where('expediteur_id', $userA)->where('destinataire_id', $userB);
        })->orWhere(function ($query) use ($userA, $userB) {
            $query->where('expediteur_id', $userB)->where('destinataire_id', $userA);
        })->orderBy('date', 'asc')->get();

    }
}
