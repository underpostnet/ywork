
function movUser(findex, fx, fy){

  array_map[users[findex].xpos][users[findex].ypos]--;
  $('.c-'+users[findex].xpos+'-'+users[findex].ypos).html(array_map[users[findex].xpos][users[findex].ypos]);

  if(findex==0){
    $('.'+users[findex].xpos+'-'+users[findex].ypos).css('background', 'red');
  }

  users[findex].state = 'mov';
  users[findex].xpos = fx;
  users[findex].ypos = fy;

  if(findex==0){
    socket.send(JSON.stringify(users[findex]));
  }

  array_map[users[findex].xpos][users[findex].ypos]++;
  $('.c-'+users[findex].xpos+'-'+users[findex].ypos).html(array_map[users[findex].xpos][users[findex].ypos]);

  if(findex==0){
    $('.'+users[findex].xpos+'-'+users[findex].ypos).css('background', 'blue');
  }

}

function loadMap(){

  var ypos = 0;

  for(var y=1; y<=5; y++){

    var xpos = 0;

    for(var x=1; x<=5; x++){

      var style = 'top: '+ypos+'%; left: '+xpos+'%;';

      var num = '<div class="center c-'+x+'-'+y+'">0</div>';

      $('.map').append('<div data-x="'+x+'" data-y="'+y+'" class="node '+x+'-'+y+'" style="'+style+'">'+num+'</div>');

      $('.'+x+'-'+y).click(function() {

        let xc = parseInt($(this).attr('data-x'));
        let yc = parseInt($(this).attr('data-y'));
        console.log('click -> '+xc+'-'+yc);

        movUser(0, xc, yc);

      });

      xpos = xpos + 20;

    }

    xpos = 0;

    ypos = ypos + 20;

  }

  array_map = new Array(5);

  for (var i = 1; i <= 5; i++) {

    array_map[i] = new Array(5);

  }

  for(var y=1; y<=5; y++){

    for(var x=1; x<=5; x++){

      array_map[x][y] = 0;

    }

  }

}

//init

var users = new Array();
var array_map;
