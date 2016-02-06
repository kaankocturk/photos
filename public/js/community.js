$(document).ready(init);
var $mrow;
var mrowid;
var total = 0;
var domstuff;
var itemcount = 0;
var albumpreview;
var namesorted = false;
var descsorted = false;
var covers = [];

function init(){
  $('tbody').on('click', '.view',function(e){
    e.stopPropagation();
    var $row = $(this).closest('tr');
    var rowid = $row.data('id');
    $.get('/albums/images/'+rowid)
      .success(function(data){
        console.log(data);
        if(data.length>0){
          console.log(data);
        albumpreview = data.map(function(input){
            return $('<img>').attr('src', input.picurl).addClass('regular').attr('id', input._id);
          });
        $('#view').append(albumpreview);
        }
      })
      .fail(function(err) {
        console.error(err);
      });
  });

  $.get('/albums')
  .success(function(data){
    console.log(data);
    if(data.length){
      console.log(data);
      domstuff = data.map(function(input,index){
        var $view = $('<button>').addClass('btn btn-warning view btn-sm').append('View');
        var $tr = $('#templatemarket').clone().attr('id', 'album'+index).data('id', input._id);
        $tr.find('.name').text(input.name);
        $tr.find('.description').text(input.description);
        $tr.find('.remove').append($view);
        covers.push($('<img>').attr('src', input.pictures[0].picurl).addClass('preview'));
        itemcount++;
        return $tr;
      });
      console.log(domstuff);
      $('#market').append(domstuff);
    }
  })
  .fail(function(err) {
    console.error(err);
  });

  $('tbody').on('mouseenter', 'td',function(e){
    var $row = $(this).closest('tr');
    var coverid = parseInt($row.attr('id').substr(5));
    $('.preview').append(covers[coverid]);
  });

  $('tbody').on('mouseleave', 'td',function(e){
    $('.preview img').detach();
  });


  $('th#names').on('click', function(){
    var arrofnames = [];
    var arrofsorted =[];
    for(var i =0; i<itemcount; i++){
      arrofnames.push($('tr#item'+i+' .name').text().toLowerCase()+i);
    }
    console.log(arrofnames);
    arrofnames.sort();
    if(!namesorted){
      for(var r=0; r<arrofnames.length;r++){
        var hey = (arrofnames[r].charAt(arrofnames[r].length-1));
        arrofsorted.push($('tr#item'+hey));
        namesorted=true;
      }
    }
    else{
      for(var r=arrofnames.length-1; r>=0 ;r--){
        var hey = (arrofnames[r].charAt(arrofnames[r].length-1));
        arrofsorted.push($('tr#item'+hey));
        namesorted=false;
      }
    }
    $('tbody tr').detach();
    $('tbody').append(arrofsorted);
  });

  $('th#description').on('click', function(){
    var arrofdescriptions = [];
    var arrofsorted =[];
    for(var i =0; i<itemcount; i++){
      arrofdescriptions.push($('tr#item'+i+' .description').text().toLowerCase()+i);
    }
    console.log(arrofdescriptions);
    arrofdescriptions.sort();
    if(!descsorted){
      for(var r=0; r<arrofdescriptions.length;r++){
        var hey = (arrofdescriptions[r].charAt(arrofdescriptions[r].length-1));
        arrofsorted.push($('tr#item'+hey));
        descsorted=true;
      }
    }
    else{
      for(var r=arrofdescriptions.length-1; r>=0 ;r--){
        var hey = (arrofdescriptions[r].charAt(arrofdescriptions[r].length-1));
        arrofsorted.push($('tr#item'+hey));
        descsorted=false;
      }
    }
    $('tbody tr').detach();
    $('tbody').append(arrofsorted);
  });

  $('.filter').click(function(e){
    $('#filterList').modal('show');
  });

  $('.reset').click(function(e){
    $('tbody tr').detach();
    $('tbody').append(domstuff);
  });

  $('#filterList').on('click', '.filterList', function(e){
    e.preventDefault();
    var newdom = [];
    if($('input#m2name').val()){
      for(var i = 0 ; i< domstuff.length; i++){
        if($(domstuff[i][0]).find('.name').text()===$('input#m2name').val()){
          newdom.push(domstuff[i][0]);
        }
      }
    }
    console.log(domstuff);
    console.log(newdom);
    $('tbody tr').detach();
    $('input').val('');
    $('tbody').append(newdom);
    $('#filterList').modal('toggle');
  });

}
