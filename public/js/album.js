$(document).ready(init);
var domstuff;
function init(){

  $('.album').on('click', 'img' ,function() {
    console.log('this',$(this).attr('id'));
    location.replace('/items/' + $(this).attr('id')+'/'+window.location.pathname.split('/')[2]);
  });

  $.get('/albums/images/'+window.location.pathname.split('/')[2])
    .success(function(data){
      console.log(data);
      if(data.length>0){
        console.log(data);
      domstuff = data.map(function(input){
          var $img = $('<img>').attr('src', input.picurl).addClass('thumb').attr('id', input._id);
          return $img;
        });
        console.log(domstuff);
      $('.album').append(domstuff);
      }
    })
    .fail(function(err) {
      console.error(err);
    });
}
