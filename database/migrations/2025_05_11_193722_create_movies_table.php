<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesTable extends Migration
{
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');               // Título do filme
            $table->text('description')->nullable(); // Descrição do filme
            $table->year('release_year');           // Ano de lançamento
            $table->string('genre');                // Gênero do filme
            $table->string('image')->nullable();    // Caminho da imagem
            $table->timestamps();                  // Colunas created_at e updated_at
            $table->softDeletes();                 // Para possibilitar soft delete
        });
    }

    public function down()
    {
        Schema::dropIfExists('movies');
    }
}
