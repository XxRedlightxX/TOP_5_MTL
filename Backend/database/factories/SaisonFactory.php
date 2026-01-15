<?php

namespace Database\Factories;
use App\Models\Saison;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Saison>
 */
class SaisonFactory extends Factory
{

    protected $model = Saison::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
             'statut' => $this->faker->unique()->word(),  
        ];
    }
}
