-- USE the correct database
USE `backend`;

-- Populate saison
INSERT INTO `saison` (`statut`) VALUES 
('été'), 
('hiver'), 
('automne'), 
('printemps');

-- Populate utilisateur
INSERT INTO `utilisateur` (`name`, `email`, `password`, `type_utilisateur`, `created_at`, `updated_at`) VALUES
('Alice Dupont', 'alice@example.com', 'password123', 'organisateur', NOW(), NOW()),
('Bob Martin', 'bob@example.com', 'password123', 'particulier', NOW(), NOW()),
('Claire Durand', 'claire@example.com', 'password123', 'organisateur', NOW(), NOW());

-- Populate activite
INSERT INTO `activite` (`titre`, `description`, `date`, `lieu`, `statut_journee`, `utilisateur_id`, `saison_id`, `created_at`, `updated_at`) VALUES
('Randonnée au Mont Blanc', 'Une belle randonnée en montagne.', '2025-08-01 09:00:00', 'Chamonix', 'jour', 1, 1, NOW(), NOW()),
('Soirée astronomie', 'Observation des étoiles dans un observatoire.', '2025-12-10 20:00:00', 'Grenoble', 'nuit', 2, 2, NOW(), NOW()),
('Atelier de peinture', 'Atelier créatif pour tous.', '2025-10-05 14:00:00', 'Lyon', 'jour', 3, 3, NOW(), NOW());

-- Populate avis
INSERT INTO `avis` (`date`, `utilisateur_id`, `activite_id`, `contenu`, `etoiles`) VALUES
(NOW(), 2, 1, 'Super expérience !', 5),
(NOW(), 3, 2, 'Très intéressant et bien organisé.', 4),
(NOW(), 1, 3, 'Très relaxant.', 5);

-- Populate favori
INSERT INTO `favori` (`utilisateur_id`, `activite_id`) VALUES
(2, 1),
(3, 2),
(1, 3);

-- Populate followers
INSERT INTO `followers` (`follower_id`, `followed_id`, `created_at`, `updated_at`) VALUES
(2, 1, NOW(), NOW()),
(3, 1, NOW(), NOW()),
(1, 2, NOW(), NOW());

-- Populate likes
INSERT INTO `likes` (`utilisateur_id`, `activite_id`, `created_at`, `updated_at`) VALUES
(2, 1, NOW(), NOW()),
(3, 2, NOW(), NOW()),
(1, 3, NOW(), NOW());

-- Populate messagerie
INSERT INTO `messagerie` (`expediteur_id`, `destinataire_id`, `contenu`, `date`) VALUES
(2, 1, 'Bonjour Alice, j’aime vos activités !', NOW()),
(1, 2, 'Merci Bob, à bientôt !', NOW()),
(3, 1, 'Salut Alice, on collabore ?', NOW());

-- Populate type
INSERT INTO `type` (`nom`, `created_at`, `updated_at`) VALUES
('Sport', NOW(), NOW()),
('Culture', NOW(), NOW()),
('Détente', NOW(), NOW());

-- Populate typeactivite
INSERT INTO `typeactivite` (`activite_id`, `type_id`) VALUES
(1, 1), -- Randonnée = Sport
(2, 2), -- Astronomie = Culture
(3, 3); -- Peinture = Détente


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
