<?php
namespace App;

require_once "db.php";


class GetAllAnswers {
    public static function makeCall() {
        DB::init();
        
        // Generating and executing the SQL
        $sql = "SELECT AnswerPost.*, IFNULL(vt.UpVotes, 0) as UpVotes, " . 
                "IFNULL(vt.DownVotes, 0) as DownVotes " . 
                "FROM AnswerPost " . 
                "LEFT JOIN AnswerVoteTally as vt " . 
                "ON AnswerPost.AnswerID = vt.AnswerID ";

        $query = DB::$db->prepare($sql);
        $query->execute();

        // Formatting the output into a json array
        $answers = array();

        if ($result = $query->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $answers[] = $row;
            }
        }

        $query->close();
        DB::$db->close();

        return json_encode($answers);
    }
}

echo GetAllAnswers::makeCall();
