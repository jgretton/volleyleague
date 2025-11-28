<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreClubRequest extends FormRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $clubId = $this->route('club')?->id;
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('clubs')->ignore($clubId),],
            'venue' => ['required', 'string'],
            'contact_name' => ['required', 'string', 'max:255'],
            'contact_email' => ['required', 'email'],
            'contact_number' => ['required', 'string', 'max:20']
        ];
    }
}
