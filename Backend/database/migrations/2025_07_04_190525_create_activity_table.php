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
            $table->dateTime("date_debut");
            $table->dateTime("date_fin");
            $table->boolean('toute_la_journee')->default(false);
             $table->boolean('toute_annee')->default(false);
            $table->string("lieu");
            $table->decimal('nombre_likes', 8, 2)->default(0);
            $table->decimal('latitude', 10, 8)->nullable()->default(0);
            $table->decimal('longitude', 11, 8)->nullable()->default(0);
            $table->enum('statut_journee', array_column(EnumMode::cases(), 'value'))
                    ->default(EnumMode::JOUR->value);
            $table->string('image_data')->nullable();
            $table->foreignId("utilisateur_id")->constrained('utilisateur')->onDelete('cascade');
            $table->foreignId("saison_id")->constrained('saison')->onDelete('cascade');
            $table->foreignId("type_id")->constrained('type')->onDelete('cascade')->nullable();
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
