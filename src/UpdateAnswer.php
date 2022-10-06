<?php
namespace App;

require_once "db.php";

class UpdateAnswer {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $answerID = $json['AnswerID'];
        $answerContent = $json['AnswerContent'];
        $edited = $json['Edited'];

        // Generating and executing the SQL
        $sql = "UPDATE AnswerPost SET AnswerContent = ?, Edited = ? WHERE AnswerID = ?";
        $query = DB::$db->prepare($sql);
        $query->bind_param("sii", $answerContent, $edited, $answerID);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

UpdateAnswer::makeCall();