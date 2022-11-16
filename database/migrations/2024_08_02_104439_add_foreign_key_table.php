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
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('image_id')
                ->references('id')
                ->on('images');
        });

    /*    Schema::table('product_images', function (Blueprint $table) {
            $table->foreign('image_id')
                ->references('id')
                ->on('images');

            $table->foreign('product_id')
                ->references('id')
                ->on('products');
        });

        Schema::table('product_variations', function (Blueprint $table) {

            $table->foreign('product_id')
                ->references('id')
                ->on('products');

            $table->foreign('variation_id')
                ->references('id')
                ->on('variations');
        });

        Schema::table('settings', function (Blueprint $table) {
            $table->foreign('image_id')
                ->references('id')
                ->on('images');

            $table->foreign('user_id')
                ->references('id')
                ->on('users');

            $table->foreign('maker_id')
                ->references('id')
                ->on('makers');
        });

        Schema::table('images', function (Blueprint $table) {
            $table->foreign('folder_id')
                ->references('id')
                ->on('folders');
        });

        Schema::table('folders', function (Blueprint $table) {
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->foreign('parent_id')
                ->references('id')
                ->on('categories');
            $table->foreign('image_large_id')
                ->references('id')
                ->on('images');
            $table->foreign('image_small_id')
                ->references('id')
                ->on('images');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->foreign('category_id')
                ->references('id')
                ->on('categories');

            $table->foreign('color_id')
                ->references('id')
                ->on('colors');

            $table->foreign('maker_id')
                ->references('id')
                ->on('makers');
        });*/

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
};
