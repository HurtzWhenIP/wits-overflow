<?php
namespace App;

require_once "db.php";

class MakeReport {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $postID = $json['PostID'];
        $isQuestion = $json['IsQuestion'];
        $reportTopic = $json['ReportTopic'];
        $reportComments = $json['ReportComments'];

        // Generating and executing the SQL
        $sql = "INSERT INTO Reports(PostID, IsQuestion, Topic, Comments, DateCreated) VALUES (?, ?, ?, ?, NOW())";

        $query = DB::$db->prepare($sql);
        $query->bind_param("iiss", $postID, $isQuestion, $reportTopic, $reportComments);
        $query->execute();

        $query->close();
        DB::$db->close();
    }
}

MakeReport::makeCall();