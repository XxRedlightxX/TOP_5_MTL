cd .\Backend\
composer global require laravel/installer

composer update 

php artisan sanctum:install ou composer require laravel/sanctum

# 2. Installer les assets Reverb
php artisan install:broadcasting et choisis l'option reverb

ajouter les variables d'environnements suivants dans le Backend et FrontEnd :

BROADCAST_CONNECTION=
BROADCAST_DRIVER=
REVERB_APP_ID=
REVERB_APP_KEY=
REVERB_APP_SECRET=
REVERB_HOST=localhost
REVERB_PORT=
REVERB_SCHEME=http

# Pusher-compatible variables (required for Pusher SDK)
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=
PUSHER_HOST=localhost
PUSHER_PORT=
PUSHER_SCHEME=http

php artisan reverb:start

php artisan queue:work

php artisan migrate