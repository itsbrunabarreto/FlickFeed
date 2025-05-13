<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('episodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('series_id')
                  ->constrained('series')
                  ->onDelete('cascade'); // se a série for deletada, os episódios também serão
            $table->integer('season');
            $table->integer('episode_number');
            $table->string('title', 200);
            $table->date('air_date')->nullable(); // pode ser nula se o episódio ainda não foi lançado
            $table->timestamps(); // created_at e updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episodes');
    }
};
