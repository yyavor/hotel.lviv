<?php
$username = $_POST['username']; //Set UserName
$password = $_POST['password']; //Set Password
$msg ='';
if(isset($username, $password)) {
    ob_start();
    include('/config.php'); //Initiate the MySQL connection
    $result = DB::query("SELECT * FROM users WHERE name='administrator' and password=SHA('RODdvir')");
    // If result matched $myusername and $mypassword, table row must be 1 row
    if(count($result)){
        $_SESSION['name']= $username;
        header("location:admin_ui.php?msg=$msg");
    }
    else {
        $msg = "Wrong Username or Password. Please retry";
        header("location:login.php?msg=$msg");
    }
    ob_end_flush();
}
else {
    header("location:login.php?msg=Please enter some username and password");
}
?>