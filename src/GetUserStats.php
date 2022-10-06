<?php
namespace App;

require_once "db.php";

class GetUserStats {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        $json = $json[DB::$payloadLabel];
        $userID = $json['UserID'];

        $userQuestionsAsked = "SELECT COUNT(*) as AskedCount " . 
                            "FROM QuestionPost " . 
                            "WHERE UserID = " . strval($userID);

        $userQuestionsAnswered = "SELECT COUNT(*) as AnsweredCount " . 
                            "FROM AnswerPost " . 
                            "WHERE UserID = " . strval($userID);

        $userAnswerVotes = "SELECT CAST(SUM(Vote = 1) as SIGNED) as UpVotes, " .
                        "CAST(SUM(Vote = 0) as SIGNED) as DownVotes " . 
                        "FROM Vote, AnswerPost WHERE " .
                        "Vote.IsQuestion = 0 AND " . 
                        "AnswerPost.AnswerID = Vote.PostID AND " . 
                        "AnswerPost.UserID = " . strval($userID);

        $userQuestionVotes = "SELECT CAST(SUM(Vote = 1) as SIGNED) as UpVotes, " .
                        "CAST(SUM(Vote = 0) as SIGNED) as DownVotes " . 
                        "FROM Vote, QuestionPost WHERE " .
                        "Vote.IsQuestion = 1 AND " . 
                        "QuestionPost.PostID = Vote.PostID AND " . 
                        "QuestionPost.UserID = " . strval($userID);

        // Generating and executing the SQL
        $sql = "SELECT QAsk.AskedCount, QAns.AnsweredCount, " . 
            "IFNULL((AV.UpVotes + QV.UpVotes), 0) as UpVotes, " . 
            "IFNULL((AV.DownVotes + QV.DownVotes), 0) as DownVotes, " .
            "IFNULL(CAST((QAsk.AskedCount + QAns.AnsweredCount + AV.UpVotes + QV.UpVotes " . 
            "+ AV.DownVotes + QV.DownVotes) / 4 as SIGNED), 0) as Score " .
            "FROM (" . $userQuestionsAsked . ") as QAsk, " . 
            "(" . $userQuestionsAnswered . ") as QAns, " . 
            "(" . $userAnswerVotes .") as AV, " . 
            "(" . $userQuestionVotes . ") as QV";

        $query = DB::$db->prepare($sql);
        $query->execute();

        // Formatting the output into a json array
        $stats = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $stats[] = $row;
            }
        }

        $query->close();
        DB::$db->close();
        return json_encode($stats);
    }
}

echo GetUserStats::makeCall();