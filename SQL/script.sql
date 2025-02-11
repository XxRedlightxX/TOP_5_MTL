CREATE DATABASE eventdb;
USE eventdb;

CREATE TABLE utilisateur (
	id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    motdePasse VARCHAR(255) NOT NULL,
    Avatar  BLOB
);

CREATE TABLE rôle (
	id int PRIMARY KEY,
    nom_rôle VARCHAR(255)
);

CREATE TABLE rôle_utilisateur (
	utilisateur_code int(255),
    role_id int(255),
    PRIMARY KEY (utilisateur_code,role_id),
    CONSTRAINT FK_UtilisateurCode FOREIGN KEY (utilisateur_code) REFERENCES utilisateur(id),
	CONSTRAINT FK_Utilisateur FOREIGN KEY (role_id) REFERENCES rôle(id)
);

CREATE TABLE messagerie (
	id int(255),
    expéditeur_id int(255),
    destinataire_id int(255),
    contenu LONGTEXT NULL,
    datecontenu TIMESTAMP,
    FOREIGN KEY (expéditeur_id) REFERENCES utilisateur(id),
    FOREIGN KEY (destinataire_id) REFERENCES utilisateur(id)
);

CREATE TABLE saison (
	id int(255) PRIMARY KEY,
    saison_nom ENUM('été', 'hiver', 'printemps', 'autone') NOT NULL
);

CREATE TABLE typee (
	id int PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255)
);


CREATE TABLE activité (
	id int(4) NOT NULL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    date_activité  TIMESTAMP,
    lieu VARCHAR(255),
    image BLOB,
    likes int(4) null,
    saison_id INT(255),
    utilisateur_id INT(255),
	CONSTRAINT FK_SaisonActivité FOREIGN KEY (saison_id) REFERENCES saison(id),
	CONSTRAINT FK_User FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);


CREATE TABLE type_activité (
	activité_id int(4),
    type_id int(4),
    PRIMARY KEY (activité_id, type_id),
    FOREIGN KEY (activité_id) REFERENCES activité(id),
     FOREIGN KEY (type_id) REFERENCES typee(id)
);
    




    
    

	
    
    