<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
            'id'         => $this->id,
            'titre'      => $this->titre,
            'image_data'      => $this->image_data,
            'description'=> $this->description,
            'date_debut'  => $this->date_debut,
            'date_fin'  => $this->date_fin,
            'latitude'  => $this->latitude,
            'longitude'  => $this->longitude,
            'lieu'       => $this->lieu,
            'nombre_likes' => $this->nombre_likes,

            // Activity creator
            'creator'    => [
                'id'    => $this->User->id,
                'username'  => $this->User->username,
                'avatar'  => $this->User->avatar,
                'email' => $this->User->email,
            ],

            // Comments / Avis
            'avis'       => $this->avis->map(function ($avis) {
                return [
                    'id'       => $avis->id,
                    'contenu'  => $avis->contenu,
                    'etoiles'  => $avis->etoiles,
                    'date'     => $avis->date,
                    'user'     => [
                        'id'    => $avis->User->id,
                        'name'  => $avis->User->username,
                        'image_data' => $avis->User->image_data,
                        'email' => $avis->User->email,
                    ]
                ];
            }),
        ];
    
    }
}
