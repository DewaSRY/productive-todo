<?php

namespace App\Http\Requests\todo;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\data\Cuartel;

class HeatMapTodoRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "cuartel"=> ["required" , Rule::in(array_keys(Cuartel::$data))],
            "year" => ["required", "string", "regex:/^(19|20)\d{2}$/"]
        ];
    }
}
