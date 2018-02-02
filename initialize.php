<?php
session_start();
session_regenerate_id();
$userID = session_ID();
$visit = $_POST['visit'];
$groupID = $_POST['groupID'];
$device = $_POST['device'];


setcookie("userID", $userID, time()+3600);


$con = mysqli_connect('cfchung.vergil.u.washington.edu','root','qazpoils#','BOGGLE', 50001);
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"BOGGLE");

$sql = "INSERT INTO USER (ID, VISIT, GROUPID, DEVICE, STARTTIME) VALUES ('$userID', '$visit', '$groupID', '$device',now())";

if (!mysqli_query($con, $sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

mysqli_close($con);
?>