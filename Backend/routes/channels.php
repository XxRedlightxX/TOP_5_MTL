<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Broadcast::channel('chat.{userId}', function ($user, $userId) {
    \Illuminate\Support\Facades\Log::info("Channel auth check", ['user_id' => $user->id, 'channel_user_id' => $userId]);
    return (int) $user->id === (int) $userId;
});


