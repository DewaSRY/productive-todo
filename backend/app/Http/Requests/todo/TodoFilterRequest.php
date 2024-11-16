<?php

namespace App\Http\Requests\todo;

use App\data\Priority;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TodoFilterRequest extends FormRequest
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
        if ($this->input("is_completed") !== null) {
            $this->merge([
                'is_completed' => filter_var($this->input('is_completed'), FILTER_VALIDATE_BOOLEAN),
            ]);
        }
        if (!$this->has('limit') || $this->input('limit') < 1) {
            $this->merge([
                'limit' => 10
            ]);
        }

    }

    public function rules(): array
    {
        return [
            "title"=> "nullable|string",
            "fromt"=> "nullable|date",
            "to"=> "nullable|date",
            "is_completed"=> "nullable|boolean",
            "limit"=> "nullable|numeric",
            "priority" => ["nullable" , Rule::in(array_keys(Priority::$data))]
        ];
    }

}
