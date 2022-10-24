<?php
use \PhpUnit\Framework\TestCase;
use App\GetAchievements;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\GetAchievements
*/
class GetAchievementsTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->UserID = 4;

        $request->data = $bodyContent;
        $json = json_encode($request);
        
        $_SERVER["REQUEST_METHOD"] = "POST";
        $fileWriter = fopen(INPUT_TEST_FILE, "w");

        fwrite($fileWriter, $json);
        fclose($fileWriter);
    }   

    /**
    * @test
    */
    public function testValidCall() 
    {
        self::generateInput();
        $this->expectOutputRegex('/\"AnswerAskedAchievement\":1/');
        $this->expectOutputRegex('/\"QuestionAskedAchievement\":0/');
        $this->expectOutputRegex('/\"AnswerUpVoteAchievement\":0/');
        $this->expectOutputRegex('/\"QuestionUpVoteAchievement\":0/');
        GetAchievements::makeCall();
    }
}
