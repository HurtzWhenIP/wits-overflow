<?php

namespace App;

require_once "db.php";

class GetAllQuestions {
    public static function makeCall() {
        DB::init();

        $sql = "SELECT User.FirstName, User.LastName, QuestionPost.*, " . 
                "IFNULL(vt.UpVotes, 0) as UpVotes, " . 
                "IFNULL(vt.DownVotes, 0) as DownVotes " . 
                "FROM User, QuestionPost " . 
                "LEFT JOIN QuestionVoteTally as vt " . 
                "ON QuestionPost.PostID = vt.QuestionID " . 
                "WHERE User.UserID = QuestionPost.UserID";

        $query = DB::$db->prepare($sql);
        $query->execute();

        // Formatting the output into a json array
        $questions = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $questions[] = $row;
            }
        }

        $query->close();
        DB::$db->close();

        return json_encode($questions);
    }
}

echo GetAllQuestions::makeCall();