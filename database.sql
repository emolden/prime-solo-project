
--------DROP any tables that exist-------------------


DROP TABLE IF EXISTS "user_positions";
DROP TABLE IF EXISTS "ult_team";
DROP TABLE IF EXISTS "user_league_type";
DROP TABLE IF EXISTS "teams";
DROP TABLE IF EXISTS "leagues";
DROP TABLE IF EXISTS "positions";
DROP TABLE IF EXISTS "registration_type";
DROP TABLE IF EXISTS "user";


-------CREATE Tables-------------------------------


CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255),
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"is_admin" boolean NOT NULL DEFAULT false,
	"email" varchar(255),
	"phone_number" varchar(255),
	"birthdate" date,
	"is_pitcher" boolean DEFAULT false,
	"hitting_skill" bigint,
	"fielding_skill" bigint,
	"liability_acknowledgment" varchar(255),
	"image" varchar(255),
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "leagues" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"day" varchar(255),
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "registration_type" (
	"id" serial NOT NULL UNIQUE,
	"type" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_league_type" (
	"id" serial NOT NULL UNIQUE,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"league_id" INTEGER REFERENCES "leagues" ON DELETE CASCADE,
	"type_id" INTEGER REFERENCES "registration_type" ON DELETE CASCADE,
	"is_captain" boolean NOT NULL,
	"small_group_input" varchar(255),
	"team_name_input" varchar(255),
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"league_id" bigint NOT NULL REFERENCES "leagues" ON DELETE CASCADE,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ult_team" (
	"id" serial NOT NULL UNIQUE,
	"user_league_type_id" bigint NOT NULL REFERENCES "user_league_type" ON DELETE CASCADE,
	"team_id" bigint NOT NULL REFERENCES "teams" ON DELETE CASCADE,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "positions" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_positions" (
	"id" serial NOT NULL UNIQUE,
	"user_id" bigint NOT NULL REFERENCES "user" ON DELETE CASCADE,
	"position_id" bigint REFERENCES "positions" ON DELETE CASCADE,
	PRIMARY KEY ("id")
);


---------INSERT data into tables-------------------------------


INSERT INTO "user"
	("name", "username", "password", "is_admin", "email", "phone_number", "birthdate","is_pitcher", "hitting_skill", "fielding_skill", "liability_acknowledgment")
	VALUES
	('Alice Walker', 'awalker92', '$2a$10$qnJy4Cj5qPzM21eEtL1KV.xe0P2yGi6z8DLjoAyESAyBT/NcDBHeO', 'true', 'alice.walker@example.com', '415-555-6789', '1990-06-15', 'true', '2', '1', 'Alice Walker'),
	('Brian Lee', 'blee', '$2a$10$CcJi4mE3TGhQhTV4J9XB.eEVuEw13OGNe9f.DRvJJIAL1zDfwwoCO', 'false', 'brian.lee@example.com', '303-555-7890', '1985-11-23', 'false', '4', '3', 'Brian Lee'),
	('Catherine Brown', 'cbrown', '$2a$10$00wwBH58LzJyBqryCTOleuCdUiA8s4Y02zPHfYqkLb3i/kuAdj8Ra', 'true', 'catherine.brown@example.com', '212-555-4321', '1998-09-09', 'false', '1', '4', 'Catherine Brown'),
	('Daniel Kim', 'dkim48', '$2a$10$TBcO.Dqve7nLTev1lE1YQOsO4nds9nQL02rq8v1WE8td6YcIpCmVG', 'false', 'daniel.kim@example.com', '626-555-2468', '1988-07-22', 'false', '3', '2', 'Daniel Kim'),
	('Ella Martinez', 'emartinez92', '$2a$10$jIew3ac0GUQMYjx2ksqgDeUi4Yca1oFIJgeHOdvDaycuG5xcDVBpe', 'true', 'ella.martinez@example.com', '512-555-1357', '1992-12-30', 'false', '1', '1', 'Ella Martinez'),
	('Franklin Moore', 'fmoore67', '$2a$10$D01d39kTLDaOIV4eqw6dqu1sGQkTOdOXLA4IkcornfJmarde3KuDK', 'true', 'franklin.moore@example.com', '303-555-9876', '1979-04-05', 'true', '4', '2', 'Franklin Moore'),
	('Grace Wilson', 'gwilson99', '$2a$10$8wraPsT7vCpSXDayrpa7BOZVGFlEbD.d.Kh6avQpNXBtRSnjPI7sK', 'false', 'grace.wilson@example.com', '718-555-7654', '1995-03-21', 'false', '2', '3', 'Grace Wilson'),
	('Henry Adams', 'hadams53', '$2a$10$rwHqsq8Cb6QGML5pJ/l7t.mZCNG7WsR18.GehKTZnhiIvBv6yhQMi', 'true', 'henry.adams@example.com', '202-555-6789', '1983-10-11', 'true', '4', '1', 'Henry Adams'),
	('Isabella Scott', 'iscott11', '$2a$10$ZUnLqX9dECkjurItOYTCDewOeaBnZMaLYVcCIh8/MGuCGn8ZQjdTW', 'true', 'isabella.scott@example.com', '919-555-4321', '1996-08-14', 'false', '2', '4', 'Isabella Scott'),
	('James Taylor', 'jtaylor79', '$2a$10$wt.sW6jhhvMaY58y0icEXOCx9fYZZXfHbwxBTS4eLgG/dthY.gRve', 'false', 'james.taylor@example.com', '404-555-1234', '1981-05-30', 'true', '3', '2', 'James Taylor');
	
INSERT INTO "user"
	("name", "username", "password", "is_admin", "email", "phone_number", "birthdate","is_pitcher", "liability_acknowledgment")
	VALUES
	('Sophia Turner', 'sturner87', '$2a$10$kbUwYOMOVM3oMQ8SjwtL4uQAMSGVEKqOmtcJ7/VXHweEcfjiOcqx.', 'true', 'sophia.turner@example.com', '718-555-1122', '1991-02-20', 'true', 'Sophia Turner'),
	('Michael Johnson', 'mjohnson45', '$2a$10$qr9doRm.CCViB0eASoKtOucCF2PvA5jhpT6WQexyIouhkHdYq8o0i', 'false', 'michael.johnson@example.com', '312-555-9988', '1987-07-17', 'false', 'Michael Johnson'),
	('Olivia Martinez', 'omartinez99', '$2a$10$Dci.bhR.n8Lq3AOHd/q6me.00W..AkuGXma7nBnUIhZGrgYFh/pcq', 'true', 'olivia.martinez@example.com', '415-555-6789', '1994-11-08', 'true', 'Olivia Martinez'),
	('Ethan Clark', 'eclark56', '$2a$10$QldoNQoZdigV5bwxaJCgFe6qXdurCC1tPYDGYtfskMBVbVZKeKOfO', 'false', 'ethan.clark@example.com', '623-555-4578', '1989-01-25', 'true', 'Ethan Clark'),
	('Mia Davis', 'mdavis22', '$2a$10$xZVWqTkM4aSOAUlqtCA4E.49aJW/ZqPChhCBsljjy6NaoD17Vi1je', 'true', 'mia.davis@example.com', '832-555-3245', '1992-10-14', 'false', 'Mia Davis'),
	('Joshua Lee', 'jlee31', '$2a$10$gSslZKPUOuDvHrb/6xZBqud3lzaCMLZLCwFNJ.lwLcAvPvbSPuR46', 'true', 'joshua.lee@example.com', '202-555-3344', '1984-06-19', 'true', 'Joshua Lee'),
	('Charlotte Smith', 'csmith78', '$2a$10$ZqoxnYp.OeCWAP4Y0WrMc.1JF9k0c531byLYUTtKd141JvV/oD1C.', 'false', 'charlotte.smith@example.com', '630-555-7878', '1993-09-09', 'false', 'Charlotte Smith'),
	('Ryan Thompson', 'rthompson34', '$2a$10$XjnqJ3UimG5iyE3z6VSJ9u2x8hhgn.BkBlUlOGb2X6YGladHotC0O', 'true', 'ryan.thompson@example.com', '214-555-5678', '1986-04-12', 'true', 'Ryan Thompson'),
	('Emma Wilson', 'ewilson90', '$2a$10$aX4EcnfmCGzpupvdRHz6sOJRu/owFxDAleQFMNBQrYJ6KLeNkRy16', 'false', 'emma.wilson@example.com', '646-555-1234', '1995-05-28', 'true', 'Emma Wilson'),
	('Noah Green', 'ngreen61', '$2a$10$kKSxQ58JXcnzh724dY.dwOihUTa4Nm/tQtlIKjkccGP/tiRfU5Ia.', 'true', 'noah.green@example.com', '303-555-6789', '1988-12-12', 'false', 'Noah Green');

INSERT INTO "user"
	("username", "password")
	VALUES
	('ella', '$2a$10$CKsTSuqHQ/9RBzeyFkiABOWn1Rb/.Y1buvZ1fA77gM/f6UpHhmPZe');
	

INSERT INTO "leagues"
	("name", "day")
	VALUES
	('Silver', 'Tuesday'),
	('Bronze', 'Thursday');

INSERT INTO "registration_type"
	("type")
	VALUES
	('Individual'), 
	('Small Group'),
	('Team'); 
	
INSERT INTO "teams"
	("name", "league_id")
	VALUES
	('Storm Hawks', 1),
	('Queen Bees', 2);

INSERT INTO "positions"
	("name")
	VALUES
	('infield'), 
	('outfield'),
	('infield or outfield');

INSERT INTO "user_league_type"
	("user_id", "league_id", "type_id", "is_captain", "small_group_input", "team_name_input")
	VALUES
	(1, 2, 2, 'false', 'Brian, Cat, Dan, Ella', ''),
	(2, 2, 2, 'false', 'Alice, Cat, Dan, Ella', ''),
	(3, 2, 2, 'false', 'Alice, Brian, Dan, Ella', ''),
	(4, 2, 2, 'true', 'Alice, Brian, Cat, Ella', ''),
	(11, 1, 3, 'false', '', 'Storm Hawks'),
	(12, 1, 3, 'false', '', 'Storm Hawks'),
	(13, 1, 3, 'false', '', 'Storm Hawks'),
	(14, 1, 3, 'false', '', 'Storm Hawks'),
	(15, 1, 3, 'false', '', 'Storm Hawks'),
	(16, 1, 3, 'false', '', 'Storm Hawks'),
	(17, 1, 3, 'false', '', 'Storm Hawks'),
	(18, 1, 3, 'false', '', 'Storm Hawks'),
	(19, 1, 3, 'false', '', 'Storm Hawks'),
	(20, 1, 3, 'false', '', 'Storm Hawks');


INSERT INTO "ult_team"
	("user_league_type_id", "team_id")
	VALUES
	(5, 1),
	(6, 1),
	(7, 1),
	(8, 1),
	(9, 1),
	(10, 1),
	(11, 1),
	(12, 1),
	(13, 1),
	(14, 1),
	(2, 2),
	(3, 2),
	(4, 2),
	(1, 2);

INSERT INTO "user_positions"
	("user_id", "position_id")
	VALUES
	(1, 1),
	(2, 2),
	(3, 3),
	(4, 1);
