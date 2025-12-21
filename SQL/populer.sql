
-- USE the correct database V3
USE `backend`;

-- -----------------------------------------------------
-- UTILISATEURS (Updated with new fields)
-- -----------------------------------------------------
INSERT INTO utilisateur (name, username, email, password, type_utilisateur, image_data, num_tel, description, created_at, updated_at)
VALUES
('Alice Dupont', 'alice92', 'alice@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', '514-123-4567', 'Amateur de concerts et festivals', NOW(), NOW()),
('Bob Martin', 'bob_martin', 'bob@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', '514-234-5678', 'Passionné de sports et activités en plein air', NOW(), NOW()),
('Claire Bernard', 'claire_b', 'claire@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', '514-345-6789', 'J adore les expositions et ateliers créatifs', NOW(), NOW()),
('David Leroy', 'david_leroy', 'david@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', '514-456-7890', 'Organisateur dévénements culturels', NOW(), NOW()),
('Emma Moreau', 'emma_m', 'emma@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', '514-567-8901', 'Fan de spectacles et théâtre', NOW(), NOW()),
('François Petit', 'francois_p', 'francois@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', '514-678-9012', 'Photographe amateur', NOW(), NOW()),
('Gabrielle Roux', 'gabrielle_r', 'gabrielle@example.com', 'password', 'organisateur', 'https://picsum.photos/200/200', '514-789-0123', 'Organisatrice de festivals', NOW(), NOW()),
('Hugo Faure', 'hugo_f', 'hugo@example.com', 'password', 'organisateur', 'https://picsum.photos/200/200', '514-890-1234', 'Producteur dévénements musicaux', NOW(), NOW()),
('Isabelle Noel', 'isabelle_n', 'isabelle@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', '514-901-2345', 'Guide touristique passionnée', NOW(), NOW()),
('Julien Blanc', 'julien_b', 'julien@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', '514-012-3456', 'Sportif et aventurier', NOW(), NOW());

-- -----------------------------------------------------
-- TYPES D'ACTIVITES
-- -----------------------------------------------------
INSERT INTO type (nom, image_data, created_at, updated_at)
VALUES
('Concert', 'mdi-music', NOW(), NOW()),
('Festival', 'mdi-party-popper', NOW(), NOW()),
('Sport', 'mdi-soccer', NOW(), NOW()),
('Exhibition', 'mdi-image-frame', NOW(), NOW()),
('Workshop', 'mdi-hammer-wrench', NOW(), NOW()),
('Conference', 'mdi-podium', NOW(), NOW()),
('Show', 'mdi-drama-masks', NOW(), NOW()),
('Walk', 'mdi-walk', NOW(), NOW()),
('Guided Tour', 'mdi-map-marker', NOW(), NOW()),
('Cinema', 'mdi-movie', NOW(), NOW());

-- -----------------------------------------------------
-- SAISONS
-- -----------------------------------------------------
INSERT INTO saison (statut)
VALUES
('ETE'),
('AUTOMNE'),
('HIVER'),
('PRINTEMPS');

-- -----------------------------------------------------
-- ACTIVITES (Updated with image_data2)
-- -----------------------------------------------------
INSERT INTO activite (titre, description, date_debut, date_fin, toute_la_journee, toute_annee, lieu, nombre_likes, latitude, longitude, statut_journee, image_data, image_data2, utilisateur_id, saison_id, type_id, created_at, updated_at)
VALUES
('Mount Royal Concert', 'Great outdoor concert with local artists',
 '2025-11-29 18:00:00', '2025-09-10 23:00:00', 0, 0,
 'Mont-Royal', 5, 45.504, -73.577, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 1, 1, NOW(), NOW()),

('Old Port Festival', 'International music festival',
 '2025-11-16 10:00:00', '2025-09-15 22:00:00', 1, 0,
 'Old Port', 8, 45.507, -73.554, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 2, 2, NOW(), NOW()),

('Botanical Garden Exhibition', 'Flower and sculpture exhibition',
 '2025-11-24 09:00:00', '2025-09-20 18:00:00', 1, 0,
 'Botanical Garden', 3, 45.562, -73.562, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 3, 4, NOW(), NOW()),

('Creative Workshop', 'Painting and drawing workshop for beginners',
 '2025-09-25 14:00:00', '2025-09-25 17:00:00', 0, 0,
 'Cultural Center', 7, 45.509, -73.567, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 4, 5, NOW(), NOW()),

('Theater Show', 'Contemporary theater play',
 '2025-09-28 19:00:00', '2025-09-28 21:00:00', 0, 0,
 'Old Port Theater', 6, 45.508, -73.560, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 5, 1, 7, NOW(), NOW())
 ('Place des Arts Concert', 'Live show featuring local and international artists.',
 '2025-07-05 19:00:00', '2025-07-05 22:00:00', 0, 0,
 'Place des Arts', 12, 45.5087, -73.5660, 'night',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 1, 1, NOW(), NOW()),

-- 2 - Piknic Électronik at Parc Jean-Drapeau
('Piknic Électronik', 'Electronic music event held outdoors every summer.',
 '2025-06-16 14:00:00', '2025-06-16 21:00:00', 0, 0,
 'Parc Jean-Drapeau', 20, 45.5145, -73.5315, 'day',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 1, 2, NOW(), NOW()),

-- 3 - Montréal Museum of Fine Arts Exhibition
('Fine Arts Museum Exhibition', 'Seasonal exhibition showcasing modern art.',
 '2025-08-01 10:00:00', '2025-08-01 18:00:00', 1, 0,
 'Montréal Museum of Fine Arts', 9, 45.4972, -73.5790, 'day',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 2, 4, NOW(), NOW()),

-- 4 - Old Port Guided Tour
('Old Port Guided Tour', 'Historical walking tour through Montreal’s Old Port.',
 '2025-07-12 11:00:00', '2025-07-12 13:00:00', 0, 0,
 'Old Port of Montréal', 15, 45.5075, -73.5530, 'day',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 1, 9, NOW(), NOW()),

-- 5 - Mount Royal Sunrise Hike
('Mount Royal Sunrise Hike', 'Early morning hike with panoramic views of the city.',
 '2025-0-20 05:00:00', '2025-07-20 08:00:00', 0, 0,
 'Mount Royal Park', 18, 45.5048, -73.5878, 'day',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 5, 1, 8, NOW(), NOW()),

-- 6 - Atwater Market Food Workshop
('Atwater Market Culinary Workshop', 'Cooking class using local seasonal ingredients.',
 '2025-11-23 14:00:00', '2025-09-14 17:00:00', 0, 0,
 'Atwater Market', 7, 45.4799, -73.5753, 'day',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 6, 2, 5, NOW(), NOW()),

-- 7 - Festival International de Jazz
('Montreal Jazz Festival', 'One of the world’s biggest jazz festivals.',
 '2025-07-01 12:00:00', '2025-07-01 23:00:00', 1, 0,
 'Quartier des Spectacles', 25, 45.5083, -73.5640, 'day',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 7, 1, 2, NOW(), NOW()),

-- 8 - Biodôme Nature Experience
('Biodome Nature Experience', 'Discover ecosystems of the Americas.',
 '2025-12-10 09:00:00', '2025-08-10 17:00:00', 1, 0,
 'Montréal Biodôme', 45.5591, -73.5519, 5, 'day',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 8, 3, 4, NOW(), NOW()),

-- 9 - Cinema Under the Stars at Parc Laurier
('Cinema Under the Stars', 'Outdoor movie screening for families.',
 '2025-12-22 20:30:00', '2025-08-22 23:00:00', 0, 0,
 'Parc Laurier', 6, 45.5282, -73.5724, 'night',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 9, 3, 10, NOW(), NOW()),

-- 10 - Science Center Interactive Expo
('Science Center Interactive Expo', 'Interactive science and technology exhibition.',
 '2025-12-05 09:00:00', '2025-09-05 17:00:00', 1, 0,
 'Montreal Science Centre', 45.5076, -73.5502, 'day',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 10, 4, 4, NOW(), NOW()),

 ('Winter Jazz Night', 'Indoor jazz concert featuring Montreal artists.',
 '2025-12-05 19:00:00', '2025-12-05 22:00:00', 0, 0,
 'Quartier des Spectacles', 10, 45.5083, -73.5640, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 1, 4, 2, NOW(), NOW()),

('Botanical Garden Winter Lights', 'Magical winter light display in the Botanical Garden.',
 '2025-12-15 17:00:00', '2025-12-15 21:00:00', 0, 0,
 'Montreal Botanical Garden', 15, 45.5615, -73.5630, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 2, 4, 1, NOW(), NOW()),

('New Years Eve Celebration', 'Countdown party with fireworks at the Old Port.',
 '2025-12-31 20:00:00', '2026-01-01 01:00:00', 0, 0,
 'Old Port of Montreal', 50, 45.5075, -73.5530, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 3, 1, 2, NOW(), NOW()),

('Montreal Ice Skating Festival', 'Outdoor skating rink and winter games.',
 '2026-01-05 10:00:00', '2026-01-05 18:00:00', 1, 0,
 'Parc La Fontaine', 20, 45.5270, -73.5770, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 4, 1, 8, NOW(), NOW()),

('Winter Film Series', 'Screenings of classic movies at a local cinema.',
 '2026-01-10 18:00:00', '2026-01-10 21:00:00', 0, 0,
 'Cinema du Plateau', 8, 45.5230, -73.5817, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 5, 4, 10, NOW(), NOW()),

('Indoor Science Expo', 'Interactive science exhibits for kids and families.',
 '2026-01-15 09:00:00', '2026-01-15 17:00:00', 1, 0,
 'Montreal Science Centre', 12, 45.5076, -73.5502, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 6, 4, 4, NOW(), NOW()),

('Mont-Royal Snow Hike', 'Guided snowshoe hike with panoramic city views.',
 '2026-01-20 08:00:00', '2026-01-20 11:00:00', 0, 0,
 'Mount Royal Park', 7, 45.5048, -73.5878, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 7, 1, 8, NOW(), NOW()),

('Atwater Winter Market', 'Indoor market with seasonal crafts and local food.',
 '2026-01-22 10:00:00', '2026-01-22 16:00:00', 0, 0,
 'Atwater Market', 5, 45.4799, -73.5753, 'jour',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 8, 1, 9, NOW(), NOW()),

('Montreal Classical Concert', 'Orchestra performance of classical music.',
 '2026-01-25 19:30:00', '2026-01-25 22:00:00', 0, 0,
 'Place des Arts', 18, 45.5087, -73.5660, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 9, 4, 1, NOW(), NOW()),

('Downtown Comedy Night', 'Stand-up comedy featuring local Montreal comedians.',
 '2026-01-28 20:00:00', '2026-01-28 22:30:00', 0, 0,
 'Downtown Montreal', 6, 45.5017, -73.5673, 'nuit',
 'https://picsum.photos/640/480', 'https://picsum.photos/640/480',
 10, 1, 8, NOW(), NOW());




-- -----------------------------------------------------
-- AVIS
-- -----------------------------------------------------
INSERT INTO avis (date, utilisateur_id, activite_id, contenu, etoiles)
VALUES
('2025-09-11 20:00:00', 1, 1, 'Super concert, ambiance géniale', 5),
('2025-09-16 15:00:00', 2, 2, 'Très beau festival', 4),
('2025-09-21 12:00:00', 3, 3, 'Exposition intéressante', 4),
('2025-09-26 16:00:00', 4, 4, 'Atelier très instructif', 5),
('2025-09-28 20:00:00', 5, 5, 'Spectacle captivant', 4);


-- -----------------------------------------------------
-- FAVORIS
-- -----------------------------------------------------
INSERT INTO favori (utilisateur_id, activite_id)
VALUES
(1, 2),
(2, 1),
(3, 3),
(4, 4),
(5, 5);

-- -----------------------------------------------------
-- MESSAGERIE
-- -----------------------------------------------------
INSERT INTO messagerie (expediteur_id, destinataire_id, contenu, date)
VALUES
(1, 2, 'Salut Bob, tu vas au festival ?', '2025-09-10 12:00:00'),
(2, 1, 'Oui, j’y serai !', '2025-09-10 12:05:00'),
(3, 1, 'Salut Alice, tu viens à l’expo ?', '2025-09-20 10:00:00');

-- -----------------------------------------------------
-- LIKES
-- -----------------------------------------------------
INSERT INTO likes (utilisateur_id, activite_id, created_at, updated_at)
VALUES
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 3, NOW(), NOW()),
(4, 4, NOW(), NOW()),
(5, 5, NOW(), NOW());

-- -----------------------------------------------------
-- FOLLOWERS
-- -----------------------------------------------------
INSERT INTO followers (follower_id, followed_id, created_at, updated_at)
VALUES
(1, 2, NOW(), NOW()),
(2, 3, NOW(), NOW()),
(3, 1, NOW(), NOW()),
(4, 5, NOW(), NOW()),
(5, 1, NOW(), NOW());

