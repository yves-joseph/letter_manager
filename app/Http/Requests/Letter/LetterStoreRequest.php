<?php

namespace App\Http\Requests\Letter;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class LetterStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $this->request->set('user_id', Auth::id());
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
            "user_id" => ['required', 'integer'],
            "type" => ['required', 'max:255'],
            "subject" => ['required', 'string', Rule::unique('letters')->ignore('letter')],
            "sender_full_name" => ['required', 'max:255'],
            "recipient_full_name" => ['required', 'max:255'],
            "receive_at" => ['required'],
            "file_path" => ['nullable', 'mimes:pdf'],
            "detail" => ['nullable', 'string'],
            'users' => ['nullable', 'array']
        ];
    }

}
