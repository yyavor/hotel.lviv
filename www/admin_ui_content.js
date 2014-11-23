var $j = jQuery.noConflict();

request = {
    "sender" : "admin_ui",
    "data" : { "command" : "0" }
    }
    
var HotelRoomsTypes = {}

$j( document ).ready(function() {       
    $j.ajax({
        type: "POST",
        dataType: "json",
        url: "communication_controller.php",
        data: request,
        success: function (response_data) {
                show_hotel_contacts_info(response_data['hotel_contacts_info']);
                show_hotel_service_info(response_data['hotel_service_info']);
                show_hotel_rooms(response_data['hotel_rooms']['rooms'], response_data['hotel_service_info']['rooms_types']);
                set_events_controllers();
                HotelRoomsTypes = response_data['hotel_service_info']['rooms_types'];
            }        
        });
});

var update_button = "<button class='update' type='button'>Обновити</button>";
var delete_button = "<button class='delete' type='button'>Видалити</button>";
var add_button = "<button class='add' type='button'>Додати</button>";

function show_hotel_contacts_info($hotel_contacts){
    contacts_info = $hotel_contacts['contacts_info']
    phone_numbers = $hotel_contacts['hotel_phones']
    
    $j("body").append("<h3>Контакти Готелю:</h3><div id='hotel_contacts' class='phone_class''><div class='contacts_info_class' id='"+contacts_info['id']+"'></div></br></br><div id='hotel_phones' class='phone_class'></div></div></br></div>");

    $j(".contacts_info_class").append('<textarea id="hotel_address" rows="5" cols="45" name="text">'+contacts_info['address']+'</textarea></br>');
    $j(".contacts_info_class").append('<textarea id="ways_to_get" rows="5" cols="45" name="text">'+contacts_info['ways_to_get']+'</textarea></br>');
    $j(".contacts_info_class").append("<input id='email' type='text' value='"+contacts_info['email']+"'>");
    $j(".contacts_info_class").append(update_button);
    
    for (phone in phone_numbers){
        $j("#hotel_phones").append("<div id='"+phone_numbers[phone]['id']+"' class='phone_class'><input type='text' value='"+phone_numbers[phone]['phone']+"'>"+update_button+delete_button+"</div>");
    }    
    $j("#hotel_phones").append(add_button);
    
    
}

function show_hotel_service_info($hotel_service){
    available_services = $hotel_service['available_services'][0];
    $j("body").append("<div id='hotel_service'><h3>Сервіс Готелю:</h3><div class='available_service_class' id='"+available_services['id']+"'></div></br></br><h3>Типи Кімнат:</h3><div id='room_types' class='room_type_class'></div></div></br></div>")
    
    rooms_types = $hotel_service['rooms_types'];
    
    $j(".available_service_class").append('<textarea rows="5" cols="45" name="text">'+available_services['available_service']+'</textarea></br>');
    $j(".available_service_class").append(update_button);
    
    for (room_type in rooms_types)
    {
        $j("#room_types").append("<div class='room_type_class' id='"+rooms_types[room_type]['id']+"'></div></br></br>");
        el = $j("#room_types").children("#"+rooms_types[room_type]['id'])
        el.append("<input type='text' value='"+rooms_types[room_type]['type_name']+"'>");
        el.append('</br><textarea rows="5" cols="45" name="text">'+rooms_types[room_type]['comment']+'</textarea></br>');
        el.append(update_button);
        el.append(delete_button);
    }
    $j("#room_types").append(add_button)
}

function show_hotel_rooms(hotel_rooms, rooms_types){    
    $j("body").append("<h3>Кімнати Готелю:</h3><div id='hotel_rooms' class='hotel_rooms''></div>");
    
    for (room_item in hotel_rooms){
        room_el = $j("<div id='"+room_item+"' class='hotel_separate_room_class'></div>");
        room_el.append("<span>Кімната: "+room_item+"</span> ");
        room_el.append("Ціна: <input size='5' type='text' value='"+hotel_rooms[room_item]['price']+"'> ");
        types_list = create_types_list(rooms_types)
        
        types_list.children("option[value="+hotel_rooms[room_item]['type']+"]").attr("selected",true)
        room_el.append("Тип: ")
        room_el.append(types_list)
        room_el.append("<br><textarea rows='5' cols='45' name='text'>"+hotel_rooms[room_item]['comments']+"</textarea></br>");
        
        room_el.append(update_button+" "+delete_button);
        room_el.append("<br><br>");
        $j("#hotel_rooms").append(room_el);
    }
    $j("#hotel_rooms").append("<br>")    
    $j("#hotel_rooms").append(add_button);
}

function create_types_list(rooms_types){
    types_list = $j("<select></select>");
    
    for (room in rooms_types){
       types_list.append("<option value='"+rooms_types[room]['id']+"'>"+rooms_types[room]['type_name']+"</option>"); 
    }
    return types_list;
}

function showDialog(parent_class, elements)
{
    
    dialog = $j("#dialog-modal").dialog(
    {
        width: 500,
        open: function(event, ui)
        {
            $j(this).empty()
            $j(this).append(elements)
        },
        buttons: {
            Send: function(){
                var stop_flag = false;
                switch(parent_class) {
                    case "room_type_class":
                        if (elements.children("input").val().length === 0){
                            alert("Не всі необхідні поля заповнені !!!")
                            stop_flag = true
                            break;
                        }
                        type_name = elements.children("input").val();
                        comment = elements.children("textarea").val();
                        params = [parent_class, {'type_name' : type_name, 'comment': comment}]; 
                        break;
                    case "phone_class":
                        if (elements.children("input").val().length === 0){
                            alert("Не всі необхідні поля заповнені !!!")
                            stop_flag = true
                            break;
                        }
                        params = [parent_class, {'phone' : elements.children("input").val()}];
                        break;
                    case "hotel_rooms":
                        if ($j('#room_number').val().length === 0){
                            alert("Не всі необхідні поля заповнені !!!")
                            stop_flag = true
                            break;
                        }
                        id = elements.children("#room_number").val();
                        comments = elements.children("#comments").val();
                        price = elements.children("#price").val();
                        type = elements.children("#room_type").children("option:selected").attr('value');
                        params = [parent_class, {'id': id, 'comments' : comments, 'price' : price, 'type' : type}];
                        break;
                }
                if (!stop_flag){
                    send_command_request(params, 3)
                    dialog.dialog( "close" );
                }
                stop_flag = false;
            },
            Close: function(){
                dialog.dialog( "close" );
            }
        }
     });
}

function set_events_controllers(){
    $j(".update").click(function(){
            parent_class = $j(this).parent().attr('class');
            var stop_flag = false;
            switch(parent_class) {
                case "room_type_class":
                    if ($j(this).siblings("input").val().length === 0){
                        alert("Не всі необхідні поля заповнені !!!")
                        stop_flag = true
                        break;
                    }
                    params = [parent_class, {'type_name' : $j(this).siblings("input").val(), 'comment': $j(this).siblings("textarea").val()}, $j(this).parent().attr("id")];
                    break;
                case "available_service_class":
                    params = [parent_class, {'available_service' : $j(this).siblings("textarea").val()}, $j(this).parent().attr("id")];
                    break;
                case "contacts_info_class":
                    address = $j(this).siblings("#hotel_address").val();
                    email = $j(this).siblings("input").val();
                    ways = $j(this).siblings("#ways_to_get").val();
                    params = [parent_class, {'address' : address, 'email' : email, 'ways_to_get' : ways}, $j(this).parent().attr("id")];
                    break;
                case "phone_class":
                    if ($j(this).siblings("input").val().length === 0){
                        alert("Не всі необхідні поля заповнені !!!")
                        stop_flag = true
                        break;
                    }
                    params = [parent_class, {'phone' : $j(this).siblings("input").val()}, $j(this).parent().attr("id")];
                    break;
                case "hotel_separate_room_class":
                    id = $j(this).parent().attr("id")
                    comments = $j(this).siblings("textarea").val();
                    price = $j(this).siblings("input").val();
                    type = $j(this).siblings("select").children("option:selected").attr('value');
                    params = ["hotel_rooms", {'comments' : comments, 'price' : price, 'type' : type}, id];
                    break;
            }
            if (!stop_flag){
                send_command_request(params, 1);
                stop_flag = false
            }
            else {
                location.reload();
            }
            
        });
        
    $j(".delete").click(function(){
            parent_class = $j(this).parent().attr('class');
            switch(parent_class) {
                case "room_type_class":
                    params = [parent_class, $j(this).parent().attr("id")]; 
                    break;
                case "available_service_class":
                    params = [parent_class, $j(this).parent().attr("id")];
                    break;
                case "contacts_info_class":
                    params = [parent_class, $j(this).parent().attr("id")];
                    break;
                case "phone_class":
                    params = [parent_class, $j(this).parent().attr("id")];
                    break;
                case "hotel_separate_room_class":
                    params = ['hotel_rooms', $j(this).parent().attr("id")];
                    break;
            }
            send_command_request(params, 2);
        });
        
    $j(".add").click(function(){
            parent_class = $j(this).parent().attr('class');
            elements = $j("<div id='sending_elements'></div>");
            elements.empty()
            switch(parent_class) {
                case "room_type_class":
                    elements.append("Тип: <input type='text' size='15'><br>"); 
                    elements.append("Коментар: <textarea rows='5' cols='45' name='text'></textarea><br>");
                    break;
                case "phone_class":                    
                    elements.append("Номер телефону: <input type='text' size='15'><br>");
                    break;
                case "hotel_rooms":                    
                    elements.append("Номер кімнати: <input id='room_number' type='text' size='15'><br>");
                    elements.append("Коментар: <textarea id='comments' rows='5' cols='45' name='text'></textarea><br>");
                    elements.append("Тип: ");
                    rooms_types_list = $j("<select id='room_type'><select>")
                    for (type in HotelRoomsTypes){
                        rooms_types_list.append("<option value='"+HotelRoomsTypes[type]['id']+"'>"+HotelRoomsTypes[type]['type_name']+"</option>"); 
                    }
                    elements.append(rooms_types_list);
                    elements.append("<br>");
                    elements.append("Ціна: <input id='price' type='text' size='15'><br>");
                    break;
            }
            showDialog(parent_class, elements);
        });
}

function send_command_request(params, command){
    request = {
        "sender" : "admin_ui",
        "data" : { "command" : command, "params" : params }        
    }
    
    $j.ajax({
        type: "POST",
        dataType: "json",
        url: "communication_controller.php",
        data: request,
        success: function (response_data) {
                location.reload();
            }        
        });
}