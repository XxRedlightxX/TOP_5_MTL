<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Enum\EnumSaison;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('saison', function (Blueprint $table) {
            $table->id();
             $table->enum('statut', array_column(EnumSaison::cases(), 'value'))
                    ->default(EnumSaison::ETE->value);
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saison');
    }
};
