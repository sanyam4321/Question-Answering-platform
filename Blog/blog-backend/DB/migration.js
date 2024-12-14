const db = require("./mysqlConfig");

async function migratedb(){
    try{
        // const response1 = await db.query('CREATE TABLE IF NOT EXISTS Users ( Userid CHAR(36) PRIMARY KEY, UserName VARCHAR(50) NOT NULL, Email VARCHAR(50) NOT NULL, UserPassword VARCHAR(50) NOT NULL, Joined DATETIME DEFAULT CURRENT_TIMESTAMP )');
        // const response2 = await db.query('CREATE TABLE IF NOT EXISTS Blogs ( Blogid CHAR(36) NOT NULL, Userid CHAR(36) NOT NULL, Title VARCHAR(100) NOT NULL, Content TEXT, Created DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (Userid) REFERENCES Users(Userid) ON DELETE CASCADE, PRIMARY KEY (Blogid, Userid) )');
        // const response3 = await db.query('CREATE TABLE IF NOT EXISTS Comments ( Commentid CHAR(36) NOT NULL, Blogid CHAR(36) NOT NULL, Userid CHAR(36) NOT NULL, Content TEXT NOT NULL, Commented DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (Userid) REFERENCES Users(Userid) ON DELETE CASCADE, FOREIGN KEY (Blogid) REFERENCES Blogs(Blogid) ON DELETE CASCADE, PRIMARY KEY (Commentid, Blogid, Userid) )');
        // const response4 = await db.query('CREATE TABLE IF NOT EXISTS Reactions ( Reactionid CHAR(36) NOT NULL, Blogid CHAR(36) NOT NULL, Userid CHAR(36) NOT NULL, Reaction BOOLEAN NOT NULL, Reacted DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (Userid) REFERENCES Users(Userid) ON DELETE CASCADE, FOREIGN KEY (Blogid) REFERENCES Blogs(Blogid) ON DELETE CASCADE, PRIMARY KEY (Reactionid, Blogid, Userid) )');
        // console.log(response1, response2, response3, response4);
        // const response1 = await db.query('ALTER TABLE Users MODIFY COLUMN UserPassword VARCHAR(100) NOT NULL')
        // const response1 = await db.query('ALTER TABLE Users DROP COLUMN UserName');
        // const response2 = await db.query('ALTER TABLE Users ADD COLUMN UserName VARCHAR(100) NOT NULL')
        // const response2 = await db.query('ALTER TABLE Users MODIFY COLUMN Email VARCHAR(50) NOT NULL UNIQUE')
        console.log(response1, response2)
    } catch(error){
        console.log(error);
    }
}
migratedb();