<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Service\ConversationService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ConversationController extends Controller
{


      protected $ConversationService;

      

      public function __construct(ConversationService $userService)
    {
        $this->ConversationService = $userService;
        $this->middleware('auth:sanctum');
    }

    public function getConversationBySender(Request $request, int $user2)
    {
         $currentUser = $request->user();

        $data = $this->ConversationService->getConversationBetweenUsers($currentUser->id, $user2);

        return response()->json([
            'meta' => [
                
                'last_message_at' => optional($data['messages']->last())->date,
            ],
            'participants' => [
                'current_user' => $request->user()->only(['id', 'name']),
                'other_user' => $data['other_user']->only(['id', 'name']),
            ],
            'messages' => ConversationResource::collection($data['messages'])
        ]);
 
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
