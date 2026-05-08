<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Institutions
        $inst1 = \App\Models\Institution::create([
            'name' => 'Université Hassan II',
            'location' => 'Casablanca',
            'type' => 'Université Publique',
            'description' => 'La plus grande université du Maroc.'
        ]);
        $inst2 = \App\Models\Institution::create([
            'name' => 'INPT',
            'location' => 'Rabat',
            'type' => 'École d\'Ingénieurs',
            'description' => 'Institut National des Postes et Télécommunications.'
        ]);

        // Formations (Programs)
        \App\Models\Program::create([
            'institution_id' => $inst1->id,
            'name' => 'Licence en Informatique',
            'type_of_formation' => 'Licence',
            'specialty' => 'Développement',
            'description' => 'Formation généraliste en sciences informatiques.'
        ]);
        \App\Models\Program::create([
            'institution_id' => $inst2->id,
            'name' => 'Ingénierie Logicielle',
            'type_of_formation' => 'Cycle Ingénieur',
            'specialty' => 'Génie Logiciel',
            'description' => 'Formation d\'excellence en développement logiciel.'
        ]);

        // Articles (Resources)
        \App\Models\Resource::create([
            'title' => 'Comment choisir son école ?',
            'type' => 'Guide',
            'content' => 'Choisir son école après le Bac est une étape cruciale. Pensez à vos objectifs, vos notes et la localisation.',
            'author' => 'Conseiller AmOrientation'
        ]);
    }
}
