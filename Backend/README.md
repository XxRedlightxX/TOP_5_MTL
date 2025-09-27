cd .\Backend\
composer global require laravel/installer

compose update 
composer require laravel/sanctum

php artisan migrate
php artisan serve