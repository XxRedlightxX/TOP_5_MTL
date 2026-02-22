<?php

namespace Tests\Feature;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use App\Models\Enum\EnumMode;
use App\Models\Saison;
use App\Models\Type;
use App\Models\User;
use App\Service\ActiviteService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;
use Illuminate\Support\Facades\Notification;

class ActiviteControllerTest extends TestCase
{
    use RefreshDatabase;
    
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    private function createActivityData(Saison $saison, Type $type, ?User $user = null): array
    {
         $data = [
            'titre' => 'Hiking',
            'description' => 'Mountain hiking',
            'date_debut' => now()->format('Y-m-d H:i:s'),
            'date_fin' => now()->addHours(2)->format('Y-m-d H:i:s'),
            'latitude' => "45.5017",
            'longitude' => "-73.5673",
            'lieu' => 'Montreal',
            'statut_journee' => EnumMode::JOUR->value,
            'saison_name' => $saison->statut,
            'type_name' => $type->nom,
        ];
    
        if ($user !== null) {
            $data['organisateur_id'] = $user->id;
        }
        
        return $data;
    }

    #[Test]
    public function get_all_categories_with_auth_should_get_200(): void
    {
        $user = User::factory()->create();

        //  Mock SERVICE,
        $mockService = Mockery::mock(ActiviteService::class);

        $mockService->shouldReceive('getAllCategoriesActivities')
            ->once()
            ->andReturn(collect([
                [
                    'id' => 1,
                    'nom' => 'Sport',
                    'image_data' => null,
                ]
            ]));

        // Bind mock
        $this->app->instance(ActiviteService::class, $mockService);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/categories');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'nom' => 'Sport',
            ]);
    }

    #[Test]
    public function get_all_categories_without_authentication_should_get_200(): void
    {
        $mockService = Mockery::mock(ActiviteService::class);

        $mockService->shouldReceive('getAllCategoriesActivities')
            ->once()
            ->andReturn(collect([
                [
                    'id' => 1,
                    'nom' => 'Sport',
                    'image_data' => null,
                ]
            ]));

        // Bind mock
        $this->app->instance(ActiviteService::class, $mockService);

        $response =$this ->getJson('/api/categories');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'nom' => 'Sport',
            ]);
    }

    #[Test]
    public function create_activity_requires_authentication(): void
    {
        $data = [
            'titre' => 'Hiking',
            'description' => 'Mountain hiking',
        ];

        // ❌ No actingAs() → unauthenticated
        $response = $this->postJson('/api/user/activite', $data);

        $response->assertStatus(401)
                ->assertJson(['message' => 'Unauthenticated.']);
    }

    #[Test]
    public function authenticated_user_can_create_activity(): void
    {
        Notification::fake();
        
        $user = User::factory()->create(['type_utilisateur' => 'organisateur']);
        $saison = Saison::factory()->create(['statut' => 'été']);
        $type = Type::factory()->create(['nom' => 'Sport']);
        $data = $this->createActivityData($saison, $type, $user); // Updated order

        $response = $this->actingAs($user, 'sanctum')
                         ->postJson('/api/user/activite', $data);

        $response->assertStatus(201);
        $response->assertJsonFragment([
            'titre' => 'Hiking',
            'description' => 'Mountain hiking',
        ]);
    }

    #[Test]
    public function authenticated_user_without_access_cannot_create_activity(): void
    {
        Notification::fake();
        
        $user = User::factory()->create(['type_utilisateur' => 'particulier']);
        $saison = Saison::factory()->create(['statut' => 'été']);
        $type = Type::factory()->create(['nom' => 'Sport']);
        $data = $this->createActivityData($saison, $type, $user); // Updated order

        $response = $this->actingAs($user, 'sanctum')
                         ->postJson('/api/user/activite', $data);

        $response->assertStatus(403);
    }

    #[Test]
    public function none_authenticated_user_without_access_cannot_create_activity(): void
    {
        Notification::fake();

        $saison = Saison::factory()->create(['statut' => 'été']);
        $type = Type::factory()->create(['nom' => 'Sport']);
        $data = $this->createActivityData($saison, $type, null); // Updated order

        $response = $this->postJson('/api/user/activite', $data);

        $response->assertStatus(401);
    }

    /**
     * A basic feature test example.
     */
    /*
    #[Test]
    public function example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    */
}