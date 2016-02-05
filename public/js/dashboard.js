var domstuff;
$(document).ready(init);

function init(){
  $('#albumstable').on('click', '.update',function(e){
      e.stopPropagation();
      $mrow = $(this).closest('tr');
      mrowid = $mrow.data('id');
      console.log(mrowid);
      $('#updatealbum').modal();
  });

  $('tbody').on('click', '.showalbum',function(e){
    var $row = $(this).closest('tr');
    var rowid = $row.data('id');
    location.replace('/albums/'+rowid);
  });

  // $('#albumstable').on('click', '.share',function(e){
  //     e.stopPropagation();
  //     $mrow = $(this).closest('tr');
  //     mrowid = $mrow.data('id');
  //     if($mrow.hasClass('shared')){
  //       $.ajax({url: '/albums/share/'+mrowid, method: 'PUT', data: {shared: false}});
  //       location.reload();
  //     }else{
  //       $.ajax({url: '/albums/share/'+mrowid, method: 'PUT', data: {shared: true}});
  //       location.reload();
  //     }
  // });

  $('#updatealbum').on('click', '.updatealbum', function(e){
    $.ajax({url: '/albums/'+mrowid, method: 'PUT', data: {name: $('input#mname').val(), description: $('input#mdescription').val()}});
    $('input').val('');
  });

  $('#albumstable').on('click', '.removealbum',function(e){
    e.stopPropagation();
    var $row = $(this).closest('tr');
    console.log($row.data('id'));
    $.ajax({url:'/albums/'+$row.data('id'), method: 'DELETE'}).success(function(data){
    console.log('data:', data);
    location.reload();
    })
    .fail(function(err) {
    console.log('err:', err);
    });
  });

  $.get('/albums/my')
    .success(function(data){
      console.log(data);
      if(data.length>0){
        console.log(data);
      domstuff = data.map(function(input,index){
          console.log(input);
          var $remove = $('<button>').addClass('btn btn-danger removealbum btn-sm').append('Remove');
          var $show = $('<button>').addClass('btn btn-warning showalbum btn-sm').append('Show');
          var $update = $('<button>').addClass('btn btn-info update btn-sm').append('Update');
          var $share = $('<button>').addClass('btn btn-success share btn-sm').append(input.isAvailable ? 'Unshare' : 'Share');
          var $tr = $('#templatealbums').clone().attr('id', 'album'+index).data('id', input._id).addClass(input.isAvailable ? 'shared' : 'notshared');
          $tr.find('.name').text(input.name);
          $tr.find('.description').text(input.description);
          $tr.find('.remove').append($remove,$update,$share,$show);
          return $tr;
        });
        console.log(domstuff);
      $('#albumstable').append(domstuff);
      }
    })
    .fail(function(err) {
      console.error(err);
    });

}
