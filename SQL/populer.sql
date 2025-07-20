USE backend;

-- Populate saison
INSERT INTO saison (statut) VALUES 
('été'), 
('hiver'), 
('automne'), 
('printemps');

-- Populate utilisateur
INSERT INTO utilisateur (name, email, email_verified_at, password, remember_token, created_at, updated_at) VALUES
('Alice Dupont', 'alice@example.com', NOW(), 'hashed_password1', NULL, NOW(), NOW()),
('Bob Martin', 'bob@example.com', NOW(), 'hashed_password2', NULL, NOW(), NOW()),
('Claire Moreau', 'claire@example.com', NULL, 'hashed_password3', NULL, NOW(), NOW());

-- Populate type
INSERT INTO type (nom) VALUES
('Sport'), 
('Musique'),
('Art'),
('Nature'),
('Culture');

-- Populate activite
INSERT INTO activite (titre, description, date, lieu, nombre_likes, statut_journee, image_data, utilisateur_id, saison_id, created_at, updated_at) VALUES
('Randonnée en montagne', 'Une belle randonnée pour découvrir la nature.', '2025-07-10 09:00:00', 'Alpes', 0, 'jour', NULL, 1, 1, NOW(), NOW()),
('Concert de jazz', 'Soirée jazz avec des musiciens locaux.', '2025-07-15 20:00:00', 'Paris', 0, 'nuit', NULL, 2, 2, NOW(), NOW()),
('Exposition d\'art moderne', 'Découvrez des œuvres contemporaines.', '2025-08-01 10:00:00', 'Lyon', 0, 'jour', NULL, 3, 3, NOW(), NOW());

-- Populate typeactivite
INSERT INTO typeactivite (activite_id, type_id) VALUES
(1, 4), -- randonnée = nature
(2, 2), -- concert = musique
(3, 3); -- exposition = art

-- Populate avis
INSERT INTO avis (date, utilisateur_id, activite_id, contenu) VALUES
(NOW(), 2, 1, 'Super randonnée, très bien organisée!'),
(NOW(), 1, 2, 'Le concert était incroyable!'),
(NOW(), 3, 3, 'Très belle exposition.');

-- Populate favori
INSERT INTO favori (utilisateur_id, activite_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 3);

-- Populate likes
INSERT INTO likes (utilisateur_id, activite_id, created_at, updated_at) VALUES
(1, 1, NOW(), NOW()),
(2, 1, NOW(), NOW()),
(1, 2, NOW(), NOW()),
(3, 3, NOW(), NOW());

-- Populate messagerie
INSERT INTO messagerie (expediteur_id, destinataire_id, contenu, date) VALUES
(1, 2, 'Salut Bob, tu viens au concert?', NOW()),
(2, 1, 'Oui, à samedi!', NOW()),
(3, 1, 'Alice, as-tu vu l\'exposition?', NOW());
