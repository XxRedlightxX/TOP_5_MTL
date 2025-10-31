<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Broadcast::channel('chat.{userId}', function ($user, $userId) {
    \Illuminate\Support\Facades\Log::info("Channel auth check", ['user_id' => $user->id, 'channel_user_id' => $userId]);
    return (int) $user->id === (int) $userId;
});


Route::get('/test-channel-auth2', function (Request $request) {
    try {
        $user = $request->user();
        
        // Test if user can access their own chat channel
        $canAccessOwnChannel = Broadcast::auth($request->merge([
            'channel_name' => 'chat.' . $user->id
        ]));
        
        // Test if user CANNOT access someone else's channel
        $cannotAccessOthers = false;
        try {
            Broadcast::auth($request->merge([
                'channel_name' => 'chat.999' // Different user ID
            ]));
        } catch (\Exception $e) {
            $cannotAccessOthers = true;
        }
        
        return response()->json([
            'user_id' => $user->id,
            'channel_auth_tests' => [
                'can_access_own_channel' => (bool) $canAccessOwnChannel,
                'cannot_access_others_channel' => $cannotAccessOthers,
            ],
            'channels_defined' => [
                'chat.{userId}' => 'User can only access their own chat channel',
                'public-test-channel' => 'Public channel (no auth)',
                'test-channel' => 'Public test channel',
            ]
        ]);
        
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
})->middleware('auth:sanctum');
