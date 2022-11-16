<?php


namespace App\Http\Services;


class SentenceInitial
{

    private string $name;

    /**
     * SentenceInitial constructor.
     * @param string $name
     */
    public function __construct(string $name)
    {
        $this->name = $name;
    }


    /**
     * @return string|null
     */
    public function getInitial(): ?string
    {
        $_str = null;
        $raw = str_word_count(trim($this->name), 1);

        $i = count($raw);
        if ($i == 1) {
            $_str .= strtoupper($raw[0][0]);
        } elseif ($i > 1) {
            $_str .= strtoupper($raw[0][0]) . strtoupper($raw[1][0]);
        }
        return $_str;
    }


    public function getInitialRGB(): string
    {

        $r = $this->getRed();
        $g = $this->getGreen();
        $b = $this->getBlue();

        return "rgba(" . $r . "," . $g . "," . $b . ")";
    }

    public function getInitialNextRGB(): string
    {

        $r = $this->getRed() + 55;
        $g = $this->getGreen() + 16;
        $b = $this->getBlue() + 45;

        return "rgba(" . $r . "," . $g . "," . $b . ")";
    }

    private function getRed(): float|int
    {
        $word_count = str_word_count($this->name);
        if ($word_count < 8) $word_count += 8;
        if (($word_count * 16) < 255) {
            return $word_count * 16;
        } else return 200;
    }

    private function getGreen(): float|int
    {
        $str_length = strlen($this->name);
        if ($str_length < 8) $str_length *= 8;
        if (($str_length * 4) < 255) {
            return $str_length * 4;
        } else return 239;
    }

    private function getBlue(): array|float|int
    {
        $word_count = str_word_count($this->name);
        if ($word_count < 10) $word_count *= 4;
        $str_length = strlen($this->name);
        if (($word_count + $str_length * 8) < 255) {
            return $word_count + $str_length * 8;
        } else return 210;
    }
}
