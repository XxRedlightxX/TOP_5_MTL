<?php

namespace Tests\Feature;

use App\DAO\SourceDonnes\UserDAO;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;
use Tests\TestCase;

class UserControllerTest extends TestCase
{

    use RefreshDatabase;
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

  


    /** @test */
    public function it_returns_users()
{
    // Create a test user using your custom table
    $user = User::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'username' => 'testuser',
        // Add other required fields based on your migration/factory
    ]);

    // Full mock of UserDAO
    $mockDAO = Mockery::mock(UserDAO::class);
    
    // Mock the getAll method - adjust parameters as needed
    $mockDAO->shouldReceive('getAll')
            ->once()
            ->with(10, 1) // Make sure these match what your controller passes
            ->andReturn([
                [
                    'id' => 1, 
                    'name' => 'John', 
                    'email' => 'john@example.com',
                    'username' => 'john_doe',
                    'num_tel' => '1234567890',
                    'description' => 'Test description',
                    'type_utilisateur' => 'user',
                    'image_data' => null
                    // Include all fields your API returns
                ]
            ]);

    // Bind the mock to the container
    $this->app->instance(UserDAO::class, $mockDAO);

    // Make authenticated request
    $response = $this->actingAs($user, 'sanctum')
                    ->getJson('/api/users');

    // Assertions
    $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'John'])
            ->assertJsonStructure([
                // Define expected JSON structure
            ]);
}

/*public function test_search_users_by_username_returns_users_with_follow_flag(): void
{
    $authUser = User::factory()->create();

    $mockService = Mockery::mock(UserDAO::class);

    $user = new User();
    $user->id = 2;
    $user->username = 'john_doe';
    $user->email = 'john@example.com';

    $mockService->shouldReceive('getUserBysearchUsername')
        ->once()
        ->with('john')
        ->andReturn(collect([$user]));

    $this->app->instance(UserDAO::class, $mockService);

    $response = $this->actingAs($authUser, 'sanctum')
        ->getJson('/api/user/search?username=john');

    $response->assertStatus(200);
       
}*/

    /**
     * A basic feature test example.
     */
    /*public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }*/
}
