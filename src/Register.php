<?php
namespace App;

require_once "db.php";

class Register {
    public static function makeCall() {
        DB::init();
        $json = DB::$json;

        $json = $json[DB::$payloadLabel];

        // Getting required fields from the request
        $firstName = $json['FirstName'];
        $lastName = $json['LastName'];
        $email = $json['Email'];
        $hashedPassword = $json['HashedPassword'];
        $userDescription = $json['UserDescription'];

        // Enter the user's information
        $sql = "INSERT INTO User(FirstName, LastName, UserDescription, Email, HashedPassword) VALUES (?, ?, ?, ?, ?)";
        $query = DB::$db->prepare($sql);
        $query->bind_param("sssss", $firstName, $lastName, $userDescription, $email, $hashedPassword);
        $query->execute();

        $sql = "SELECT * FROM User WHERE (Email = ?)";
        $query = DB::$db->prepare($sql);
        $query->bind_param("s", $email);
        $query->execute();

        $userObject = $query->get_result()->fetch_assoc();

        $query->close();
        DB::$db->close();
        return json_encode($userObject);
    }
}

echo Register::makeCall();