<?php
$email = $_POST['email'];

echo "email=".$email;


$con = mysqli_connect('cfchung.vergil.u.washington.edu','root','qazpoils#','BOGGLE', 50001);
if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"BOGGLE");

$sql = "INSERT INTO RAFFLE (EMAIL) VALUES ('$email')";

if (!mysqli_query($con, $sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

mysqli_close($con);
?>