<?php
    ob_start();
    session_start();
    include('/database_communication.php');    
    
    if (!isset($_SESSION['name'])){
        header("location:login.php");
    }
    header( 'Content-Type: text/html; charset=utf-8' );
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

    <head>
        <title>Hote admin page</title>
        
        <link rel="stylesheet" type="text/css" href="/third_party/jquery-ui-1.11.2.custom/jquery-ui.css" />
        <link rel="stylesheet" type="text/css" href="/third_party/jquery-ui-1.11.2.custom/jquery-ui.structure.css" />
        <link rel="stylesheet" type="text/css" href="/third_party/jquery-ui-1.11.2.custom/jquery-ui.theme.css" />

        <script src="third_party/jquery/jquery-1.11.1.js"></script>
        <script src="third_party/jquery-ui-1.11.2.custom/jquery-ui.js"></script>
        <script src="admin_ui_content.js"></script>
        
        

    </head>   
    
    <body>
        <div id="dialog-modal" title="Basic modal dialog" style="display: none;">
        </div>
        <p><a href="logout.php">Вихід</a></p> <!-- A link for the logout page -->
    </body>
</html>
