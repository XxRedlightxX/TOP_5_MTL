/*import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


window.Echo = new Echo({
  broadcaster: 'reverb', // or 'pusher' protocol
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: '127.0.0.1', // 127.0.0.1
  wsPort: 8080,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth', // ✅ Laravel backend
   auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
})*/

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST || '127.0.0.1',
    wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT || 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    
    // Use absolute URL for auth endpoint
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                fetch('http://127.0.0.1:8000/broadcasting/auth', { // ← FULL URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Auth failed: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('✅ Channel auth successful:', data);
                    callback(false, data);
                })
                .catch(error => {
                    console.error('❌ Channel auth failed:', error);
                    callback(true, error);
                });
            }
        };
    }
});