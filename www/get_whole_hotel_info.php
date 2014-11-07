<?php
header('Content-Type: application/json');
include ('database_communication.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['sender'])){
        $request_sender = $_POST['sender'];
        if ($request_sender == 'user_ui' and isset($_POST['data'])){
            $data = $_POST['data'];
            switch ($data['command']) {
                case 0:
                    $response = get_data_for_main_page();
                    break;
                case 1:
                    $response = get_separate_room_photos($data['params']);
                    break;
                case 2:
                    $response = get_rooms_by_type($data['params']);
                    break;
                case 3:
                    $response = get_hotel_contacts_info();
                    break;
            }
            
            echo json_encode($response);
        }
    }else{
        echo json_encode("Data : NOT RECEIVED");
    }
}

function get_data_for_main_page()
{
    $hotel = new Hotel();
    
    $result = array();
    $result["hotel_service_info"] = $hotel->get_hotel_service_info();
    $result = array_merge($result, $hotel->get_hotel_exterier_photos());
    
    return $result;
}

function get_rooms_by_type($params)
{
    $hotel = new Hotel();
    $result = $hotel->get_rooms_main_info($params);
    return $result;
}

function get_separate_room_photos($params)
{
    $hotel = new Hotel();
    
    $result = array();
    $result["room_photo_galery"] = $hotel->get_separate_room_photos($params);
    
    return $result;
}

function get_hotel_contacts_info()
{
    $hotel = new Hotel();
    
    $result = array();
    $result = $hotel->get_hotel_contacts_info();
    
    return $result;
}



