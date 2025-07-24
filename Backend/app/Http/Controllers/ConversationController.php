<?php

namespace App\Http\Controllers;

use App\Service\ConversationService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ConversationController extends Controller implements HasMiddleware
{

     public static function middleware() {

        return [
            new Middleware('auth:sanctum')
        ];
    }
      protected $ConversationService;

      

      public function __construct(ConversationService $userService)
    {
        $this->ConversationService = $userService;
    }

    public function getConversationBySender(Request $request, int $user2)
    {
        try {
            $user = $request->user();
            $messages = $this->ConversationService->getConversationBetweenUsers($user->id, $user2);

            return response()->json(['data' => $messages], 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),500);
        }
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
           
            'destinataire_id' => 'required|exists:utilisateur,id|different:expediteur_id',
            'contenu' => 'required|string|max:1000',
        ]);
        $user = $request->user();
        $message = $this->ConversationService->sendMessage(
            $user->id,
            $validated['destinataire_id'],
            $validated['contenu']
        );

        return response()->json([
            'message' => 'Message envoyé avec succès',
            'data' => $message
        ], 201);
    }

    /**
     * @inheritDoc
     */
   
}
