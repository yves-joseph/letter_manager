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

            $admin = User::factory()->create([
                'service_id' => $service->id,
                'email' => 'a.' . fake()->email,
                'activated' => 1,
                'role' => ["ROLE_DASHBOARD_MENU", "ROLE_DASHBOARD_USERS_SHOW", "ROLE_DASHBOARD_SERVICES_SHOW", "ROLE_DASHBOARD_LETTERS_SHOW", "ROLE_USERS_MENU", "ROLE_USERS_SHOW", "ROLE_USERS_CREATE", "ROLE_USERS_EDIT", "ROLE_USERS_DESTROY", "ROLE_USERS_TRASH", "ROLE_USERS_SUPERVISOR", "ROLE_SERVICES_MENU", "ROLE_SERVICES_SHOW", "ROLE_SERVICES_CREATE", "ROLE_SERVICES_EDIT", "ROLE_SERVICES_DESTROY", "ROLE_SERVICES_TRASH", "ROLE_LETTERS_MENU", "ROLE_LETTERS_SHOW", "ROLE_LETTERS_CREATE", "ROLE_LETTERS_EDIT", "ROLE_LETTERS_DESTROY", "ROLE_LETTERS_TRASH", "ROLE_LETTERS_SUPERVISOR"]
            ]);

            $secretary = User::factory()->create([
                'service_id' => $service->id,
                'email' => 's.' . fake()->email,
                'role' => ["ROLE_DASHBOARD_MENU", "ROLE_DASHBOARD_SHOW", "ROLE_DASHBOARD_USERS_SHOW", "ROLE_DASHBOARD_SERVICES_SHOW", "ROLE_DASHBOARD_LETTERS_SHOW", "ROLE_SERVICES_MENU", "ROLE_SERVICES_SHOW", "ROLE_SERVICES_CREATE", "ROLE_SERVICES_EDIT", "ROLE_SERVICES_DESTROY", "ROLE_SERVICES_TRASH", "ROLE_LETTERS_MENU", "ROLE_LETTERS_SHOW", "ROLE_LETTERS_CREATE", "ROLE_LETTERS_EDIT", "ROLE_LETTERS_DESTROY", "ROLE_LETTERS_TRASH", "ROLE_LETTERS_SUPERVISOR"]
            ]);

            Letter::factory(4)
                ->has(User::factory()->count(2)->set('service_id', $service->id))
                ->create([
                    'user_id' => (int)fake()->randomElement([
                        (string)$secretary->id,
                        (string)$admin->id
                    ])
                ]);

            Letter::factory(8)
                ->has(User::factory()->count(1)->set('service_id', $service->id))
                ->create([
                    'user_id' => (int)fake()->randomElement([
                        (string)$secretary->id,
                        (string)$admin->id
                    ])
                ]);
        });
    }
}
