$(document).ready(init);
var domstuff;
function init(){
  $('tbody').on('click', '.trade',function(e){
    var $row = $(this).closest('tr');
    var rowid = $row.data('id');
    console.log(window.location.pathname.split('/')[2]);
    console.log(rowid);
    $.post('/trades', {askeeitem:window.location.pathname.split('/')[2], askeritem: rowid, status: 'pending'})
    .success(function(data){console.log(data);})
    .fail(function(err) {
      console.error(err);
    });
  });

  $.get('/items/my')
    .success(function(data){
      console.log(data);
      if(data.length>0){
        console.log(data);
      domstuff = data.map(function(input,index){
          if(input.isAvailable){
          var $trade = $('<button>').addClass('btn btn-success trade btn-sm').append('Offer for trade');
          var $tr = $('#templatetradables').clone().attr('id', 'item'+index).data('id', input._id);
          $tr.find('.name').text(input.name);
          $tr.find('.description').text(input.description);
          var $img = $('<img>').attr('src', input.picurl).addClass('thumb');
          $tr.find('.picurl').append($img);
          $tr.find('.remove').append($trade);
          return $tr;
        }});
        console.log(domstuff);
      $('#privatetradables').append(domstuff);
      }
    })
    .fail(function(err) {
      console.error(err);
    });
}
