<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'nom' => 'Concert',
                'image_data' => 'mdi-music',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Festival',
                'image_data' => 'mdi-party-popper',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Sport',
                'image_data' => 'mdi-soccer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Exhibition',
                'image_data' => 'mdi-image-frame',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Workshop',
                'image_data' => 'mdi-hammer-wrench',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Conference',
                'image_data' => 'mdi-podium',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Show',
                'image_data' => 'mdi-drama-masks',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Walk',
                'image_data' => 'mdi-walk',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Guided Tour',
                'image_data' => 'mdi-map-marker',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Cinema',
                'image_data' => 'mdi-movie',
                'created_at' => now(),
                'updated_at' => now(),
            ],
       
    ];

    foreach ($types as $type) {
       Type::firstOrCreate($type);
    }
    }
}
