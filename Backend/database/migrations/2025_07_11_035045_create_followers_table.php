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
        Schema::create('followers', function (Blueprint $table) {
            $table->foreignId('follower_id')->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId('followed_id')->constrained('utilisateur')->onDelete('cascade');
            $table->primary(['follower_id', 'followed_id']); // composite primary key to prevent duplicates
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followers');
    }
};
