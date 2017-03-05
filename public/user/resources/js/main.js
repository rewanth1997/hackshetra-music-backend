//Main.js
//Created by Kaushik

(function($d, $w, $, t){
  var Globals = {
        faces: {
          'happy': 'path(\'m80.859 976.07c30.178 20.206 56.922 20.61 81.714 16.196 39.449-8.0074 63.438-42.727 66.369-51.758\')',
          'angry': 'path(\'m 80.859231,989.76816 c 30.214109,-25.26469 43.892999,-11.46159 75.366929,-2.84655 28.30598,8.32906 40.97782,2.71415 67.03677,-16.67957\')',
          'sad': 'path(\'m 91.215578,1002.129 c 30.214112,-25.26472 50.240432,-28.83357 85.055122,-14.53924 19.28594,-0.69098 10.57694,-16.32816 46.99223,1.36052\')',
        }
    },
    $Objects = {
        Expression : []
    },
    Functions = {
      ToSad: function(){
          console.log($Objects.Expression, Globals.faces.sad);
          t.to($Objects.Expression[1], 0.2, {
              strokeDashoffset: '100%',
              ease: Power4.easeInOut
          });
          t.to($Objects.Expression[0], 0.2, {
              strokeDashoffset: '100%',
              ease: Power4.easeInOut
          });
          t.to($Objects.Expression[2], 0.2, {
              strokeDashoffset: '0',
              ease: Power4.easeInOut,
              delay: 0.2,
              onComplete: function(){
                  $Objects.MoodHeading.html('It\'s getting dull!!');
              }
          });
      },
      ToHappy: function(){
          t.to($Objects.Expression[1], 0.2, {
              strokeDashoffset: '100%',
              ease: Power4.easeInOut
          });
          t.to($Objects.Expression[2], 0.2, {
              strokeDashoffset: '100%',
              ease: Power4.easeInOut
          });
          t.to($Objects.Expression[0], 0.2, {
              strokeDashoffset: '0',
              ease: Power4.easeInOut,
              delay: 0.2,
              onComplete: function(){
                  $Objects.MoodHeading.html('This Party is Awesome!!');
              }
          });
      },
      ToAngry: function(){
          t.to($Objects.Expression[2], 0.2, {
              strokeDashoffset: '100%',
              ease: Power4.easeInOut
          });
          t.to($Objects.Expression[0], 0.2, {
              strokeDashoffset: '100%',
              ease: Power4.easeInOut
          });
          t.to($Objects.Expression[1], 0.2, {
              strokeDashoffset: '0',
              ease: Power4.easeInOut,
              delay: 0.2,
              onComplete: function(){
                  $Objects.MoodHeading.html('Need some change around here!!');
              }
          });
      },
        FetchPlaylist: function(){
            $.ajax({
                type: 'get',
                url: '/playList',
                dataType: 'json',
                success: Functions.RenderList
            });
        },
        GenerateDuration: function(){
            var d = {
                min: Math.floor((Math.random() * 5) + 3),
                sec: Math.floor((Math.random() * 55) + 5)
            };
            return d;
        },
        RenderList: function(data){
            console.log("Render: " + JSON.stringify(data));
            $Objects.PlayListContainer.html('');
            for (var i = 1; i < data.length; i++){
                console.log(JSON.stringify(data[i]));
                var duration = Functions.GenerateDuration();
                var song = $('<li class="song" data-source="' + data[i].Url + '" id="' + data[i].Id + '"><a><img class="avatar" src="../resources/img/avatar.jpg"/></a>' + '<div class="song-info"><strong>Song</strong> ' + data[i].Song + ' <br/><strong>Duration </strong>' + duration.min + 'm ' + duration.sec + 's <br/><div class="music-rating"><span class="icon icon-thumbs-up"><i>' + data[i].UpVote + '</i></span><span class="icon icon-thumbs-down"><i>' + data[i].DownVote + '</i></span></div></div></li>');
                var up = song.find('.icon-thumbs-up'),
                    down = song.find('.icon-thumbs-down');
                up.on('click', function(event){
                    var id = $(event.target).closest('li').attr('id');
                    Functions.UpVote(id);
                });
                down.on('click', function(event){
                    var id = $(event.target).closest('li').attr('id');
                    Functions.DownVote(id);
                });
                console.log(data[i].UpVote, data[i].DownVote);
                $Objects.PlayListContainer.append(song);
            }
        },
        Play: function(){

        },
        UpVote: function(Id){
            console.log("Up: " + Id);
            var data = {id: Id};
            $.ajax({
                type: 'post',
                url: '/playList/increase',
                data: data,
                success: Functions.FetchPlaylist
            });
        },
        DownVote: function(Id){
            console.log("Down: " + Id);
            var data = {id: Id};
            $.ajax({
                type: 'post',
                url: '/playList/decrease',
                data: data,
                success: Functions.FetchPlaylist
            });
        },
        GetMood: function(){
            $.ajax({
                url: '/analyze',
                type: 'get',
                dataType: 'text',
                success: Functions.SetMood
            });
        },
        SetMood: function(data){
            console.log("Mood: " + data);
            if(data.localeCompare('joy')) Functions.ToAngry();
            else if(data.localeCompare('anger')) Functions.ToHappy();
            else if(data.localeCompare('disgust') || data.localeCompare('sadness')) Functions.ToSad();
        }
    };
    $d.ready(function(){
        $Objects.MoodHeading = $('.current-mood');
        $Objects.PlayListContainer = $('.dashboard-list');
        $Objects.Expression[0] = $('#happy');
        $Objects.Expression[1] = $('#angry');
        $Objects.Expression[2] = $('#sad');
        $Objects.ChatBox = $('.chat-box');
        $Objects.ChatShowButton = $('.chat-now')
            .bind('click', function(){
                console.log('chatting');
                t.to($Objects.ChatBox,  0.5, {
                    left: '0'
                });
            });
        $Objects.ChatHideButton = $('.chat-hide')
            .bind('click', function(){
                console.log('bye', $Objects.ChatBox);
                t.to($Objects.ChatBox,  0.5, {
                    left: '-' + $Objects.ChatBox.innerWidth() + 'px'
                });
            });
          Functions.FetchPlaylist();
        // $('.icon-thumbs-up').on('click', function(event){
        //     var id = $(event.target).closest('li').attr('id');
        //     Functions.UpVote(id);
        // });
        // $('.icon-thumbs-down').on('click', function(event){
        //     var id = $(event.target).closest('li').attr('id');
        //     Functions.DownVote(id);
        // });
        setInterval(function(){
            Functions.GetMood();
        }, 1000);
    });
})(jQuery(document), jQuery(window), jQuery, TweenMax);
