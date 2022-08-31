CREATE TABLE User(
    Email VARCHAR(40) PRIMARY KEY, 
    FirstName VARCHAR(20), 
    LastName VARCHAR(20), 
    HashedPassword VARCHAR(40)
);

CREATE TABLE QuestionPost(
    PostID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(20),
    PostTitle TEXT, 
    PostContent TEXT,
    isSolved BOOLEAN NOT NULL,
    PRIMARY KEY(PostNumber)
);

CREATE TABLE AnswerPost(
    AnswerID INT NOT NULL AUTO_INCREMENT, 
    ParentPostID INT NOT NULL, 
    Username VARCHAR(20),
    AnswerContent TEXT, 
    isEdited BOOLEAN NOT NULL,
    PRIMARY KEY(PostNumber, ParentPostNumber)
);

/*Basic 3 tables. User, posts and answers
User stores Email, First name, Last name , hashed password
QuestionsPost stores Post number, username, post title, post content, solved state
AnswersPost stores Answer number, parent post number, username, answer content, edited state
