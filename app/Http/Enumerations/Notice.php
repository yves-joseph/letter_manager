<?php
/**
 * @author    Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link      https://github.com/Koroph
 * @license   MIT
 * @copyright Copyright (c) 2020.
 */

namespace App\Http\Enumerations;


enum Notice: string
{
    case SUCCESS = "notice.success";
    case WARNING = "notice.warning";
    case ERROR = "notice.error";
}
