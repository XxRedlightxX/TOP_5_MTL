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
