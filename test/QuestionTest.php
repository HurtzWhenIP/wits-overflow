<?php

use PHPUnit\Framework\TestCase;

final class PostTest extends TestCase
{ 
    $user = new User();
    $user.insertUser("First Name", "Last Name", "User Description goes here", "Email", "B@$1C P4ssW0rd");

    $post = new Question();
    $post.createPost("1", "This is a post title", "This is the post content");
    public function testgetUserID()
    {
        this->assertSame("1", $post->getUserID());  
    }    
    public function testgetPostTitle(){
        this->assertSame("This is a post title", $post->getPostTitle());
    }
    public function testgetPostContent()
    {
        this->assertSame("This is the post content", $post->getPostContent());
    }
}