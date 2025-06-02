<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->softDeletes(); // adiciona a coluna deleted_at
        });
    }

    public function down()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->dropSoftDeletes(); // remove a coluna deleted_at
        });
    }

};
