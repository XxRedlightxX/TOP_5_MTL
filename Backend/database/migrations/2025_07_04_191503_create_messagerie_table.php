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
        Schema::create('messagerie', function (Blueprint $table) {
            $table->id();
            $table->foreignId("expediteur_id")
                ->constrained("utilisateur")
                ->nullable()
                ->onDelete('cascade');

            $table->foreignId("destinataire_id")
                ->constrained("utilisateur")
                ->nullable()
                ->onDelete('cascade');

            $table->string("contenu");
            $table->dateTime("date");
            $table->unique(['expediteur_id', 'destinataire_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messagerie');
    }
};
