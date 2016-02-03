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

  $('#inventorytable').on('click', '.list',function(e){
      e.stopPropagation();
      $mrow = $(this).closest('tr');
      mrowid = $mrow.data('id');
      if($mrow.hasClass('listed')){
        $.ajax({url: '/items/list/'+mrowid, method: 'PUT', data: {listed: false}});
        location.reload();
      }else{
        $.ajax({url: '/items/list/'+mrowid, method: 'PUT', data: {listed: true}});
        location.reload();
      }
  });

  $('#updateItem').on('click', '.updateItem', function(e){
    $.ajax({url: '/items/'+mrowid, method: 'PUT', data: {name: $('input#mname').val(), description: $('input#mdescription').val(), picurl: $('input#mpicurl').val()}});
    $('input').val('');
    // if($(this).prop("checked") == true){
    //             alert("Checkbox is checked.");
    //         }
    //         else if($(this).prop("checked") == false){
    //             alert("Checkbox is unchecked.");
    //         }
  });

  $('#inventorytable').on('click', '.removeitem',function(e){
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
          var $remove = $('<button>').addClass('btn btn-warning removeitem btn-sm').append('Remove');
          var $update = $('<button>').addClass('btn btn-info update btn-sm').append('Update');
          var $list = $('<button>').addClass('btn btn-success list btn-sm').append(input.isAvailable ? 'Unlist' : 'List');
          var $tr = $('#templateinventory').clone().attr('id', 'item'+index).data('id', input._id).addClass(input.isAvailable ? 'listed' : 'notlisted');
          $tr.find('.name').text(input.name);
          $tr.find('.description').text(input.description);
          var $img = $('<img>').attr('src', input.picurl).addClass('thumb');
          $tr.find('.picurl').append($img);
          $tr.find('.remove').append($remove,$update,$list);
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
