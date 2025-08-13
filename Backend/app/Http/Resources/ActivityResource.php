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
            'description'=> $this->description,
            'date'       => $this->date,
            'lieu'       => $this->lieu,

            // Activity creator
            'creator'    => [
                'id'    => $this->User->id,
                'name'  => $this->User->name,
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
                        'name'  => $avis->User->name,
                        'avatar'  => $avis->User->avatar,
                        'email' => $avis->User->email,
                    ]
                ];
            }),
        ];
    
    }
}
