<?php

use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\Events\MessageSent;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Models\Conversation;
use App\Service\FollowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast; 


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/users",[UserController::class, 'getUserList']);

Route::get('/user/search', [UserController::class, 'getUserByEmail']);

Route::post('/user/profile-picture', [UserController::class, 'updateProfilePicture']);


// routes/api.php
Route::get('/utilisateur/{user}/activites', [UserController::class, 'index']);

Route::get('/user/search', [UserController::class, 'getUserBySearchUser']);

Route::post("/user",[UserController::class, 'addUser']);

Route::put('/user/{userId}', [UserController::class, 'modifyUser']);

Route::options('/user/activite', function () {
    return response()->json();
});

// Your existing POST route
Route::post("/user/activite", [ActiviteController::class, 'addActivityUser']);

Route::delete("/user/{userId}",[UserController::class, 'deleteUser']);

Route::get('/activite', [ActiviteController::class, 'getAllActivities']);

Route::get('/user/activite', [ActiviteController::class, 'getUserActivities']);

Route::get('/activite/test', [ActiviteController::class, 'getUpcomingActivities']);

Route::get('/activite/{activityId}', [ActiviteController::class, 'getAvgRatingActiviy'])->whereNumber('activityId');

Route::get('/likedActivities', [ActiviteController::class, 'getActivitiesMostLiked']);

Route::get('/categories', [ActiviteController::class, 'getActivitiesCategories']);



// Multi-filtrage fonctionnel
Route::get('/activite/filtrer', [ActiviteController::class, 'getActivityFilters']);


Route::post('/activite/{activiteId}', [ActiviteController::class, 'modifyActivity']);

Route::delete('/activite/{activiteId}', [ActiviteController::class, 'deleteActivityById']);

Route::get('/activite/filter', [ActiviteController::class, 'getActivityFilter']);
// Conversation

Route::get('/messagerie/conversation/{userB}', [ConversationController::class, 'getConversationBySender']);

Route::post('/messagerie/conversation', [ConversationController::class, 'sendMessage']);


// Likes 

Route::post('/activite/{activiteId}/likes', [LikeController::class, 'addtoActivitybyUserId']);

Route::delete('activite/{activiteId}/likes', [LikeController::class, 'deletelikeActivityByUser']);

Route::get('/activite/likes', [LikeController::class, 'getAllFromUserById']);


// Follows

Route::post('/follow', [FollowController::class, 'addFollowAUser']);

Route::delete('/follow/{followedId}', [FollowController::class, 'deleteFollow']);

Route::get('/followers', [FollowController::class, 'getfollowers']);

Route::get('/followings', [FollowController::class, 'getfollowings']);

//Favorites

Route::post('/favorite', [FavoriteController::class, 'addActivityToFavorite']);

Route::get('/favorite', [FavoriteController::class, 'getAllFavoriteActivites']);

Route::delete('/favorite/{activityId}', [FavoriteController::class, 'deleteFavoriteActivity']);


// Comments
Route::post('/activity/{activityId}/comments', [ActiviteController::class, 'addCommentToActivity']);

Route::get('/user/{userId}/activites/comments', [ActiviteController::class, 'test']);

Route::get('/activity/{activityId}/comments', [ActiviteController::class, 'getActivityWithComments']);


// Login 
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/messages/{friend}', function (User $friend, Request $request) {
    $message = Conversation::create([
        'expediteur_id' => $request->user()->id,
        'destinataire_id' => $friend->id,
        'text' => request()->input('message')
    ]);

    broadcast(new MessageSent($message));

    return  $message;
});

Route::get('/messages/{friend}', function (User $friend,  Request $request) {
    return  Conversation::query()
        ->where(function ($query) use ($friend, $request) {
            $user = $request->user();
            $query->where('expediteur_id', $user->id)
                ->where('destinataire_id', $friend->id);
        })
        ->orWhere(function ($query) use ($friend ,$request) {
            $user = $request->user();
            $query->where('expediteur_id', $friend->id)
                ->where('destinataire_id', $user->id);
        })
       ->with(['expediteur', 'destinataire'])
       ->orderBy('id', 'asc')
       ->get();
});


Route::get('/test-route', function () {
    return response()->json(['message' => 'API routes are working ✅']);
});





Route::post('/test-broadcast-debug', function (Request $request) {
    \Illuminate\Support\Facades\Log::info('Test broadcast endpoint called', ['user_id' => $request->user()]);
    
    $testMessage = (object) [
        'id' => 9999,
        'expediteur_id' => $request->user()->id,
        'destinataire_id' => 8,
        'contenu' => 'Debug test message',
        'date' => now(),
    ];
    
    \Illuminate\Support\Facades\Log::info('Broadcasting test message', (array) $testMessage);
    
    broadcast(new MessageSent($testMessage));
    
    return response()->json(['message' => 'Test broadcast sent']);
})->middleware('auth:sanctum');




Route::post('/test-reverb-direct', function (Request $request) {
    \Illuminate\Support\Facades\Log::info('=== DIRECT REVERB TEST ===');
    
    try {
        // Create test conversation data
        $testData = (object) [
            'id' => 99999,
            'expediteur_id' => $request->user()->id,
            'destinataire_id' => 4, // Make sure this user exists
            'contenu' => 'DIRECT REVERB TEST',
           
        ];
        
        \Illuminate\Support\Facades\Log::info('Broadcasting MessageSent event...');
        
        // Use the broadcast helper - this is the correct way
        broadcast(new MessageSent($testData));
        
        \Illuminate\Support\Facades\Log::info('✅ MessageSent event broadcast successfully');
        
        return response()->json([
            'status' => 'success',
            'message' => 'MessageSent event broadcast via Reverb',
            'channels' => [
                'chat.' . $request->user()->id,
                'chat.4'
            ],
            'event_name' => 'MessageSent'
        ]);
        
    } catch (\Exception $e) {
       \Illuminate\Support\Facades\Log::error('❌ Broadcast failed: ' . $e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
})->middleware('auth:sanctum');


Route::get('/test-reverb-server', function () {
    try {
        $reverb = Illuminate\Support\Facades\Broadcast::connection('reverb');
        $pusherInstance = $reverb->getPusher();
        
        // Test the connection
        $response = $pusherInstance->get('/apps/' . config('broadcasting.connections.reverb.app_id'));
        
        return response()->json([
            'status' => 'success',
            'reverb_server' => [
                'host' => config('broadcasting.connections.reverb.options.host'),
                'port' => config('broadcasting.connections.reverb.options.port'),
                'scheme' => config('broadcasting.connections.reverb.options.scheme'),
                'app_id' => config('broadcasting.connections.reverb.app_id'),
            ],
            'pusher_instance' => get_class($pusherInstance),
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'reverb_config' => config('broadcasting.connections.reverb')
        ], 500);
    }
});
Route::get('/test-reverb-simple', function () {
    try {
        $config = config('broadcasting.connections.reverb');
        
        // Just test if we can create the connection without HTTP calls
        $broadcaster = Illuminate\Support\Facades\Broadcast::connection('reverb');
        $pusher = $broadcaster->getPusher();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Reverb broadcaster initialized successfully',
            'config' => [
                'host' => $config['options']['host'],
                'port' => $config['options']['port'],
                'app_id' => $config['app_id'],
            ],
            'server_status' => 'Make sure Reverb is running on port 8082'
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'solution' => 'Run: php artisan reverb:start --port=8082 --host=127.0.0.1'
        ], 500);
    }
});


Route::get('/test-broadcast-simple', function () {
    \Illuminate\Support\Facades\Log::info('=== SIMPLE BROADCAST TEST ===');
    
    try {
        // Create simple test data
        $testData = (object) [
            'id' => 99999,
            'expediteur_id' => 1, // Hardcode for testing
            'destinataire_id' => 4,
            'contenu' => 'SIMPLE BROADCAST TEST - ' . now()->format('H:i:s'),
            'date' => now(),
            'created_at' => now(),
        ];
        
        \Illuminate\Support\Facades\Log::info('Attempting to broadcast...');
        
        // Broadcast the event
        broadcast(new MessageSent($testData));
        
        \Illuminate\Support\Facades\Log::info('✅ Broadcast method completed without errors');
        
        return response()->json([
            'status' => 'success', 
            'message' => 'Broadcast method executed - check Reverb terminal for actual delivery',
            'data_sent' => $testData,
            'channels' => ['chat.1', 'chat.4']
        ]);
        
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('❌ Broadcast failed: ' . $e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/debug-broadcast-driver', function () {
    $defaultDriver = config('broadcasting.default');
    $currentConnection = config('broadcasting.connections.' . $defaultDriver);
    
    \Illuminate\Support\Facades\Log::info('Current broadcast driver:', [
        'default' => $defaultDriver,
        'connection' => $currentConnection
    ]);
    
    return response()->json([
        'broadcast_default' => $defaultDriver,
        'current_connection' => $currentConnection,
        'env_BROADCAST_DRIVER' => env('BROADCAST_DRIVER'),
        'env_BROADCAST_CONNECTION' => env('BROADCAST_CONNECTION'),
        'all_connections' => array_keys(config('broadcasting.connections'))
    ]);
});

Route::get('/test-port-access', function () {
    $host = config('broadcasting.connections.reverb.options.host');
    $port = config('broadcasting.connections.reverb.options.port');
    
    try {
        $socket = @fsockopen($host, $port, $errno, $errstr, 5);
        
        if ($socket) {
            fclose($socket);
            return response()->json([
                'status' => 'success', 
                'message' => "Port {$port} is accessible on {$host}",
                'server' => "{$host}:{$port}"
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => "Cannot connect to {$host}:{$port} - {$errstr} ({$errno})",
                'solution' => 'Make sure Reverb is running: php artisan reverb:start --port=8082 --host=127.0.0.1'
            ], 500);
        }
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

