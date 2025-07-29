<?php

namespace App\Providers;

use App\DAO\BD\ActiviteDAOImpl;
use App\DAO\BD\ConversationDAOImpl;
use App\DAO\BD\FavoriteDAOImpl;
use App\DAO\BD\FollowDAOImpl;
use App\DAO\BD\LikeDAOImpl;
use App\DAO\BD\UserDAOImpl;
use App\DAO\SourceDonnes\ActiviteDAO;
use App\DAO\SourceDonnes\ConversationDAO;
use App\DAO\SourceDonnes\FavoriteDAO;
use App\DAO\SourceDonnes\FollowDAO;
use App\DAO\SourceDonnes\LikeDAO;
use App\DAO\SourceDonnes\UserDAO;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserDAO::class, UserDAOImpl::class);
        $this->app->bind(ConversationDAO::class, ConversationDAOImpl::class);
        $this->app->bind(ActiviteDAO::class, ActiviteDAOImpl::class);
        $this->app->bind(LikeDAO::class, LikeDAOImpl::class);
        $this->app->bind(FollowDAO::class, FollowDAOImpl::class);
         $this->app->bind(FavoriteDAO::class, FavoriteDAOImpl::class);
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
