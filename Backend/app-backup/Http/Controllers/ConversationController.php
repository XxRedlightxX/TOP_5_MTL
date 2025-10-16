<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Events\MessageSent;
use App\Http\Resources\ConversationResource;
use App\Service\ConversationService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Log;


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

        return $this->ConversationService->getConversationBetweenUsers($currentUser->id, $user2);

        /*return response()->json([
            'meta' => [
                
                'last_message_at' => optional($data['messages']->last())->date,
            ],
            'participants' => [
                'current_user' => $request->user()->only(['id', 'name']),
                'other_user' => $data['other_user']->only(['id', 'name']),
            ],
            'messages' => ConversationResource::collection($data['messages'])
        ]);*/
 
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

    $message->load(['expediteur', 'destinataire']);

    Log::info('Message created', [
        'message_id' => $message->id,
        'type' => get_class($message),
        'expediteur_id' => $message->expediteur_id,
        'destinataire_id' => $message->destinataire_id
    ]);

    try {
        // Make sure $message is a Conversation model
        broadcast(new MessageSent($message));
        Log::info('✅ Broadcast successful');
        
        // Also log what was broadcast
        Log::info('Broadcast data:', [
            'channels' => ['chat.' . $message->expediteur_id, 'chat.' . $message->destinataire_id],
            'content' => $message->contenu
        ]);
        
    } catch (\Exception $e) {
        Log::error('❌ Broadcast failed: ' . $e->getMessage(), [
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ]);
    }

    return response()->json([
        'message' => 'Message envoyé avec succès',
        'data' => $message
    ], 201);
}
    /**
     * @inheritDoc
     */
   
}
