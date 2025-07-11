<?php

namespace App\Providers;
use App\DAO\BD\UserDAOImpl;
use App\DAO\SourceDonnes\UserDAO;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserDAO::class, UserDAOImpl::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
