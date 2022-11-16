<?php
/**
 * @author    Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link      https://github.com/Koroph
 * @license   MIT
 * @copyright Copyright (c) 2020.
 */

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Enumerations\Notice;
use App\Http\Requests\User\UserPasswordUpdateRequest;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserTrashResource;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

/**
 * @var
 */
class UserController extends Controller
{

    protected string $basePath = 'admin.page.users.';

    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index(): Factory|View|Application
    {
        Gate::authorize('granted', 'ROLE_USERS_MENU');
        return view($this->basePath . __FUNCTION__, [
            'data' => (UserResource::collection(User::query()->where('id', '!=', Auth::id())->latest()->get()))->toJson(),
            'header' => json_encode(self::tableHeader()),
            'type' => __FUNCTION__
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function trash(): Factory|View|Application
    {
        Gate::authorize('granted', 'ROLE_USERS_TRASH');
        return view($this->basePath . 'index', [
            'data' => (UserTrashResource::collection(User::onlyTrashed()->get()))->toJson(),
            'header' => json_encode(self::tableHeader()),
            'type' => __FUNCTION__
        ]);
    }

    /**
     * @param int $user
     * @return RedirectResponse
     */
    public function restore(int $user): RedirectResponse
    {
        Gate::authorize('granted', 'ROLE_USERS_TRASH');
        if (User::withTrashed()->find($user)->restore()) {
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);
        return redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  Application|Factory|View
     */
    public function create(): View|Factory|Application
    {
        Gate::authorize('granted', 'ROLE_USERS_CREATE');
        return view($this->basePath . __FUNCTION__);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param UserStoreRequest $request
     * @return RedirectResponse
     */
    public function store(UserStoreRequest $request): RedirectResponse
    {
        Gate::authorize('granted', 'ROLE_USERS_CREATE');
        if (User::query()->create($request->validated())) {
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);

        return $this->redirectStore($request, 'users');
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return Application|Factory|View
     */
    public function show(User $user): View|Factory|Application
    {
        Gate::authorize('granted', 'ROLE_USERS_SHOW');
        return view($this->basePath . __FUNCTION__, [
            'user' => $user->load('image:id,url')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @return Application|Factory|View
     */
    public function edit(User $user): Factory|View|Application
    {
        Gate::authorize('granted', 'ROLE_USERS_EDIT');
        return view($this->basePath . __FUNCTION__, [
            'user' => $user->load('image:id,url')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param User $user
     * @return RedirectResponse
     */
    public function update(UserUpdateRequest $request, User $user): RedirectResponse
    {
        //Gate::authorize('granted', 'ROLE_USERS_EDIT');
        if ($user->update($request->validated())) {
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param int $user
     * @return RedirectResponse
     */
    public function destroy(Request $request, int $user): RedirectResponse
    {

        Gate::authorize('granted', 'ROLE_USERS_DESTROY');

        if ($isTrash = $request->query->get('type', 'trash') === 'trash') $action = 'delete'; else $action = 'forceDelete';

        $__user = User::withTrashed()->findOrFail($user);

        if ($__user->$action()) {
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);

        if (!$isTrash) return redirect()->back();

        return $this->redirectDestroy('users');
    }

    public function passwordResetForm(User $user): Factory|View|Application
    {
        return view($this->basePath . 'password-reset', [
            'user' => $user
        ]);
    }

    public function passwordReset(UserPasswordUpdateRequest $passwordUpdateRequest, User $user): RedirectResponse
    {
        $user->update($passwordUpdateRequest->validated());
        return redirect()->back();
    }

    public function initProfilImage(User $user): JsonResponse
    {
        $is = $user->update([
            'image_id' => null
        ]);
        return new JsonResponse([
            'is' => $is
        ]);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function accountStatus(User $user): JsonResponse
    {
        $is = !$user->activated->value;
        $user->update([
            'activated' => $is
        ]);
        return new JsonResponse([
            'result' => $is
        ]);
    }


    private static function tableHeader(): array
    {
        return [
            [
                "name" => "Image",
                "sort" => false
            ],
            [
                "name" => "Nom"
            ],
            [
                "name" => "Prénom"
            ],
            [
                "name" => "Email"
            ],
            [
                "name" => "Statut",
                "sort" => false,
                'width' => '116'
            ]
        ];
    }
}
