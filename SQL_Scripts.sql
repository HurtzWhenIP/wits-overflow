CREATE TABLE User (
    UserID INT NOT NULL AUTO_INCREMENT,
    UserDescription VARCHAR(150),
    FirstName VARCHAR(20) NOT NULL, 
    LastName VARCHAR(20) NOT NULL, 
    Email VARCHAR(40) NOT NULL,
    HashedPassword VARCHAR(256) NOT NULL,
    PRIMARY KEY(UserID)
);

CREATE TABLE QuestionPost (
    PostID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    PostTitle TEXT NOT NULL, 
    PostContent TEXT NOT NULL,
    Solved BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(PostID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE AnswerPost (
    AnswerID INT NOT NULL AUTO_INCREMENT, 
    ParentPostID INT NOT NULL, 
    UserID INT NOT NULL,
    AnswerContent TEXT NOT NULL, 
    Edited BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(AnswerID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (ParentPostID) REFERENCES QuestionPost(PostID)
);

/*Basic 3 tables. User, posts and answers
User stores Email, First name, Last name , hashed password
QuestionsPost stores Post number, username, post title, post content, solved state
AnswersPost stores Answer number, parent post number, username, answer content, edited state
