<?php

namespace App;

require_once "db.php";

class ValidateUser {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        // Reading in the request
        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $requestedEmail = $json['Email'];

        // Generating and executing the SQL
        $sql = "SELECT UserID FROM User WHERE (Email = ?)";
        $query = DB::$db->prepare($sql);
        $query->bind_param("s", $requestedEmail);
        $query->execute();

        // Formatting the output into a json array
        $loginDetails = array();

        if ($row = $query->get_result()->fetch_assoc()) {
            $loginDetails[] = $row;
        }

        $query->close();
        DB::$db->close();

        return json_encode($loginDetails);
    }
}

echo ValidateUser::makeCall();