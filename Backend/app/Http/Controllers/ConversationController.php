<?php

namespace App\Http\Controllers;

use App\Service\ConversationService;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
      protected $ConversationService;

      public function __construct(ConversationService $userService)
    {
        $this->ConversationService = $userService;
    }

    public function conversation(int $user1, int $user2)
    {
        try {
        $messages = $this->ConversationService->getConversationBetweenUsers($user1, $user2);

        return response()->json(['data' => $messages], 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),500);
        }
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'expediteur_id' => 'required|exists:utilisateur,id',
            'destinataire_id' => 'required|exists:utilisateur,id|different:expediteur_id',
            'contenu' => 'required|string|max:1000',
        ]);

        $message = $this->ConversationService->sendMessage(
            $validated['expediteur_id'],
            $validated['destinataire_id'],
            $validated['contenu']
        );

        return response()->json([
            'message' => 'Message envoyé avec succès',
            'data' => $message
        ], 201);
    }
}
