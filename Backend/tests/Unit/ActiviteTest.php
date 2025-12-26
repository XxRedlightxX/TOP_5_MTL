<?php

namespace Tests\Unit;

use App\DAO\SourceDonnes\ActiviteDAO;
use App\DAO\SourceDonnes\UserDAO;
use App\Models\Activite;
use App\Models\User;
use App\Service\ActiviteService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Mockery;

class ActiviteTest extends TestCase
{

     use RefreshDatabase;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_create_activity_successfully(): void
    {
        // Arrange
        $mockDAO = Mockery::mock(ActiviteDAO::class);

        $service = new ActiviteService($mockDAO);

        $data = [
            'titre' => 'Hiking',
            'description' => 'Mountain hiking',
        ];

        $mockDAO->shouldReceive('addActivity')
            ->once()
            ->with(1, $data)
            ->andReturn(true);

        // Act
        $result = $service->createActivite('Hiking', 1, $data);

        // Assert
        $this->assertTrue($result);
    }


    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }
}
