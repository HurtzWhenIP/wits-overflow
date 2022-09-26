<?php

use PHPUnit\Framework\TestCase;

final class UserTest extends TestCase
{ 
    $user = new User();
    $user.insertUser("First Name", "Last Name", "User Description goes here", "Email", "B@$1C P4ssW0rd");

    public function testget_name()
    {
        this->assertSame("First Name", $user->get_name());  
    }    
    public function testget_lastName(){
        this->assertSame("Last Name", $user->get_lastName());
    }
    public function testget_userDescription()
    {
        this->assertSame("User Description goes here", $user->get_userDescription());
    }
    public function testget_email()
    {
        this->assertSame("Email", $user->get_email());
    }
}