var socket = io();

$(document).ready(function() {
  initialize();
  scroll();
  $("#chatMessageSend").click(function() {
    var msg = $('#chatMessageInput').val();
    $('#chatMessageInput').val('');
    if(msg){
      socket.emit('msg', {message: msg, user: 'user'});
    }
  });
});

  var user;

  //socket.emit('setUserName', user);

  socket.on('newmsg', function(data) {
    console.log("Sab sahi hai");
    var time = toTime(data.createdAt.substr(11, 8));
    var item = $('<div class="timeslot" style="height:80px"> <div class="task"> <span> <span class="type"> ' + data.User + ' </span> <span class="details"> ' + data.Message + ' </span><div class="arrow"></div> </div> <div class="icon green"> </div> <div class="time"> ' + time.hr + ":" + time.min + ":" + time.cycle + ' </div> </div>');
    var lastItem = $('.timeslot:last-child').attr('class');
    if(lastItem !== undefined && !lastItem.includes('alt')) {
       item.addClass('alt');
    }
    $('.timeline').append(item);
    scroll();
  });

function toTime(input){
	var h, cycle, time;
	h = input.substr(0, 2);
	cycle = (h >= 12) ? 'pm' : 'am';
	time = {
		hr: h % 13 + 1,
		min: input.substr(3, 2),
		cycle:  cycle
	};
	return time;
}

function initialize() {
  console.log('hello');
  $.get( '/chatMessage', function(data) {
       data = JSON.parse(data);
       for(var i = 0; i < data.length; i++) {
           var time = toTime(data[i].createdAt.substr(11, 8));
           var item = $('<div class="timeslot" style="height:80px"> <div class="task"> <span> <span class="type"> ' + data[i].User + ' </span> <span class="details"> ' + data[i].Message + ' </span><div class="arrow"></div> </div> <div class="icon green"> </div> <div class="time"> ' + time.hr + ":" + time.min + ":" + time.cycle + ' </div> </div>');
           if(i & 1) {
              item.addClass('alt');
           }
           $('.timeline').append(item);
         }
  });

}

function scroll(){
  $('.timeline').animate({scrollTop: $('.timeline').prop("scrollHeight")}, 1000);
}
