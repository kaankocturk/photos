var domstuff;
$(document).ready(init);

function init(){
  console.log('init');
  if(document.cookie){
    $('.loginli, .regli').css('visibility', 'hidden');;
    $('.logoutli').css('visibility', 'visible');
  }

  $('#inventorytable').on('click', '.update',function(e){
      e.stopPropagation();
      $mrow = $(this).closest('tr');
      mrowid = $mrow.data('id');
      console.log(mrowid);
      $('#updateItem').modal();
  });

  $('#updateItem').on('click', '.updateItem', function(e){
    $.ajax({url: '/items/'+mrowid, method: 'PUT', data: {name: $('input#mname').val(), price: $('input#mprice').val(), picurl: $('input#mpicurl').val()}});
    $('input').val('');
  });

  $('#inventorytable').on('click', '.remove',function(e){
    e.stopPropagation();
    var $row = $(this).closest('tr');
    console.log($row.data('id'));
    $.ajax({url:'/items/'+$row.data('id'), method: 'DELETE'}).success(function(data){
    console.log('data:', data);
    location.reload();
    })
    .fail(function(err) {
    console.log('err:', err);
    });
  });

  $.get('/items/my')
    .success(function(data){
      console.log(data);
      if(data.length>0){
        console.log(data);
      domstuff = data.map(function(input,index){
          console.log(input);
          var $remove = $('<button>').addClass('btn btn-warning remove btn-sm').append('Remove');
          var $update = $('<button>').addClass('btn btn-info update btn-sm').append('Update item');
          var $tr = $('#templateinventory').clone().attr('id', 'item'+index).data('id', input._id);
          $tr.find('.name').text(input.name);
          $tr.find('.description').text(input.description);
          $tr.find('.picurl').text(input.picurl);
          $tr.find('.remove').append($remove,$update);
          return $tr;
        });
        console.log(domstuff);
      $('#inventorytable').append(domstuff);
      }
    })
    .fail(function(err) {
      console.error(err);
    });
}
