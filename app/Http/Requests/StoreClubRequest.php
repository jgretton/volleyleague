<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClubRequest extends FormRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:clubs,name',],
            'venue' => ['required', 'string'],
            'contact_name' => ['required', 'string', 'max:255'],
            'contact_email' => ['required', 'email'],
            'contact_number' => ['required', 'string', 'max:20']
        ];
    }
}
