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
('Exposition', 'mdi-image-frame', NOW(), NOW()),
('Atelier', 'mdi-hammer-wrench', NOW(), NOW()),
('Conférence', 'mdi-podium', NOW(), NOW()),
('Spectacle', 'mdi-drama-masks', NOW(), NOW()),
('Balade', 'mdi-walk', NOW(), NOW()),
('Visite guidée', 'mdi-map-marker', NOW(), NOW()),
('Cinéma', 'mdi-movie', NOW(), NOW());

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
('Concert Mont-Royal', 'Super concert en plein air avec artistes locaux', '2025-09-10 18:00:00', '2025-09-10 23:00:00', 0, 0, 'Mont-Royal', 5, 45.504, -73.577, 'nuit', 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 1, 1, 1, NOW(), NOW()),
('Festival Vieux-Port', 'Festival de musique internationale', '2025-09-15 10:00:00', '2025-09-15 22:00:00', 1, 0, 'Vieux-Port', 8, 45.507, -73.554, 'jour', 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 2, 2, 2, NOW(), NOW()),
('Exposition Jardin Botanique', 'Exposition florale et sculptures', '2025-09-20 09:00:00', '2025-09-20 18:00:00', 1, 0, 'Jardin Botanique', 3, 45.562, -73.562, 'jour', 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 3, 3, 4, NOW(), NOW()),
('Atelier Créatif', 'Atelier peinture et dessin pour débutants', '2025-09-25 14:00:00', '2025-09-25 17:00:00', 0, 0, 'Centre culturel', 7, 45.509, -73.567, 'jour', 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 4, 4, 5, NOW(), NOW()),
('Spectacle Théâtre', 'Pièce de théâtre contemporaine', '2025-09-28 19:00:00', '2025-09-28 21:00:00', 0, 0, 'Théâtre du vieux port', 6, 45.508, -73.560, 'nuit', 'https://picsum.photos/640/480', 'https://picsum.photos/640/480', 5, 1, 7, NOW(), NOW());

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

-----------------------------------------------------------------------------


-- USE the correct database V2
USE `backend`;
-- -----------------------------------------------------
-- UTILISATEURS
-- -----------------------------------------------------
INSERT INTO utilisateur (name, email, password, type_utilisateur, image_data, created_at, updated_at)
VALUES
('Alice Dupont', 'alice@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', NOW(), NOW()),
('Bob Martin', 'bob@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', NOW(), NOW()),
('Claire Bernard', 'claire@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', NOW(), NOW()),
('David Leroy', 'david@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', NOW(), NOW()),
('Emma Moreau', 'emma@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', NOW(), NOW()),
('François Petit', 'francois@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', NOW(), NOW()),
('Gabrielle Roux', 'gabrielle@example.com', 'password', 'organisateur', 'https://picsum.photos/200/200', NOW(), NOW()),
('Hugo Faure', 'hugo@example.com', 'password', 'organisateur', 'https://picsum.photos/200/200', NOW(), NOW()),
('Isabelle Noel', 'isabelle@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', NOW(), NOW()),
('Julien Blanc', 'julien@example.com', 'password', 'particulier', 'https://picsum.photos/200/200', NOW(), NOW());


-- -----------------------------------------------------
-- TYPES D'ACTIVITES
-- -----------------------------------------------------
INSERT INTO type (nom, image_data, created_at, updated_at)
VALUES
('Concert', 'https://picsum.photos/200/200', NOW(), NOW()),
('Festival', 'https://picsum.photos/200/200', NOW(), NOW()),
('Sport', 'https://picsum.photos/200/200', NOW(), NOW()),
('Exposition', 'https://picsum.photos/200/200', NOW(), NOW()),
('Atelier', 'https://picsum.photos/200/200', NOW(), NOW()),
('Conférence', 'https://picsum.photos/200/200', NOW(), NOW()),
('Spectacle', 'https://picsum.photos/200/200', NOW(), NOW()),
('Balade', 'https://picsum.photos/200/200', NOW(), NOW()),
('Visite guidée', 'https://picsum.photos/200/200', NOW(), NOW()),
('Cinéma', 'https://picsum.photos/200/200', NOW(), NOW());

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
-- ACTIVITES
-- -----------------------------------------------------
INSERT INTO activite (titre, description, date_debut, date_fin, toute_la_journee, toute_annee, lieu, nombre_likes, latitude, longitude, statut_journee, image_data, utilisateur_id, saison_id, type_id, created_at, updated_at)
VALUES
('Concert Mont-Royal', 'Super concert en plein air', '2025-09-10 18:00:00', '2025-09-10 23:00:00', 0, 0, 'Mont-Royal', 0, 45.504, -73.577, 'nuit', 'https://picsum.photos/640/480', 1, 1, 1, NOW(), NOW()),
('Festival Vieux-Port', 'Festival de musique', '2025-09-15 10:00:00', '2025-09-15 22:00:00', 1, 0, 'Vieux-Port', 0, 45.507, -73.554, 'jour', 'https://picsum.photos/640/480', 2, 2, 2, NOW(), NOW()),
('Exposition Jardin Botanique', 'Exposition florale', '2025-09-20 09:00:00', '2025-09-20 18:00:00', 1, 0, 'Jardin Botanique', 0, 45.562, -73.562, 'jour', 'https://picsum.photos/640/480', 3, 3, 4, NOW(), NOW()),
('Atelier Créatif', 'Atelier peinture et dessin', '2025-09-25 14:00:00', '2025-09-25 17:00:00', 0, 0, 'Centre culturel', 0, 45.509, -73.567, 'jour', 'https://picsum.photos/640/480', 4, 4, 5, NOW(), NOW()),
('Spectacle Théâtre', 'Pièce de théâtre pour tous', '2025-09-28 19:00:00', '2025-09-28 21:00:00', 0, 0, 'Théâtre du vieux port', 0, 45.508, -73.560, 'nuit', 'https://picsum.photos/640/480', 5, 1, 7, NOW(), NOW());

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
