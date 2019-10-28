<?php
session_start();
$gameID = $_COOKIE["gameID"];
print_r($_COOKIE);
$score = $_POST['score'];

echo "gameID=".$gameID;


$con = mysqli_connect();
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"BOGGLE");

$sql = "UPDATE GAME SET ENDTIME = now(), SCORE = '$score' WHERE ID = '$gameID'";

if (!mysqli_query($con, $sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

mysqli_close($con);
?>
