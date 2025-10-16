<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $conversation;

    public function __construct($conversation)
    {
        $this->conversation = $conversation;
         
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('chat.'. $this->conversation->destinataire_id),
            new Channel('chat.'. $this->conversation->expediteur_id),
        ];
    }

    public function broadcastAs()
    {
        return 'MessageSent'; // Then Echo would listen for 'NewMessage'
    }

    public function broadcastWith()
    {
       return [
            'id' => $this->conversation->id,
            'expediteur_id' => $this->conversation->expediteur_id,
            'destinataire_id' => $this->conversation->destinataire_id,
            'contenu' => $this->conversation->contenu,
            
        ];
    }
}
