<?php
namespace App;

require_once "db.php";

class UpdateUser {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $userID = $json['UserID'];
        $hashedPassword = $json['HashedPassword'];
        $firstName = $json['FirstName'];
        $lastName = $json['LastName'];
        $userDescription = $json['UserDescription'];
        $userID = $json['UserID'];

        // Generating and executing the SQL
        $sql = "UPDATE User SET HashedPassword = ?, firstName = ?, lastName = ?, UserDescription = ?" . 
        " WHERE (UserID = ?)";

        $query = DB::$db->prepare($sql);
        $query->bind_param("sssss", $hashedPassword, $firstName, $lastName, $userDescription, $userID);
        $query->execute();

        $query->close();
        DB::$db->close();

    }
}

UpdateUser::makeCall();