<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeagueRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'name' => ['required', 'string'],
            'gender' => ['required', 'in:Mens,Womens,Mixed'],
            'start_date' => ['integer', 'required'],
            'end_date' => ['gt:start_date', 'integer', 'required'],
        ];
    }
}
