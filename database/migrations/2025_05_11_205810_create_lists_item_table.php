<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('list_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('list_id');
            $table->unsignedBigInteger('item_id'); // ID do filme ou série
            $table->string('item_type'); // 'movie' ou 'serie'
            $table->timestamps();

            $table->foreign('list_id')->references('id')->on('lists')->onDelete('cascade');

            // Evita duplicação do mesmo item na mesma lista
            $table->unique(['list_id', 'item_id', 'item_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('list_items');
    }
};
