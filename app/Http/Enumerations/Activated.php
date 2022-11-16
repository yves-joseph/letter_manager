<?php

namespace App\Http\Enumerations;

enum Activated: int
{
    case Enabled = 1;
    case Disabled = 0;
}
