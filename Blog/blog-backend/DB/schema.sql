CREATE TABLE IF NOT EXISTS Users (
    Userid CHAR(36) PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    UserPassword VARCHAR(50) NOT NULL,
    Joined DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Blogs (
    Blogid CHAR(36) NOT NULL,
    Userid CHAR(36) NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Content TEXT DEFAULT "",
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Userid) REFERENCES Users(Userid),
    PRIMARY KEY (Blogid, Userid)
);

CREATE TABLE IF NOT EXISTS Comments (
    Commentid CHAR(36) NOT NULL,
    Blogid CHAR(36) NOT NULL,
    Userid CHAR(36) NOT NULL,
    Content TEXT NOT NULL,
    Commented DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Userid) REFERENCES Users(Userid),
    FOREIGN KEY (Blogid) REFERENCES Blogs(Blogid),
    PRIMARY KEY (Commentid, Blogid, Userid)
);

CREATE TABLE IF NOT EXISTS Reactions (
    Reactionid CHAR(36) NOT NULL,
    Blogid CHAR(36) NOT NULL,
    Userid CHAR(36) NOT NULL,
    Reaction BOOLEAN NOT NULL,
    Reacted DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Userid) REFERENCES Users(Userid),
    FOREIGN KEY (Blogid) REFERENCES Blogs(Blogid),
    PRIMARY KEY (Reactionid, Blogid, Userid)
);