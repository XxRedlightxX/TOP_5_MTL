cd .\Backend\
composer global require laravel/installer

composer update


composer require laravel/sanctum

/*Creer un fichier .env en copiant l exemple du .env.exemple en changeant les valeurs des variables en fonction de vos configs*/
DB_DATABASE=backend
DB_USERNAME=root
DB_PASSWORD=root

php artisan migrate

Ensuite ca vous donnera l option d inialiser la BD avec le nom venant du  $DB_DATABASE provenant .env


/*Ensuite populer les donnees avec le fichier sql */

php artisan serve