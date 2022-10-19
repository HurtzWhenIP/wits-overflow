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
    IsUnderReview BOOLEAN DEFAULT 0,
    IsHidden BOOLEAN DEFAULT 0,
    PRIMARY KEY(PostID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE AnswerPost (
    AnswerID INT NOT NULL AUTO_INCREMENT, 
    ParentPostID INT NOT NULL, 
    UserID INT NOT NULL,
    AnswerContent TEXT NOT NULL, 
    Edited BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (AnswerID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (ParentPostID) REFERENCES QuestionPost(PostID)
);

CREATE TABLE Comment (
    CommentID INT NOT NULL AUTO_INCREMENT,
    PostID INT NOT NULL,
    UserID INT NOT NULL,
    CommentContent TEXT NOT NULL,
    IsQuestion BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (CommentID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Vote (
    UserID INT NOT NULL,
    PostID INT NOT NULL,
    IsQuestion BOOLEAN NOT NULL,
    Vote BOOLEAN NOT NULL,
    PRIMARY KEY (UserID, PostID, IsQuestion),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Create a view to keep record of votes per question and answer

CREATE VIEW AnswerVoteTally as (
    SELECT PostID as AnswerID, 
    CAST(SUM(Vote = 1) as SIGNED) as UpVotes, 
    CAST(SUM(Vote = 0) as SIGNED) as DownVotes 
    FROM Vote 
    WHERE(IsQuestion = 0) 
    GROUP BY PostID
);

CREATE VIEW QuestionVoteTally as (
    SELECT PostID as QuestionID, 
    CAST(SUM(Vote = 1) as SIGNED) as UpVotes, 
    CAST(SUM(Vote = 0) as SIGNED) as DownVotes 
    FROM Vote 
    WHERE(IsQuestion = 1) 
    GROUP BY PostID
);

CREATE TABLE PostReports (
    ReportID INT NOT NULL AUTO_INCREMENT,
    PostID INT NOT NULL,
    IsQuestion BOOLEAN NOT NULL DEFAULT 0,
    Topic TEXT,
    Comments TEXT,
    PRIMARY KEY(ReportID)
);