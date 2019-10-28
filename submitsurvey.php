<?php
session_start();
$userID = $_COOKIE["userID"];

$age = $_POST['age'];
$gender = $_POST['gender'];
$enjoyment = $_POST['enjoyment'];
$performance = $_POST['performance'];
$effort = $_POST['effort'];
$nes = $_POST['nes'];


$con = mysqli_connect();
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
