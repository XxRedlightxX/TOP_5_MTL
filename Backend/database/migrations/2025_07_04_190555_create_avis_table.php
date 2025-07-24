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
        Schema::create('avis', function (Blueprint $table) {
            $table->id();
            $table->dateTime("date");
            $table->foreignId('utilisateur_id')
                ->constrained('utilisateur')
                ->onDelete('cascade')
                ->nullable();
            $table->foreignId('activite_id')
                ->constrained('activite')
                ->onDelete('cascade')
                ->nullable(); 
            $table->text('contenu');
            $table->unsignedBigInteger('etoiles')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avis');
    }
};
