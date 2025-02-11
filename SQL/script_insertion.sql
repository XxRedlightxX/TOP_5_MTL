-- Utiliser la base de données
USE eventdb;

-- Insérer des utilisateurs
INSERT INTO utilisateur (nom, email, motdePasse, Avatar) 
VALUES 
('Jean Dupont', 'jean.dupont@email.com', 'password123', NULL),
('Marie Curie', 'marie.curie@email.com', 'securepass', NULL),
('Albert Einstein', 'albert.einstein@email.com', 'relativity', NULL);

-- Insérer des rôles
INSERT INTO rôle (id, nom_rôle) 
VALUES 
(1, 'Admin'),
(2, 'Utilisateur'),
(3, 'Organisateur');

-- Associer des rôles aux utilisateurs
INSERT INTO rôle_utilisateur (utilisateur_code, role_id) 
VALUES 
(1, 1),  -- Jean Dupont - Admin
(2, 2),  -- Marie Curie - Utilisateur
(3, 3);  -- Albert Einstein - Organisateur

-- Insérer des saisons
INSERT INTO saison (id, saison_nom) 
VALUES 
(1, 'été'),
(2, 'hiver'),
(3, 'printemps'),
(4, 'autone');

-- Insérer des types d'activités
INSERT INTO typee (nom) 
VALUES 
('Sport'),
('Culture'),
('Loisir'),
('Événement social');

-- Insérer des activités
INSERT INTO activité (id, titre, date_activité, lieu, image, likes, saison_id, utilisateur_id) 
VALUES 
(1, 'Tournoi de football', '2024-07-15 14:00:00', 'Stade Municipal', NULL, 50, 1, 1),
(2, 'Concert de jazz', '2024-12-10 19:00:00', 'Salle des Fêtes', NULL, 30, 2, 2),
(3, 'Randonnée en montagne', '2024-04-20 09:00:00', 'Mont Tremblant', NULL, 20, 3, 3);

-- Associer des types d'activités aux activités
INSERT INTO type_activité (activité_id, type_id) 
VALUES 
(1, 1), -- Tournoi de football -> Sport
(2, 2), -- Concert de jazz -> Culture
(3, 3); -- Randonnée en montagne -> Loisir

-- Insérer des messages dans la messagerie
INSERT INTO messagerie (id, expéditeur_id, destinataire_id, contenu, datecontenu) 
VALUES 
(1, 1, 2, 'Salut Marie, tu viens au tournoi ?', NOW()),
(2, 2, 1, 'Oui bien sûr, à quelle heure ?', NOW()),
(3, 3, 1, 'Super événement de prévu, bravo !', NOW());
