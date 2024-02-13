DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Organisation;
DROP TABLE IF EXISTS Project;
DROP TABLE IF EXISTS UserProject;
DROP TABLE IF EXISTS Tokens;
DROP TABLE IF EXISTS OrganisationTokens;

CREATE TABLE User (
    UserID INT GENERATED ALWAYS AS IDENTITY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL,
    PRIMARY KEY (UserID),
    FOREIGN KEY (UserID) REFERENCES UserID("UserID")
);

CREATE TABLE Organisation (
    OrganisationId INT GENERATED ALWAYS AS IDENTITY,
    Description VARCHAR(255) NOT NULL,
    OrganisationName VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL,
    PRIMARY KEY (OrganisationId),
    FOREIGN KEY (OrganisationId) REFERENCES Organisation("OrganisationID")
);

CREATE TABLE Project (
    ProjectId INT GENERATED ALWAYS AS IDENTITY,
    ActivityName VARCHAR(255) NOT NULL,
    ActivityType VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Day VARCHAR(255) NOT NULL,
    Date DATE NOT NULL,
    Organisation VARCHAR(255) NOT NULL,
    PRIMARY KEY (ProjectID),
    FOREIGN KEY (ProjectID) REFERENCES UserProject("ProjectID")
);

CREATE TABLE UserProject (
    UserID INT GENERATED ALWAYS AS IDENTITY,
    ProjectID INT GENERATED ALWAYS AS IDENTITY
)

CREATE TABLE Tokens (
    UserID INT NOT NULL,
    TokenID INT GENERATED ALWAYS AS IDENTITY,
    Token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (TokenID),
    FOREIGN KEY (TokenID) REFERENCES User("UserID")
);

CREATE TABLE OrganisationTokens (
    TokenID INT GENERATED ALWAYS AS IDENTITY
    OrganisationID
    Token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (TokenID),
    FOREIGN KEY (TokenID) REFERENCES User("UserID")
);

INSERT INTO User (Username, Password, Email, Role) VALUES
('JemimaPuddleduck', 'Beatr1x' 'JemPudz1945@hotmail.com', 'User'),
('EdgarAllenPwned', 'N3v3rmor3' 'WeakandWeary@gmail.com', 'User'),
('InigoMontoya', 'D3adFath3r', 'PreparetoDie@aol.com', 'User');

INSERT INTO Organisation (Description, OrganizationName, Role) VALUES
("The Florin County Library is the center of community life for locals.
From book and other media loaning, to skills classes and group events,
we aim to bring the community closer together.', 'FlorinCountryLibrary', 'Manager'),
('the Florin Historical Society are responsible for maintenance, upkeep and
continued remembrance of the many important historical sites of our fair county.
From the battlefield of Zar'n'thadar, where the sleeping Chaos was awakened
and beaten back to sleep for the survival of all creation , to the 
grand lecturn of Nyarlathotep, we help keep an eye on the past, to help the future.", 
'Florin Historical Society', 'Manager')

INSERT INTO Project (ActivityName, ActivityType, Description, Day, Date) VALUES
('Sunday Morning Reading Time.', 'Performance', 'Come and read a selection of
wholesome, captivating childrens books to local childen ages 10 and under. Silly voices welcome!',
'Sunday', 2024-02-25),
('Saturday Morning Learning By Litter-picking.', 'Outdoors', 'Help to clean up one of our various natural
sites whilst learning about its splendid history from one of our tour guides.', 'Saturday', 2024-02-24);





