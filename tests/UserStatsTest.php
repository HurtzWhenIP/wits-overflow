<?php
use \PhpUnit\Framework\TestCase;
use App\GetUserStats;

require_once(__DIR__ . '/../vendor/autoload.php');

/**
    @covers \App\GetUserStats
*/
class UserStatsTest extends \PHPUnit\Framework\TestCase 
{
    private static function generateInput() 
    {
        $request = new stdClass();

        $bodyContent = new stdClass();
        $bodyContent->UserID = 14;

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
        $this->expectOutputRegex('/\"AskedCount\":' . 28 . '/');
        $this->expectOutputRegex('/\"AnsweredCount\":' . 9 . '/');
        $this->expectOutputRegex('/\"UpVotes\":' . 9 . '/');
        $this->expectOutputRegex('/\"DownVotes\":' . 4 . '/');
        $this->expectOutputRegex('/\"Score\":' . 13 . '/');
        GetUserStats::makeCall();
    }
}
