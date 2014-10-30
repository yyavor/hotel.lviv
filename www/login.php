<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>Hotel Login</title>
</head>
<body>
<?php
    $login_form = <<<EOD
<form name="login" id="login" method="POST" action="check_login.php">
<p><label for="username">Please Enter Username: </label><input type="text" size="20" name="username" id="username" /></p>
<p><label for="password">Please Enter Password: </label><input type="password" size="20" name="password" id="password" /></p>
<p><input type="submit" name="submit" id="submit" value="Submit"/> <input type="reset" name="reset" id="reset" value="reset"/></p>
</form>
EOD;
$msg = $_GET['msg'];  //GET the message
echo '<p>'.$msg.'</p>'; //If message is set echo it
echo $login_form;
?>
</body>
</html>