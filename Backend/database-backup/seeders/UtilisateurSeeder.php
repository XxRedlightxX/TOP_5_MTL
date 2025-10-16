<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UtilisateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
  
    
        /*$faker = Faker::create('fr_FR');

        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'password' => Hash::make('password'),
                'type_utilisateur' => EnumUser::PART->value,
                'image_data' => $faker->imageUrl(200, 200)
            ]);
        }*/
    
    }
}
