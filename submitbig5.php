<?php
session_start();
$userID = $_COOKIE["userID"];


$effort = $_POST['effort'];
$scoreE = $_POST['scoreE'];
$scoreA = $_POST['scoreA'];
$scoreC = $_POST['scoreC'];
$scoreN = $_POST['scoreN'];
$scoreI = $_POST['scoreI'];


$con = mysqli_connect();
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"BOGGLE");

$sql = "UPDATE USER SET SCOREE = '$scoreE', SCOREA = '$scoreA', SCOREC = '$scoreC', SCOREN = '$scoreN', SCOREI = '$scoreI' WHERE ID = '$userID'";

if (!mysqli_query($con, $sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

mysqli_close($con);
?>
