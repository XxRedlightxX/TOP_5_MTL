<?php

namespace Tests\Unit;

use App\DAO\SourceDonnes\UserDAO;
use Mockery;
use PHPUnit\Framework\TestCase;

class UserControllerTest extends TestCase
{

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

       /** @test */
  /** @test */
 

    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }
}
