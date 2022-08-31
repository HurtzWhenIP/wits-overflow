CREATE TABLE User (
    UserID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(20), 
    LastName VARCHAR(20), 
    Username VARCHAR(20),
    Email VARCHAR(40),
    HashedPassword VARCHAR(40),
    PRIMARY KEY(UserID)
);

CREATE TABLE QuestionPost (
    PostID INT NOT NULL AUTO_INCREMENT,
    UserID INT,
    PostTitle TEXT, 
    PostContent TEXT,
    Solved BOOLEAN NOT NULL,
    PRIMARY KEY(PostID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE AnswerPost (
    AnswerID INT NOT NULL AUTO_INCREMENT, 
    ParentPostID INT NOT NULL, 
    UserID INT,
    AnswerContent TEXT, 
    Edited BOOLEAN NOT NULL,
    PRIMARY KEY(AnswerID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

/*Basic 3 tables. User, posts and answers
User stores Email, First name, Last name , hashed password
QuestionsPost stores Post number, username, post title, post content, solved state
AnswersPost stores Answer number, parent post number, username, answer content, edited state
