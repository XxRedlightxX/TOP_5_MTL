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
        ['nom' => 'Concert', 'image_data' => 'mdi-music'],
        ['nom' => 'Festival', 'image_data' => 'mdi-party-popper'],
        ['nom' => 'Sport', 'image_data' => 'mdi-soccer'],
        // Add the rest from your SQL...
    ];

    foreach ($types as $type) {
       Type::firstOrCreate($type);
    }
    }
}
