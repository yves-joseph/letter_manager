<?php

namespace App\Http\Enumerations;

enum LetterType: string
{
    case Receive = "receive";
    case Send = "send";
}
