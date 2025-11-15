
ajouter les variables d'environnements suivants dans le Backend et FrontEnd :

BROADCAST_CONNECTION=reverb
BROADCAST_DRIVER=reverb
REVERB_APP_ID=123
REVERB_APP_KEY=123
REVERB_APP_SECRET=123
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http

Pusher-compatible variables (required for Pusher SDK)
PUSHER_APP_ID=123
PUSHER_APP_KEY=123
PUSHER_APP_SECRET=123
PUSHER_APP_CLUSTER=mt1
PUSHER_HOST=localhost
PUSHER_PORT=8080
PUSHER_SCHEME=http

cd .\Backend\
composer global require laravel/installer

composer update

php artisan sanctum:install ou composer require laravel/sanctum


composer require laravel/reverb
php artisan install:broadcasting
php artisan reverb:install /// et choisis l'option reverb

php artisan migrate
php artisan reverb:start

php artisan queue:work

php artisan serve
