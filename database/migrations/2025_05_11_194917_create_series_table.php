<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('series', function (Blueprint $table) {
            $table->id();
            $table->string('title');                      // Título da série
            $table->text('description')->nullable();      // Descrição
            $table->year('release_year');                 // Ano de lançamento
            $table->string('genre');                      // Gênero
            $table->string('image')->nullable();          // Caminho da imagem
            $table->timestamps();                         // created_at e updated_at
            $table->softDeletes();                        // deleted_at (exclusão lógica)
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('series');
    }
};
