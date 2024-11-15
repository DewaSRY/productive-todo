<?php

namespace App\Http\Requests\todo;

use Illuminate\Foundation\Http\FormRequest;

use App\data\Priority;
use Illuminate\Validation\Rule;


class TodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {

        if ($this->input("title") === null) {

            $this->merge([
                'title' => "",
            ]);
        }

        if ($this->input("description") === null) {

            $this->merge([
                'description' => "",
            ]);
        }

    }


    public function rules(): array
    {

        return [
            'title'=> "sometimes|string",
            'is_completed'=> "sometimes|boolean",
            "description"=>"sometimes|string",
            "priority"=> ["sometimes", Rule::in(array_keys(Priority::$data))], 
        ];
    }
}
