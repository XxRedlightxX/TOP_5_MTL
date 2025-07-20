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
        Schema::create('favori', function (Blueprint $table) {
            $table->foreignId('utilisateur_id')->constrained('utilisateur')->onDelete('cascade')->nullable();
            $table->foreignId('activite_id')->constrained('activite')->onDelete('cascade')->nullable();
            $table->primary(['activite_id', 'utilisateur_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favori');
    }
};
