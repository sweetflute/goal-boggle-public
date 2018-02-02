<?php
session_start();
// $userID = session_ID();
// $userID = "23a0f0176da2d3b7ea186585b925982e";
$userID = $_COOKIE["userID"];

$age = $_POST['age'];
$gender = $_POST['gender'];
$enjoyment = $_POST['enjoyment'];
$performance = $_POST['performance'];
$effort = $_POST['effort'];
$nes = $_POST['nes'];


$con = mysqli_connect('cfchung.vergil.u.washington.edu','root','qazpoils#','BOGGLE', 50001);
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"BOGGLE");

$sql = "UPDATE USER SET AGE = '$age', GENDER = '$gender', ENJOYMENT = '$enjoyment', PERFORMANCE = '$performance', EFFORT = '$effort', NES = '$nes' WHERE ID = '$userID'";

if (!mysqli_query($con, $sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

mysqli_close($con);
?>