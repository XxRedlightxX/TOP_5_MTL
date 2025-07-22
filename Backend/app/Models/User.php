<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens ,HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $table = 'Utilisateur';
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

     
     

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function activites()
    {
        return $this->hasMany(Activite::class, 'utilisateur_id');
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function favoris()
    {
        return $this->belongsToMany(Activite::class, 'favori', 'User_id', 'activite_id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, "utilisateur_id");
    }

    public function messagesEnvoyes()
    {
        return $this->hasMany(Conversation::class, 'expediteur_id');
    }

    public function messagesRecus()
    {
        return $this->hasMany(Conversation::class, 'destinataire_id');
    }

    public function followings()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'followed_id')->withTimestamps();
    }


    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'followed_id', 'follower_id')->withTimestamps();
    }

}
