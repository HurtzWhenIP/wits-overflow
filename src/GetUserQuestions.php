<?php

namespace App;

require_once "db.php";

class GetUserQuestions {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        $json = $json[DB::$payloadLabel];
        $userID = $json['UserID'];

        // Generating and executing the SQL
        $sql = "SELECT QuestionPost.*, IFNULL(vt.UpVotes, 0) as UpVotes, " . 
                "IFNULL(vt.DownVotes, 0) as DownVotes " . 
                "FROM QuestionPost " . 
                "LEFT JOIN QuestionVoteTally as vt " . 
                "ON QuestionPost.PostID = vt.QuestionID " . 
                "WHERE QuestionPost.UserID = ?";

        $query = DB::$db->prepare($sql);
        $query->bind_param("s", $userID);
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

echo GetUserQuestions::makeCall();