<?php

namespace App\Notifications;

use App\Models\Activite;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewEventNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */

    public $event;
    public function __construct(Activite $event)
    {
        $this->event = $event;
    }

    public function via($notifiable)
    {
        return ['broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'id'          => $this->event->id,
            'titre'       => $this->event->titre,
            'description' => $this->event->description,
            'date_debut'  => $this->event->date_debut,
            'latitude'  => $this->event->latitude,
            'longitude'  => $this->event->longitude,
            'lieu'  => $this->event->lieu,
            'statut_journee'  => $this->event->statut_journee,
            'image_data'  => $this->event->image_data,
            'saison_id'  => $this->event->saison_id,
            'type_id'  => $this->event->type_id,
            
            
        ]);
    }

    //  broadcast on a public channel
    public function broadcastOn()
    {
        return ['public-events'];
    }

    public function broadcastAs()
{
    return 'new-event';
}

    

    
}
