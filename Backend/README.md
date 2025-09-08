cd .\Backend\
composer global require laravel/installer

compose update 

php artisan sanctum:install

php artisan migrate