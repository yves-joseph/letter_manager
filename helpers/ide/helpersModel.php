<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Letter
 *
 * @property int $id
 * @property int $user_id
 * @property \App\Http\Enumerations\LetterType $type
 * @property string $subject
 * @property string $sender_full_name
 * @property string $recipient_full_name
 * @property string $receive_at
 * @property string|null $file_path
 * @property string|null $detail
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Database\Factories\LetterFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Letter newQuery()
 * @method static \Illuminate\Database\Query\Builder|Letter onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Letter query()
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereDetail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereReceiveAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereRecipientFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereSenderFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Letter whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|Letter withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Letter withoutTrashed()
 * @mixin \Eloquent
 */
	class IdeHelperLetter {}
}

namespace App\Models{
/**
 * App\Models\Service
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Database\Factories\ServiceFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Service newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Service newQuery()
 * @method static \Illuminate\Database\Query\Builder|Service onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Service query()
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Service whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Service withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Service withoutTrashed()
 * @mixin \Eloquent
 */
	class IdeHelperService {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property int|null $service_id
 * @property string|null $image_path
 * @property string $firstname
 * @property string $lastname
 * @property string $phone
 * @property string $email
 * @property string $password
 * @property array|null $role
 * @property \App\Http\Enumerations\Activated $activated
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Letter[] $letters
 * @property-read int|null $letters_count
 * @property-read \App\Models\Service|null $service
 * @property-write mixed $image_id
 * @property-write mixed $permission
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Query\Builder|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereActivated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|User withTrashed()
 * @method static \Illuminate\Database\Query\Builder|User withoutTrashed()
 */
	class IdeHelperUser {}
}

