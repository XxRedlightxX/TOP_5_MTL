<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Enum\EnumMode;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activite', function (Blueprint $table) {
            $table->id();
            $table->string("titre");
            $table->text("description");
            $table->dateTime("date");
            $table->string("lieu");
            $table->unsignedBigInteger('nombre_likes')->default(0);;
            $table->enum('statut_journee', array_column(EnumMode::cases(), 'value'))
                    ->default(EnumMode::JOUR->value);
            $table->binary('image_data')->nullable();
            $table->foreignId("utilisateur_id")->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId("saison_id")->constrained('saison')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activite');
    }
};
