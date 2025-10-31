-- -----------------------------------------------------
-- HIGH RATED ACTIVITES 
-- -----------------------------------------------------
INSERT INTO activite (
  titre, description, date_debut, date_fin, toute_la_journee, toute_annee, 
  lieu, nombre_likes, latitude, longitude, statut_journee, 
  image_data, image_data2, utilisateur_id, saison_id, type_id, created_at, updated_at
)
VALUES
-- 🌞 ÉVÉNEMENTS DE JOUR
('Festival des Arts du Plateau', 
 'Une célébration colorée mettant en avant les artistes émergents de Montréal. Peintres, musiciens et créateurs se rassemblent pour offrir une expérience artistique vibrante au cœur du Plateau.', 
 '2027-06-15 10:00:00', '2027-06-15 17:00:00', 
 0, 0, 'Parc du Mont-Royal', 4.5, 45.504, -73.577, 'jour', 
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 
 2, 2, 1, NOW(), NOW()),

('Pique-nique au Parc Lafontaine', 
 'Une journée conviviale de détente et de jeux en plein air, entourée de verdure et d’un lac paisible. Idéal pour les familles et les amis cherchant à profiter d’un moment tranquille à Montréal.', 
 '2027-07-20 11:00:00', '2027-07-20 15:30:00', 
 0, 0, 'Parc Lafontaine', 4, 45.523, -73.563, 'jour', 
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 
 3, 3, 2, NOW(), NOW()),

('Brunch Gourmand du Vieux-Port', 
 'Les meilleurs chefs de Montréal se réunissent pour offrir un brunch géant au bord du fleuve. Une expérience culinaire riche en saveurs locales et en ambiance chaleureuse.', 
 '2027-08-10 09:00:00', '2027-08-10 14:00:00', 
 0, 0, 'Vieux-Port de Montréal', 5, 45.504, -73.554, 'jour', 
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 
 4, 3, 3, NOW(), NOW()),

('Course Nature du Canal Lachine', 
 'Une course amicale longeant le canal Lachine, parfaite pour découvrir les paysages urbains et naturels de Montréal. Accessible à tous les niveaux, dans une ambiance énergique et communautaire.', 
 '2027-05-05 08:00:00', '2027-05-05 12:00:00', 
 0, 0, 'Canal Lachine', 4.5, 45.478, -73.580, 'jour', 
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 
 1, 1, 4, NOW(), NOW()),

-- 🌙 ÉVÉNEMENTS DE NUIT
('Soirée Jazz au Vieux-Montréal', 
 'Une soirée envoûtante où les sons du jazz remplissent les rues pavées du Vieux-Montréal. Des musiciens talentueux offrent une ambiance feutrée et romantique sous les lumières des lampadaires.', 
 '2027-09-12 19:00:00', '2027-09-12 23:30:00', 
 0, 0, 'Vieux-Montréal', 5, 45.505, -73.554, 'nuit', 
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 
 5, 4, 1, NOW(), NOW()),

('Cinéma en plein air au Parc Jeanne-Mance', 
 'Profitez d’un film culte sous les étoiles avec vos amis. Un écran géant, du popcorn et une ambiance détendue pour une soirée magique en plein cœur de Montréal.', 
 '2027-08-18 20:30:00', '2027-08-18 23:00:00', 
 0, 0, 'Parc Jeanne-Mance', 4, 45.512, -73.579, 'nuit', 
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 
 1, 3, 2, NOW(), NOW()),

('Nuit des Musées de Montréal', 
 'Découvrez les musées de la ville ouverts tard dans la nuit. Expositions spéciales, ateliers et performances artistiques vous attendent dans une atmosphère inspirante et mystérieuse.', 
 '2027-05-25 18:00:00', '2027-05-26 01:00:00', 
 0, 0, 'Centre-ville de Montréal', 4.5, 45.501, -73.567, 'nuit', 
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 
 2, 2, 3, NOW(), NOW()),

('Bal Électro du Quartier des Spectacles', 
 'Une nuit de danse électrisante au rythme des DJ locaux et internationaux. Jeux de lumière, projections et ambiance festive garantissent une expérience nocturne inoubliable.', 
 '2027-07-30 21:00:00', '2027-07-31 03:00:00', 
 0, 0, 'Quartier des Spectacles', 5, 45.507, -73.568, 'nuit', 
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 
 3, 4, 5, NOW(), NOW());

-- -----------------------------------------------------
-- UPCOMING ACTIVITES
-- -----------------------------------------------------

INSERT INTO activite (
  titre, description, date_debut, date_fin, toute_la_journee, toute_annee,
  lieu, nombre_likes, latitude, longitude, statut_journee,
  image_data, image_data2, utilisateur_id, saison_id, type_id, created_at, updated_at
)
VALUES
-- 🌞 ÉVÉNEMENTS DE JOUR
('Brunch Musical du Plateau',
 'Un brunch gourmand accompagné de performances acoustiques d’artistes locaux. L’endroit idéal pour savourer un repas relaxant en profitant d’une ambiance musicale et conviviale au cœur du Plateau Mont-Royal.',
 '2025-06-08 10:30:00', '2025-06-08 14:00:00',
 0, 0, 'Plateau Mont-Royal', 2.9, 45.523, -73.582, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 2, 1, NOW(), NOW()),

('Atelier Photo Nature',
 'Apprenez à capturer la beauté du paysage montréalais lors d’un atelier photo en plein air. Des photographes expérimentés partagent leurs astuces et accompagnent les participants sur les sentiers du Mont-Royal.',
 '2025-05-25 09:00:00', '2025-05-25 12:30:00',
 0, 0, 'Mont-Royal', 3.1, 45.504, -73.577, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 1, 3, NOW(), NOW()),

('Festival du Livre',
 'Des auteurs et éditeurs se rassemblent pour célébrer la littérature sous toutes ses formes. Conférences, dédicaces et découvertes de livres locaux vous attendent dans une ambiance intellectuelle et détendue.',
 '2025-04-28 10:00:00', '2025-04-28 17:00:00',
 0, 0, 'Palais des Congrès', 2.6, 45.504, -73.561, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 2, 4, NOW(), NOW()),

('Foire Artisanale du Marché Jean-Talon',
 'Une exposition artisanale mettant en avant les créateurs montréalais. Bijoux, céramiques et vêtements faits main s’exposent dans une ambiance chaleureuse et familiale.',
 '2025-07-05 09:00:00', '2025-07-05 15:00:00',
 0, 0, 'Marché Jean-Talon', 3.3, 45.535, -73.616, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 3, 5, NOW(), NOW()),

('Yoga au Parc Laurier',
 'Une séance de yoga gratuite en plein air, ouverte à tous les niveaux. Un moment de détente et de reconnexion dans la nature, guidé par un instructeur passionné.',
 '2025-06-22 09:30:00', '2025-06-22 11:00:00',
 0, 0, 'Parc Laurier', 1.9, 45.526, -73.581, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 5, 2, 2, NOW(), NOW()),

('Atelier Sculpture sur Bois',
 'Les participants découvrent les bases de la sculpture sur bois avec un artisan expérimenté. Un atelier pratique et relaxant pour laisser libre cours à sa créativité.',
 '2025-05-30 11:00:00', '2025-05-30 16:00:00',
 0, 0, 'Maison de la Culture Rosemont', 2.4, 45.550, -73.582, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 1, 5, NOW(), NOW()),

('Marché Fermier du Sud-Ouest',
 'Les producteurs de la région se réunissent pour proposer des produits frais et locaux. Une belle occasion de goûter au terroir et de rencontrer les agriculteurs montréalais.',
 '2025-08-17 08:00:00', '2025-08-17 14:30:00',
 0, 0, 'Marché Atwater', 3.5, 45.479, -73.575, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 3, 1, NOW(), NOW()),

('Expo Vélo et Mobilité Durable',
 'Une exposition interactive autour des transports écologiques. Des essais de vélos électriques et des discussions sur les initiatives vertes à Montréal.',
 '2025-04-12 10:00:00', '2025-04-12 17:00:00',
 0, 0, 'Quartier des Spectacles', 2.7, 45.507, -73.568, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 1, 3, NOW(), NOW()),

('Atelier de Dessin Urbain',
 'Une activité artistique pour croquer l’architecture montréalaise. Encadré par un illustrateur local, l’atelier combine technique et découverte culturelle dans les rues historiques.',
 '2025-09-03 13:00:00', '2025-09-03 17:00:00',
 0, 0, 'Vieux-Montréal', 2.1, 45.505, -73.554, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 4, 4, NOW(), NOW()),

-- 🌙 ÉVÉNEMENTS DE NUIT
('Soirée Blues au Bord du Fleuve',
 'Une soirée musicale au bord de l’eau où résonnent les sons doux du blues. Une atmosphère romantique et décontractée pour bien finir la semaine à Montréal.',
 '2025-08-09 20:00:00', '2025-08-09 23:30:00',
 0, 0, 'Vieux-Port de Montréal', 3.4, 45.504, -73.554, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 5, 3, 2, NOW(), NOW()),

('Balade Nocturne Guidée du Mont-Royal',
 'Découvrez Montréal de nuit à travers une marche guidée au Mont-Royal. L’ambiance mystique et les vues panoramiques offrent un moment inoubliable aux participants.',
 '2025-07-20 21:00:00', '2025-07-20 23:00:00',
 0, 0, 'Mont-Royal', 3.0, 45.504, -73.577, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 2, 3, NOW(), NOW()),

('Concert Intime au Café Distant',
 'Un concert acoustique dans une ambiance feutrée et conviviale. Des musiciens locaux y présentent leurs compositions originales dans un décor chaleureux et tamisé.',
 '2025-05-31 19:30:00', '2025-05-31 22:30:00',
 0, 0, 'Café Distant', 2.8, 45.518, -73.590, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 2, 4, NOW(), NOW()),

('Spectacle de Danse Contemporaine',
 'Des danseurs de Montréal présentent un spectacle audacieux et expressif dans une salle intimiste. Une exploration artistique du mouvement et de la lumière.',
 '2025-06-14 19:00:00', '2025-06-14 21:30:00',
 0, 0, 'Théâtre Rialto', 3.2, 45.524, -73.598, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 3, 5, NOW(), NOW()),

('Soirée Jeux Vidéo Rétro',
 'Les amateurs de jeux classiques se réunissent pour redécouvrir les consoles et titres mythiques des années 80 et 90. Tournois amicaux et ambiance nostalgique garantis.',
 '2025-09-18 18:00:00', '2025-09-19 01:00:00',
 0, 0, 'Café Pixel', 2.3, 45.520, -73.567, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 4, 1, NOW(), NOW()),

('Cinéma Extérieur Spécial Comédie',
 'Projection d’un film comique culte sous les étoiles. Rires et bonne humeur partagés dans une atmosphère estivale et détendue.',
 '2025-07-11 21:00:00', '2025-07-11 23:30:00',
 0, 0, 'Parc Lafontaine', 3.5, 45.523, -73.563, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 3, 2, NOW(), NOW()),

('Nuit des Improvisations',
 'Une scène ouverte où comédiens et humoristes s’affrontent dans des duels d’improvisation. Le public vote pour ses favoris dans une ambiance hilarante et participative.',
 '2025-08-28 19:30:00', '2025-08-28 23:00:00',
 0, 0, 'Théâtre Sainte-Catherine', 3.1, 45.514, -73.560, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 5, 3, 5, NOW(), NOW()),

('Nuit des Lanternes Chinoises',
 'Le Jardin Botanique s’illumine de milliers de lanternes colorées. Une promenade féerique qui transporte les visiteurs dans une ambiance magique et paisible.',
 '2025-09-20 19:00:00', '2025-09-20 23:00:00',
 0, 0, 'Jardin Botanique', 3.3, 45.563, -73.553, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 4, 3, NOW(), NOW()),

('Soirée Open Mic Poétique',
 'Les poètes et amateurs de slam se succèdent sur scène pour partager leurs textes dans une atmosphère intimiste. Une soirée culturelle et inspirante à ne pas manquer.',
 '2025-05-09 20:00:00', '2025-05-09 23:00:00',
 0, 0, 'Café des Arts', 2.7, 45.519, -73.586, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 2, 4, NOW(), NOW());

-- -----------------------------------------------------
-- NEW ACTIVITES
-- -----------------------------------------------------
INSERT INTO activite (
  titre, description, date_debut, date_fin, toute_la_journee, toute_annee,
  lieu, nombre_likes, latitude, longitude, statut_journee,
  image_data, image_data2, utilisateur_id, saison_id, type_id, created_at, updated_at
)
VALUES
-- 🌞 ÉVÉNEMENTS DE JOUR
('Marathon du Printemps',
 'Des milliers de coureurs se rassemblent pour le célèbre marathon de Montréal. L’événement met en lumière la vitalité urbaine et la passion du sport dans une ambiance énergique et encourageante pour tous les âges.',
 '2025-05-12 08:00:00', '2025-05-12 13:00:00',
 0, 0, 'Centre-ville de Montréal', 3.2, 45.501, -73.567, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 1, 1, NOW(), NOW()),

('Fête des Enfants au Parc Maisonneuve',
 'Un événement familial proposant jeux gonflables, ateliers créatifs et spectacles pour enfants. L’endroit idéal pour passer une journée remplie de rires et de découvertes en plein air.',
 '2025-06-10 10:00:00', '2025-06-10 16:00:00',
 0, 0, 'Parc Maisonneuve', 2.5, 45.559, -73.549, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 2, 3, NOW(), NOW()),

('Expo Écologique de Montréal',
 'Une exposition éducative dédiée à la durabilité, avec des stands sur les énergies vertes, le recyclage et l’agriculture urbaine. Un rendez-vous parfait pour apprendre à mieux protéger la planète.',
 '2025-04-22 09:00:00', '2025-04-22 17:00:00',
 0, 0, 'Palais des Congrès', 3.0, 45.504, -73.561, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 1, 5, NOW(), NOW()),

('Atelier de Peinture en Plein Air',
 'Les artistes amateurs et professionnels se retrouvent pour peindre la beauté des paysages montréalais. Des conseils sont offerts par des peintres locaux dans une ambiance conviviale et détendue.',
 '2025-07-02 11:00:00', '2025-07-02 15:30:00',
 0, 0, 'Parc Laurier', 2.0, 45.526, -73.581, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 3, 2, NOW(), NOW()),

('Marché Local du Mile-End',
 'Des producteurs locaux se réunissent pour proposer fruits, légumes, fromages et produits artisanaux. Un marché vibrant où les visiteurs découvrent le meilleur du terroir montréalais.',
 '2025-08-09 08:00:00', '2025-08-09 14:00:00',
 0, 0, 'Mile-End', 3.3, 45.523, -73.602, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 5, 3, 1, NOW(), NOW()),

('Randonnée Urbaine du Mont-Royal',
 'Explorez les sentiers du Mont-Royal avec des guides passionnés qui racontent l’histoire et la biodiversité du lieu. Une belle activité de plein air accessible à tous.',
 '2025-05-19 09:00:00', '2025-05-19 12:30:00',
 0, 0, 'Mont-Royal', 1.8, 45.504, -73.577, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 1, 4, NOW(), NOW()),

('Jardin Botanique en Fête',
 'Des activités florales et des ateliers de jardinage pour célébrer la saison estivale. Les visiteurs peuvent admirer les serres et participer à des démonstrations horticoles.',
 '2025-06-25 10:00:00', '2025-06-25 17:00:00',
 0, 0, 'Jardin Botanique', 3.5, 45.563, -73.553, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 2, 5, NOW(), NOW()),

('Tour Guidé du Quartier Latin',
 'Découvrez les secrets du Quartier Latin à travers une visite guidée culturelle et historique. Idéal pour les amoureux de l’architecture et de la culture montréalaise.',
 '2025-09-01 14:00:00', '2025-09-01 17:00:00',
 0, 0, 'Quartier Latin', 2.7, 45.514, -73.561, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 4, 2, NOW(), NOW()),

('Atelier de Cuisine Végétarienne',
 'Apprenez à cuisiner des plats sains et savoureux avec des chefs locaux. Un atelier participatif où l’on découvre la gastronomie végétarienne dans une ambiance détendue.',
 '2025-07-12 11:00:00', '2025-07-12 14:30:00',
 0, 0, 'Petite-Italie', 3.0, 45.535, -73.616, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 3, 3, NOW(), NOW()),

-- 🌙 ÉVÉNEMENTS DE NUIT
('Projection de Court-Métrages',
 'Une sélection de films indépendants projetés en plein air, mettant en valeur le talent des jeunes réalisateurs montréalais. Une soirée cinéphile à ne pas manquer.',
 '2025-08-22 20:00:00', '2025-08-22 23:00:00',
 0, 0, 'Place des Arts', 3.2, 45.507, -73.567, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 4, 2, NOW(), NOW()),

('Balade Nocturne sur le Canal',
 'Une promenade paisible au bord du canal Lachine éclairé par des lampadaires doux. Parfait pour admirer la ville sous un autre angle et profiter du calme de la nuit.',
 '2025-07-14 21:00:00', '2025-07-14 23:30:00',
 0, 0, 'Canal Lachine', 2.0, 45.478, -73.580, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 5, 3, 4, NOW(), NOW()),

('Soirée Karaoké Populaire',
 'Chantez vos chansons préférées dans une ambiance décontractée au cœur du Plateau. Rires, convivialité et musique garantis toute la soirée.',
 '2025-05-09 19:30:00', '2025-05-09 23:59:00',
 0, 0, 'Le Plateau', 3.5, 45.523, -73.582, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 2, 1, NOW(), NOW()),

('Spectacle de Feu et Lumières',
 'Un show pyrotechnique spectaculaire illuminant le ciel de Montréal. Idéal pour les amateurs de sensations visuelles fortes et de musique entraînante.',
 '2025-08-02 22:00:00', '2025-08-03 00:00:00',
 0, 0, 'Vieux-Port de Montréal', 3.3, 45.504, -73.554, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 4, 5, NOW(), NOW()),

('Nuit de Contes Urbains',
 'Des conteurs et artistes de la parole partagent leurs histoires fascinantes dans une atmosphère intime et mystérieuse. L’art oral montré à son plus haut niveau.',
 '2025-10-10 20:00:00', '2025-10-10 23:00:00',
 0, 0, 'Monument-National', 2.5, 45.509, -73.564, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 4, 3, NOW(), NOW()),

('Observation des Étoiles à l’Oratoire',
 'Les passionnés d’astronomie se retrouvent pour observer le ciel de Montréal à travers des télescopes puissants. Une expérience éducative et apaisante sous les étoiles.',
 '2025-09-25 21:00:00', '2025-09-25 23:30:00',
 0, 0, 'Oratoire Saint-Joseph', 3.0, 45.492, -73.619, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 5, 3, 5, NOW(), NOW()),

('Soirée Latino au Bord de l’Eau',
 'Une fête rythmée par la salsa et la bachata au bord du fleuve. L’ambiance festive et la musique entraînante font de cette soirée un rendez-vous incontournable.',
 '2025-07-18 20:00:00', '2025-07-19 02:00:00',
 0, 0, 'Vieux-Port de Montréal', 3.4, 45.504, -73.554, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 3, 2, NOW(), NOW()),

('Marché de Nuit du Village',
 'Un marché nocturne plein de vie, où se côtoient artisans, musiciens et food trucks. L’endroit parfait pour flâner, manger et découvrir des créations locales.',
 '2025-08-15 18:00:00', '2025-08-16 00:00:00',
 0, 0, 'Village', 3.1, 45.518, -73.561, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 2, 4, NOW(), NOW()),

('Nuit du Jeu au Café Ludique',
 'Les passionnés de jeux de société se rassemblent pour une nuit de défis, de rires et de convivialité. Ouvert à tous les niveaux et aux curieux.',
 '2025-09-07 19:00:00', '2025-09-08 02:00:00',
 0, 0, 'Café L’Aiguille', 2.8, 45.519, -73.584, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 4, 1, NOW(), NOW());
