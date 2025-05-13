<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('movie_id')->nullable();
            $table->unsignedBigInteger('series_id')->nullable();
            $table->tinyInteger('rating')->unsigned();  // Avaliação entre 1 e 5
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
            $table->foreign('series_id')->references('id')->on('series')->onDelete('cascade');
        });

        // Adiciona a constraint para o rating ser entre 1 e 5
        DB::statement('ALTER TABLE ratings ADD CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5)');

        // Adiciona a constraint para garantir que ou movie_id ou series_id sejam preenchidos, mas não ambos
        DB::statement('ALTER TABLE ratings ADD CONSTRAINT chk_movie_or_series CHECK (
            (movie_id IS NOT NULL AND series_id IS NULL) OR 
            (movie_id IS NULL AND series_id IS NOT NULL)
        )');
    }

    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
