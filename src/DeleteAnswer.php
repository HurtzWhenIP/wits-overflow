<?php
namespace App;

require_once "db.php";

class DeleteAnswer {
    public static function makeCall() {
        DB::init();
        
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $answerID = $json['AnswerID'];

        // Generating and executing the SQL
        $sql = "DELETE FROM AnswerPost WHERE AnswerID = ?";
        $query = DB::$db->prepare($sql);
        $query->bind_param("i", $answerID);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

echo AddAnswer::makeCall();