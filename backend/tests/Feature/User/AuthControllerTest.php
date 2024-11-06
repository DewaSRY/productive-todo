<?php

namespace Tests\Feature\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;


use App\Http\Controllers\user\AuthController;
use App\Models\User;

use App\Services\CookieService;
use App\Services\UserResolverService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\MockObject\MockObject;

use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    private CookieService|MockObject $cookieService;
    private UserResolverService|MockObject $userResolverService;
    private AuthController $authController;

    protected function setUp(): void
    {
        parent::setUp();

        $this->cookieService = $this->createMock(CookieService::class);
        $this->userResolverService = $this->createMock(UserResolverService::class);
        $this->authController = new AuthController($this->cookieService, $this->userResolverService);
    }

    public function test_login_success()
    {
        // Arrange
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
        ]);

        $request = Request::create('/api/user/login', 'POST', [
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $this->cookieService
            ->expects($this->once())
            ->method('setcookie')
            ->willReturn(response()->json(['access_token' => 'your_access_token_here']));

        // Act
        $response = $this->authController->login($request);

        // Assert
        $this->assertEquals(200, $response->status());
    }

    public function test_login_failure_invalid_credentials()
    {
        $this->expectException(ValidationException::class);

        $request = Request::create('/api/user/login', 'POST', [
            'email' => 'wrong@example.com',
            'password' => 'wrongpassword',
        ]);

        $this->authController->login($request);
    }

    public function test_logout_success()
    {
        // Arrange
        $user = User::factory()->create();

        $request = Request::create('/api/user/logout', 'POST');
        $request->setUserResolver(fn() => $user);

        $this->userResolverService
            ->expects($this->once())
            ->method('removeUser')
            ->with($this->equalTo($request));

        // Act
        $response = $this->authController->logout($request);

        // Assert
        $this->assertEquals(204, $response->getStatusCode());
    }
       
    public function test_signup_success()
    {
        // Arrange
        $request = Request::create('/api/user/signup', 'POST', [
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'name' => 'New User',
        ]);

        $this->cookieService
            ->expects($this->once())
            ->method('setcookie')
            ->willReturn(response()->json(['access_token' => 'your_access_token_here'], 201));

        // Act
        $response = $this->authController->singUp($request);

        // Assert
        $this->assertEquals(201, $response->status());
    }
}
