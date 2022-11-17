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
use App\Http\Requests\Letter\LetterStoreRequest;
use App\Http\Requests\Letter\LetterUpdateRequest;
use App\Http\Resources\Letter\LetterResource;
use App\Http\Resources\Letter\LetterTrashResource;
use App\Models\Letter;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

/**
 * @var
 */
class LetterController extends Controller
{

    protected string $basePath = 'admin.page.letters.';

    /**
     * Display a listing of the resource.
     *
     * @return Application|Factory|View
     */
    public function index(): Factory|View|Application
    {
        Gate::authorize('granted', 'ROLE_LETTERS_MENU');
        return view($this->basePath . __FUNCTION__, [
            'data' => (LetterResource::collection(Letter::query()->latest()->get()))->toJson(),
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
        Gate::authorize('granted', 'ROLE_LETTERS_TRASH');
        return view($this->basePath . 'index', [
            'data' => (LetterTrashResource::collection(Letter::onlyTrashed()->get()))->toJson(),
            'header' => json_encode(self::tableHeader()),
            'type' => __FUNCTION__
        ]);
    }

    /**
     * @param int $letter
     * @return RedirectResponse
     */
    public function restore(int $letter): RedirectResponse
    {
        Gate::authorize('granted', 'ROLE_LETTERS_TRASH');
        if (Letter::withTrashed()->find($letter)->restore()) {
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
        Gate::authorize('granted', 'ROLE_LETTERS_CREATE');
        return view($this->basePath . __FUNCTION__);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param LetterStoreRequest $request
     * @return RedirectResponse
     */
    public function store(LetterStoreRequest $request): RedirectResponse
    {
        Gate::authorize('granted', 'ROLE_LETTERS_CREATE');

        $__data = $request->validated();
        $__users = [];

        if (isset($__data['users'])) {
            $__users = $__data['users'];
            unset($__data['users']);
        }
        /**
         * @var $letter Letter
         */
        if ($letter = Letter::query()->create($__data)) {
            $letter->users()->sync($__users);
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);

        return $this->redirectStore($request, 'letters');
    }

    /**
     * Display the specified resource.
     *
     * @param Letter $letter
     * @return Application|Factory|View
     */
    public function show(Letter $letter): View|Factory|Application
    {
        Gate::authorize('granted', 'ROLE_LETTERS_SHOW');
        return view($this->basePath . __FUNCTION__, [
            'letter' => $letter
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Letter $letter
     * @return Application|Factory|View
     */
    public function edit(Letter $letter): Factory|View|Application
    {
        Gate::authorize('granted', 'ROLE_LETTERS_EDIT');
        return view($this->basePath . __FUNCTION__, [
            'letter' => $letter
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param LetterUpdateRequest $request
     * @param Letter $letter
     * @return RedirectResponse
     */
    public function update(LetterUpdateRequest $request, Letter $letter): RedirectResponse
    {
        Gate::authorize('granted', 'ROLE_LETTERS_EDIT');

        $__data = $request->validated();
        $__users = [];

        if (isset($__data['users'])) {
            $__users = $__data['users'];
            unset($__data['users']);
        }

        if ($letter->update($__data)) {
            $letter->users()->sync($__users);
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param int $letter
     * @return RedirectResponse
     */
    public function destroy(Request $request, int $letter): RedirectResponse
    {

        Gate::authorize('granted', 'ROLE_LETTERS_DESTROY');

        if ($isTrash = $request->query->get('type', 'trash') === 'trash') $action = 'delete'; else $action = 'forceDelete';

        $__user = User::withTrashed()->findOrFail($letter);

        if ($__user->$action()) {
            session()->flash(Notice::SUCCESS->name, Notice::SUCCESS->value);
        } else session()->flash(Notice::ERROR->name, Notice::ERROR->value);

        if (!$isTrash) return redirect()->back();

        return $this->redirectDestroy('letters');
    }


    private static function tableHeader(): array
    {
        return [
            [
                "name" => "Expéditeur"
            ],
            [
                "name" => "Destinataire"
            ],
            [
                "name" => "Objet"
            ],
            [
                "name" => "Status"
            ]
        ];
    }
}
