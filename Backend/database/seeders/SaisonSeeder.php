<?php

namespace Database\Seeders;

use App\Models\Saison;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SaisonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (['ete', 'hiver', 'automne', 'printemps'] as $statut) {
        Saison::firstOrCreate(['statut' => $statut]);
    }
    }
}
