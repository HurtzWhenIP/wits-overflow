<?php
use \PhpUnit\Framework\TestCase;
use App\GetAllQuestions;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\GetAllQuestions
*/
class ValidateQuestionAuthorTest extends \PHPUnit\Framework\TestCase 
{
    /**
    * @test
    */
    public function testValidCall() 
    {
        $authorFirstname = "Kian";
        $authorLastname = "Reddy";

        $_SERVER["REQUEST_METHOD"] = "GET";

        $this->expectOutputRegex('/\"FirstName\":"' . $authorFirstname . '"/');
        $this->expectOutputRegex('/\"LastName\":"' . $authorLastname . '"/');
        GetAllQuestions::makeCall();
    }
}
