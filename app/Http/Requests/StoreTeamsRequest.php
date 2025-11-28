<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTeamsRequest extends FormRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
            $teamId = $this->route('team')?->id; 

        return [
            'name'=> ['required','string', Rule::unique('teams')->where('gender', $this->input('gender'))->ignore($teamId), ],
            'gender'=>['required', 'in:Mens,Womens,Mixed'],
        ];
    }
}
