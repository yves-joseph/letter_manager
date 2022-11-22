<?php

namespace App\Http\Requests\User;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $this->request->set('activated',$this->request->has('activated'));

        return Auth::guard('web')->check();
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'firstname' => ['required', 'max:255'],
            'lastname' => ['required', 'max:255'],
            'phone' => ['required', 'max:32'],
            'email' => [
                'required',
                'max:50',
                'email',
                Rule::unique('users')->ignore($this->route('user')->id)
            ],
            'role' => ['required', 'array'],
            'activated' => ['required', 'boolean'],
            'image_path' => ['nullable','image']
        ];
    }

}
