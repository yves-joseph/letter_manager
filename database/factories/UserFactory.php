<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
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
            'role' => ["ROLE_HOME_MENU", "ROLE_HOME_SHOW", "ROLE_ADMIN_MENU", "ROLE_ADMIN_SHOW", "ROLE_ADMIN_CREATE", "ROLE_ADMIN_EDIT", "ROLE_ADMIN_DESTROY", "ROLE_ADMIN_AUTHORISATION", "ROLE_CUSTOMER_MENU", "ROLE_CUSTOMER_SHOW", "ROLE_CUSTOMER_CREATE", "ROLE_CUSTOMER_EDIT", "ROLE_CUSTOMER_DESTROY", "ROLE_CUSTOMER_AUTHORISATION", "ROLE_MARKER_MENU", "ROLE_MARKER_SHOW", "ROLE_MARKER_CREATE", "ROLE_MARKER_EDIT", "ROLE_MARKER_DESTROY", "ROLE_MARKER_AUTHORISATION", "ROLE_BRAND_MENU", "ROLE_BRAND_SHOW", "ROLE_BRAND_CREATE", "ROLE_BRAND_EDIT", "ROLE_BRAND_DESTROY", "ROLE_BRAND_AUTHORISATION", "ROLE_CATEGORY_MENU", "ROLE_CATEGORY_SHOW", "ROLE_CATEGORY_CREATE", "ROLE_CATEGORY_EDIT", "ROLE_CATEGORY_DESTROY", "ROLE_CATEGORY_AUTHORISATION", "ROLE_SIZE_MENU", "ROLE_SIZE_SHOW", "ROLE_SIZE_CREATE", "ROLE_SIZE_EDIT", "ROLE_SIZE_DESTROY", "ROLE_SIZE_AUTHORISATION", "ROLE_COLOR_MENU", "ROLE_CATEGORY_SHOW", "ROLE_COLOR_CREATE", "ROLE_COLOR_EDIT", "ROLE_COLOR_DESTROY", "ROLE_COLOR_AUTHORISATION", "ROLE_PRODUCT_MENU", "ROLE_PRODUCT_SHOW", "ROLE_PRODUCT_CREATE", "ROLE_PRODUCT_EDIT", "ROLE_PRODUCT_DESTROY", "ROLE_PRODUCT_AUTHORISATION", "ROLE_ORDER_MENU", "ROLE_ORDER_SHOW", "ROLE_ORDER_CREATE", "ROLE_ORDER_EDIT", "ROLE_ORDER_DESTROY", "ROLE_ORDER_AUTHORISATION"],
            'remember_token' => hash('sha256', Str::random(80)),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
