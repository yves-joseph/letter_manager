<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'firstname' => fake()->firstName(),
            'lastname' => fake()->lastName(),
            'email' => fake()->email(),
            'password' => 'password',
            'phone' => fake()->phoneNumber(),
            'activated' => fake()->boolean(),
            'image_id' => null,
            'role' => ["ROLE_DASHBOARD_MENU", "ROLE_DASHBOARD_SHOW", "ROLE_LETTERS_MENU", "ROLE_LETTERS_SHOW", "ROLE_LETTERS_CREATE", "ROLE_LETTERS_EDIT", "ROLE_LETTERS_DESTROY"],
            'remember_token' => hash('sha256', Str::random(80)),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (User $user) {

        });
    }
}
