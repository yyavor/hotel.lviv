<?php
ob_start();
session_start(); //Start the session
$username = $_POST['username']; //Set UserName
$password = $_POST['password']; //Set Password
$msg ='';
if(isset($username, $password)) {
    include('/config.php'); //Initiate the MySQL connection
    $result = DB::query("SELECT * FROM users WHERE name='".$username."' and password=SHA('".$password."')");
    // If result matched $myusername and $mypassword, table row must be 1 row
    if(count($result)){
        session_regenerate_id();
        $_SESSION['name']= $username;
        session_write_close();
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