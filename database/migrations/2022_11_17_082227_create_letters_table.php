<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('letters', function (Blueprint $table) {
            $table->id();
            $table->string('ref')
                ->nullable();
            $table->unsignedBigInteger('user_id');
            $table->enum('type', ['receive', 'send'])->default('receive');
            $table->mediumText('subject');
            $table->string('sender_full_name');
            $table->string('recipient_full_name');
            $table->dateTime('receive_at');
            $table->string('file_path')->nullable();
            $table->text('detail')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('letters');
    }
};
