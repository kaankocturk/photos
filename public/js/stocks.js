$(document).ready(init);
var $mrow;
var mrowid;
var domstuff;
var stockcount;

function init(){
  if(document.cookie){
    $('.loginli, .regli').css('visibility', 'hidden');
    $('.logoutli').css('visibility', 'visible');
  }

  $('tbody').on('click', '.add',function(e){
      e.stopPropagation();
      $row = $(this).closest('tr');
      $row.find('.sym').text()
      $.post('/stocks', {symbol: $row.find('.sym').text(),name: $row.find('.name').text(),exchange: $row.find('.exchange').text()});
      $('tbody tr').detach();
      $('.notification').text('Success!');
  });

  $('.findStock').on('click', handleEntry);


  function handleEntry(e){
    e.preventDefault();
    var extension = $('#input').val();
    console.log(extension);
    $.post('/stocks/search', {ext: extension}).success(function(data){
      console.log(data);
      domstuff = data.map(function(input, index){
      var $add = $('<button>').addClass('btn btn-info add btn-sm').append('Add stock to your watchlist');
      var $tr = $('#template').clone().attr('id', 'stock'+index);
      $tr.find('.name').text(input.Name);
      $tr.find('.exchange').text(input.Exchange);
      $tr.find('.sym').text(input.Symbol);
      $tr.find('.add').append($add);
      return $tr;
      });
      $('tbody').append(domstuff);
    });
    $('input').val('');
  }
}
