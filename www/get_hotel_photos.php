<?php
header('Content-Type: application/json');
$hotel_photos = array("exterier_photos" => array(), "rooms_lists" => array());

$exterier_folder = "images/hotel_exterier";
$rooms_root_folder = "images/rooms";

function get_images_full_path($images_path, $images)
{
    $result = array();
    foreach ($images as $image)
    {
        $image_path = $images_path.'/'.$image;
        array_push($result, $image_path);
    }
    return $result;    
}

$exterier_photos_names = array_diff(scandir($exterier_folder), array('.', '..'));
$rooms_folders = array_diff(scandir($rooms_root_folder), array('.', '..'));

$hotel_photos['exterier_photos'] = get_images_full_path($exterier_folder, $exterier_photos_names);
foreach ($rooms_folders as $room)
{
    $current_room_dir = $rooms_root_folder.'/'.$room;
    $room_images = array_diff(scandir($current_room_dir), array('.', '..'));
    if (count($room_images)){
        $room_images_links_array = get_images_full_path($current_room_dir, $room_images);
        $hotel_photos['rooms_lists'][$room] = $room_images_links_array;
    }
}

echo json_encode($hotel_photos);