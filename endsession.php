<?php
session_start();
// $userID = session_id();
$userID = $_COOKIE["userID"];


echo "userID=".$userID;


$con = mysqli_connect('cfchung.vergil.u.washington.edu','root','qazpoils#','BOGGLE', 50001);
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"BOGGLE");

$sql = "UPDATE USER SET ENDTIME = now() WHERE ID = '$userID'";

if (!mysqli_query($con, $sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

mysqli_close($con);
?>