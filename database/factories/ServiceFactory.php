<?php

namespace Database\Factories;

use App\Models\Letter;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Service::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'name' => fake()->jobTitle()
        ];
    }


    public function configure()
    {
        return $this->afterCreating(function (Service $service) {

            User::factory(15)->create([
                'service_id' => $service->id,
                'role' => [
                    "ROLE_HOME_MENU",
                    "ROLE_HOME_SHOW",
                    "ROLE_LETTERS_MENU",
                    "ROLE_LETTERS_SHOW",
                    "ROLE_LETTERS_CREATE",
                    "ROLE_LETTERS_EDIT",
                    "ROLE_LETTERS_DESTROY",
                ]
            ]);

            User::factory()->create([
                'service_id' => $service->id,
                'email' => 'yjk@outlook.fr',
                'activated' => 1,
                'role' => [
                    "ROLE_HOME_MENU",
                    "ROLE_HOME_SHOW",
                    "ROLE_USERS_MENU",
                    "ROLE_USERS_SHOW",
                    "ROLE_USERS_CREATE",
                    "ROLE_USERS_EDIT",
                    "ROLE_USERS_DESTROY",
                    "ROLE_USERS_AUTHORISATION",
                    "ROLE_SERVICES_MENU",
                    "ROLE_SERVICES_SHOW",
                    "ROLE_SERVICES_CREATE",
                    "ROLE_SERVICES_EDIT",
                    "ROLE_SERVICES_DESTROY",
                    "ROLE_LETTERS_MENU",
                    "ROLE_LETTERS_SHOW",
                    "ROLE_LETTERS_CREATE",
                    "ROLE_LETTERS_EDIT",
                    "ROLE_LETTERS_DESTROY",
                ]
            ]);

            $secretary = User::factory()->create([
                'service_id' => $service->id,
                'role' => [
                    "ROLE_HOME_MENU",
                    "ROLE_HOME_SHOW",
                    "ROLE_USERS_AUTHORISATION",
                    "ROLE_LETTERS_MENU",
                    "ROLE_LETTERS_SHOW",
                    "ROLE_LETTERS_CREATE",
                    "ROLE_LETTERS_EDIT",
                    "ROLE_LETTERS_DESTROY",
                ]
            ]);

            Letter::factory(10)->create([
                'user_id' => $secretary->id
            ]);
        });
    }
}
