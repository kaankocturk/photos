$(document).ready(init);
var $mrow;
var mrowid;
var total = 0;
var domstuff;
var itemcount = 0;
var namesorted = false;
var descsorted = false;

function init(){
  $('tbody').on('click', '.offer',function(e){
    var $row = $(this).closest('tr');
    var rowid = $row.data('id');
    location.replace('/items/'+rowid);
  });

  $.get('/items')
  .success(function(data){
    console.log(data);
    if(data.length){
      console.log(data);
      domstuff = data.map(function(input,index){
        itemcount++;
        console.log(input);
        var $offer = $('<button>').addClass('btn btn-warning offer btn-sm').append('Details');
        var $tr = $('#templatemarket').clone().attr('id', 'item'+index).data('id', input._id);
        $tr.find('.name').text(input.name);
        $tr.find('.description').text(input.description);
        var $img = $('<img>').attr('src', input.picurl).addClass('thumb');
        $tr.find('.picurl').append($img);
        $tr.find('.remove').append($offer);
        return $tr;
      });
      console.log(domstuff);
      $('#market').append(domstuff);
    }
  })
  .fail(function(err) {
    console.error(err);
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
