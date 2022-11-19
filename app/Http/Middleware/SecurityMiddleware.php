<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

class SecurityMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param \Closure(Request): (Response|RedirectResponse) $next
     * @return Response|RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        //session()->flash("not_production","Veuillez contacter le développeur pour la mise en production de ce logiciel");
        if ($request->ip() !== "127.0.0.1") {
            session()->flash("not_production","Veuillez contacter le développeur pour la mise en production de ce logiciel");
            return redirect()->route("user_home.index");
        }
        return $next($request);
    }
}
