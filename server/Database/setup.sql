DROP TABLE IF EXISTS UserProject;
DROP TABLE IF EXISTS Tokens;
DROP TABLE IF EXISTS OrganizationTokens;
DROP TABLE IF EXISTS Volunteer;
DROP TABLE IF EXISTS Project;
DROP TABLE IF EXISTS Organization;

CREATE TABLE Organization (
    OrganizationID SERIAL PRIMARY KEY,
    Description VARCHAR(1000) NOT NULL,
    OrganizationName VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL
);

CREATE TABLE Volunteer ( 
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL,
    AboutMe TEXT
);

CREATE TABLE Tokens (
    UserID INTEGER NOT NULL,
    TokenID VARCHAR(255) PRIMARY KEY,
    Token CHAR(36) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Volunteer (UserID) 
);

CREATE TABLE Project (
    ProjectID SERIAL PRIMARY KEY,
    ActivityName VARCHAR(255) NOT NULL,
    ActivityType VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Day VARCHAR(255) NOT NULL,
    Date DATE NOT NULL,
    "Time" TIME NOT NULL,
    OrganizationID INTEGER NOT NULL,
    FOREIGN KEY (OrganizationID) REFERENCES Organization (OrganizationID)
);

CREATE TABLE OrganizationTokens (
    TokenID VARCHAR(255) PRIMARY KEY,
    OrganizationID INTEGER NOT NULL,
    Token CHAR(36) NOT NULL,
    FOREIGN KEY (OrganizationID) REFERENCES Organization (OrganizationID)
);

CREATE TABLE UserProject (
    UserID INTEGER NOT NULL,
    ProjectID INTEGER NOT NULL,
    PRIMARY KEY (UserID, ProjectID),
    FOREIGN KEY (UserID) REFERENCES Volunteer (UserID), 
    FOREIGN KEY (ProjectID) REFERENCES Project (ProjectID)
);

ALTER TABLE Organization
ALTER COLUMN Description TYPE VARCHAR(1000);

INSERT INTO Volunteer (Username, Password, Email, Role) VALUES
('JemimaPuddleduck', 'Beatr1x', 'JemPudz1945@hotmail.com', 'Volunteer'), 
('EdgarAllenPwned', 'N3v3rmor3', 'WeakandWeary@gmail.com', 'Volunteer'), 
('InigoMontoya', 'D3adFath3r', 'PreparetoDie@aol.com', 'Volunteer'); 

INSERT INTO Organization (Description, OrganizationName, Role) VALUES
('The Florin County Library is the center of community life for locals.
From book and other media loaning, to skills classes and group events,
we aim to bring the community closer together.', 'FlorinCountryLibrary', 'Manager'),
('The Florin Historical Society are responsible for maintenance, upkeep and
continued remembrance of the many important historical sites of our fair county.
From the battlefield of Zar"n"thadar, where the sleeping Chaos was awakened
and beaten back to sleep for the survival of all creation, to the 
grand lecturn of Nyarlathotep, we help keep an eye on the past, to help the future.', 
'Florin Historical Society', 'Manager');

INSERT INTO Project (ActivityName, ActivityType, Description, Day, Date, "Time", OrganizationID) VALUES
('Sunday Morning Reading Time.', 'Performance', 'Come and read a selection of
wholesome, captivating children books to local children ages 10 and under. Silly voices welcome!',
'Sunday', '2024-02-25', '12:50:00', 1),
('Saturday Morning Learning By Litter-picking.', 'Outdoors', 'Help to clean up one of our various natural
sites whilst learning about its splendid history from one of our tour guides.', 'Saturday', '2024-02-24', '09:00:00', 2);

INSERT INTO UserProject (UserID, ProjectID)
VALUES
    (1, 2),
    (2, 1);
