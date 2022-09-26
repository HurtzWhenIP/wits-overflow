<?php

use PHPUnit\Framework\TestCase;

final class AnswerTest extends TestCase
{ 
    $user = new User();
    $user.insertUser("First Name", "Last Name", "User Description goes here", "Email", "B@$1C P4ssW0rd");

    $post = new Question();
    $post.createPost("1", "This is a post title", "This is the post content");

    $answer = new Answer();
    $answer.createPost("1", "1", "This is an answer to parent post");
    public function testgetUserID()
    {
        this->assertSame("1", $answer->getUserID());  
    }    
    public function testgetparentPostID(){
        this->assertSame("1", $answer->getparentPostID());
    }
    public function testgetanswerContent()
    {
        this->assertSame("This is an answer to parent post", $answer->getanswerContent());
    }
}