<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
           return [
            'id' => $this->id,
            'content' => $this->contenu,
            'sent_at' => $this->date,
            'is_own_message' => $this->expediteur_id === $request->user()->id,
            'sender' => [
                'id' => $this->expediteur->id,
                'name' => $this->expediteur->name,
                'avatar' => $this->expediteur->avatar_url 
            ]
        ];
    }
}
