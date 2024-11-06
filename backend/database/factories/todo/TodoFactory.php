<?php

namespace Database\Factories\todo;

use App\data\Priority;
use App\Models\todo\Todo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\todo\Todo>
 */
class TodoFactory extends Factory
{
    // protected
    protected $model= Todo::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "title"=> $this->faker->text(10), 
             "is_completed"=> $this->faker->boolean(),
             "description"=> $this->faker->paragraph(2, true),
             "priority"=> $this->faker->randomElement(array_keys(Priority::$data)),
             'created_at' => fake()->dateTimeBetween('-2 years'),
             'updated_at' => function (array $attributes) {
                 return fake()->dateTimeBetween($attributes['created_at'], 'now');
             },
        ];
    }
}


