<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\App;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected string $basePath;

    public function redirectStore(Request $request, $name): RedirectResponse
    {
        if ($request->filled('continue') && $request->input('continue') === 's')
            return redirect()->route("$name.index");
        else
            return redirect()->back();
    }

    public function redirectDestroy(string $name): RedirectResponse
    {
        if (preg_match("/[0-9]+/", url()->previous()))
            return redirect()->route("$name.index");
        else return redirect()->back();
    }
}
