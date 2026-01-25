<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Policies\ActivityPolicy;
use App\Policies\UserPolicy;
use App\Models\Activite;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Activite::class => ActivityPolicy::class,
        User::class => UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
       $this->registerPolicies();
       // Gate::policy(Activite::class,  ActivityPolicy::class);

        // You can define Gates here if needed
    }
}
