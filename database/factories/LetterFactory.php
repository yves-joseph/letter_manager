<?php

namespace Database\Factories;

use App\Models\Letter;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class LetterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Letter::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            "user_id" => 1,
            "type" => fake()->randomElement(['receive', 'send']),
            "subject" => fake()->title(),
            "sender_full_name" => fake()->lastName() . ' ' . fake()->lastName(),
            "recipient_full_name" => fake()->lastName() . ' ' . fake()->lastName(),
            "receive_at" => Carbon::now(),
            "file_path" => fake()->randomElement([
                "",
                "",
                ""
            ]),
            "detail" => fake()->paragraph()
        ];
    }
}
