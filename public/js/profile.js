var domstuff;
$(document).ready(init);

function init(){
  if(document.cookie){
    $('.loginli, .regli').css('visibility', 'hidden');;
    $('.logoutli').css('visibility', 'visible');
  }

  $('tbody').on('click', '.remove',function(e){
    e.stopPropagation();
    var $row = $(this).closest('tr');
    var symbol = $row.find('.sym').text();
    $.ajax({url:'/stocks/'+symbol, method: 'DELETE'}).success(function(data){
    console.log('data:', data);
    location.reload();
    })
    .fail(function(err) {
    console.log('err:', err);
    });
  });

  $.get('/stocks/all')
    .success(function(data){
      console.log(data.length);
      console.log(data);
      if(data.length>0){
      domstuff = data.map(function(input, index){
        var price;
        console.log(input);
        $.post('/stocks/quote', {sym : input.symbol}).success(function(data){
          console.log(data.LastPrice);
          price = data.LastPrice;
          var $remove = $('<button>').addClass('btn btn-warning remove btn-sm').append('Remove from watchlist');
          var $tr = $('#template').clone().attr('id', 'stock'+index);
          $tr.find('.name').text(input.name);
          console.log(price);
          $tr.find('.price').text(price);
          $tr.find('.sym').text(input.symbol);
          $tr.find('.exchange').text(input.exchange);
          $tr.find('.remove').append($remove);
          $('tbody').append($tr);
          return $tr;
        });
      });
      console.log(domstuff);
    }})
    .fail(function(err) {
      console.error(err);
    });
}
