/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var $j = jQuery.noConflict();
var RoomsTypes;

$j( document ).ready(function() {
    padding = Math.floor(($j("#menu_title").height()-$j("#menu_title_container").height())/2);
    $j("#menu_title_container").css({"padding-top":padding});
    send_command_request(show_main_page, null, 0);
    
    $j("#exterier_menu_link").click(function(){
        $j(this).addClass("current");
        $j(this).siblings().removeClass("current");
        send_command_request(show_main_page, null, 0);
    });
    
    $j("#contacts_menu_link").click(function(){
        $j(this).addClass("current");
        $j(this).siblings().removeClass("current");
        send_command_request(show_contacts, null, 3);
    });
});

function send_command_request(callback, params, command){
    request = {
        "sender" : "user_ui",
        "data" : { "command" : command, "params" : params }        
    }
    $j.ajax({
        type: "POST",
        dataType: "json",
        url: "get_whole_hotel_info.php",
        data: request,
        success: function (response_data) {
                callback(response_data);
            }        
        });
}

function show_main_page(data){
    if ($j("#content").length){
        $j("#content").empty();
    }
    room_types = data['hotel_service_info']['rooms_types'];
    RoomsTypes = room_types
    $j('#rooms_types').empty();
    for (var i=0; i<room_types.length; i++){
        $j('#rooms_types').append('<li class="room_type" id='+room_types[i]['id']+'><a><span><b>'+room_types[i]['type_name']+'</b></span></a></li>');
    }
    $j('#rooms_types').append('<li class="room_type"><a><span><b>Усі кімнати</b></span></a></li>');
    available_service = data['hotel_service_info']['available_services'][0]['available_service'].replace(/(?:\r\n|\r|\n)/g, '<br>')
    $j("#content").append("<div id='hotel_main_comment'>"+available_service+"</div><br>");
    show_photos_galery(data['exterier_photos']);
    
    $j(".room_type").click(function(){
        send_command_request(get_rooms_list, $j(this).attr('id'), 2);    
    });
    
    content_width = $j( window ).width() - $j("#left_menu_colum").width() - (Math.floor($j("#content").css("marginLeft").replace(/[^-\d\.]/g, '')*2)+1)
    $j("#content").css({"width":content_width})
    
    
}

function show_separate_room_galery(data){
    if ($j("#content").length){
        $j("#content").empty();
    }
    show_photos_galery(data['room_photo_galery']);
}

function show_photos_galery(photos_content){
    $j("#content").append("<div id='MooFlow' class='mf'></div>");
    for (var i=0; i<photos_content.length; i++){
        $j("#content").children("#MooFlow").append("<div><img src='"+photos_content[i]+"'/></div>");
    }        
    var mf = new MooFlow($('MooFlow'), {
            bgColor: '#000',
            startIndex: Math.round((photos_content.length)/2)-1,
            useMouseWheel: true,
            useResize: false,
            useWindowResize: false,
            useKeyInput: true,
            useSlider: true,
            useCaption: true,
            reflection: 0.4,
            heightRatio: 0.6,
            interval: 3000,
            factor: 160
    });
    var page_height = $j("html").height();
    $j("#content").height(page_height-48);
    $j(".mf").width();

    var moo_flow_background = $j("#MooFlow").css("background-color");

    moo_flow_background = moo_flow_background.substring(4, moo_flow_background.length-1)
     .replace(/ /g, '')
     .split(',');

    $j("#MooFlow").css("background-color", "rgba("+moo_flow_background[0]+", "+moo_flow_background[1]+", "+moo_flow_background[2]+", 0.5)");
    $j('#MooFlow').addClass('transparent');
};

function get_rooms_list(data){
    rooms = data['rooms'];
    $j("#content").empty();
    for (room in rooms){
        
        room_info_container = $j('<div class="room_info_container"></div>')
        room_info_container.append('<div id="'+room+'"class="room_photo_item"></div>');

        room_text_container = $j('<div class="room_text_container"></div>');
        room_text_container.append('<div class="rooms_ids"><span><b>Номер кімнати:</b> </span>'+room+'</div><br>')
        root_type_name = ''
        for(type_el in RoomsTypes){
            if (RoomsTypes[type_el]['id'] == rooms[room]['type']){
                root_type_name = RoomsTypes[type_el]['type_name']
            }                
        }
        room_text_container.append('<div class="rooms_types"><span><b>Тип кімнати:</b> </span>'+root_type_name+'</div><br>')
        comments = rooms[room]['comments']
        comments = comments.replace(/(?:\r\n|\r|\n)/g, '<br>')
        room_text_container.append('<div class="rooms_comments"><span><b>Комментар:</b> <br></span>'+comments+'</div><br>')
        //room_text_container.append('<span class="room_price">Ціна: '+rooms[room]['price']+'</span>');
        
        
        room_info_container.append(room_text_container);
        
        
        $j("#content").append(room_info_container)
        $j("#"+room).append('<img src="'+rooms[room]['main_photo']+'" />');
    }
    
    $j('.room_photo_item').click(function() {
        room_id = $j(this).attr("id");
        send_command_request(show_separate_room_galery, room_id, 1);
    });
}

function show_contacts(data){
    
    if ($j("#content").length){
        $j("#content").empty();
    }
    
    contacts_info = data['contacts_info'];
    phones_text = 'Телефони:';
    for (var phone_item = 0; phone_item < data['hotel_phones'].length; phone_item++){
        
        phones_text += '<span> '+data['hotel_phones'][phone_item]['phone']+'<span>';
        if (phone_item < data['hotel_phones'].length-1){
            phones_text += ';';
        }
        else{
           phones_text += '<br>'; 
        }
    }
    
    email = 'E-mail: <a href="mailto:'+contacts_info['email']+'">'+contacts_info['email']+'</a><br>';
    address = contacts_info['address'].replace(/(?:\r\n|\r|\n)/g, '<br>');
    
    ways = contacts_info['ways_to_get'].replace(/(?:\r\n|\r|\n)/g, '<br>');
    
    width = Math.round(($j( window ).width()/100)*80);
    height = Math.round(($j( window ).height()/100)*80);  
    
    $j("#content").append('<div id="place_on_map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5149.138220771666!2d23.96858374224904!3d49.81296796871404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae70c3533e4eb%3A0xa031acbc59876fea!2z0LLRg9C7LiDQodC60L3QuNC70ZbQstGB0YzQutCwLCA3NSwg0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGM!5e0!3m2!1suk!2sua!4v1409680971676" width="'+width+'" height="'+height+'" frameborder="0" style="border:0"></iframe></div>');
    $j("#content").append('<div class="contacts_text" id="main_contacts_text"></div>');
    $j("#content").append('<div class="contacts_text" id="ways_to_get"></div>');
    $j("#main_contacts_text").append(phones_text, email, address);
    $j("#ways_to_get").append(ways);
    
}

