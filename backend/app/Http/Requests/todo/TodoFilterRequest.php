<?php

namespace App\Http\Requests\todo;

use Illuminate\Foundation\Http\FormRequest;

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
        if ($this->has('is_completed')) {
            $this->merge([
                'is_completed' => filter_var($this->input('is_completed'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE),
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
            "name"=> "nullable|string",
            "fromt"=> "nullable|date",
            "to"=> "nullable|date",
            "is_completed"=> "nullable|boolean",
            "limit"=> "nullable|numeric"
        ];
    }

}
