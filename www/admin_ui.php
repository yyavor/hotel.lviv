<?php
    include('/database_communication.php');
    
    session_start(); //Start the session
    if (!isset($_SESSION['name'])){
        header("location:login.php");
    }
    else //Continue to current page
    header( 'Content-Type: text/html; charset=utf-8' );
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>Welcome To Admin Page Demonstration</title>
</head>
    <body>
        <p><a href="logout.php">Logout</a></p> <!-- A link for the logout page -->
        <?php
            $rod_dvir_hotel = new Hotel();

            echo $rod_dvir_hotel->get_hotel_contacts_info();
            echo "<br><br>";
            echo $rod_dvir_hotel->get_hotel_exterier_photos();
            echo "<br><br>";
            echo $rod_dvir_hotel->get_hotel_service_info();
            echo "<br><br>";
            echo $rod_dvir_hotel->get_rooms_main_photos();
            echo "<br><br>";
            echo $rod_dvir_hotel->get_separate_room_photos(101);
            echo "<br><br>";
            echo $rod_dvir_hotel->get_rooms_main_photos(2);
        ?>
    </body>
</html>
