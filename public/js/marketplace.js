$(document).ready(init);
var $mrow;
var mrowid;
var total = 0;
var domstuff;
var itemcount;
var namesorted = false;
var pricesorted = false;

function init(){
  $('tbody').on('click', '.offer',function(e){
    var $row = $(this).closest('tr');
    var rowid = $row.data('id');
    location.replace('/items/'+rowid);
  });
  //
  // $('th#names').on('click', function(){ //displays contacts alphabetically
  //   var arrofnames = [];
  //   var arrofsorted =[];
  //   for(var i =0; i<itemcount; i++){
  //     arrofnames.push($('tr#item'+i+' .name').text()+i);
  //   }
  //   console.log(arrofnames);
  //   arrofnames.sort();
  //   if(!namesorted){
  //     for(var r=0; r<arrofnames.length;r++){
  //         var hey = (arrofnames[r].charAt(arrofnames[r].length-1));
  //         arrofsorted.push($('tr#item'+hey));
  //         namesorted=true;
  //     }
  //   }
  //   else{
  //     for(var r=arrofnames.length-1; r>=0 ;r--){
  //         var hey = (arrofnames[r].charAt(arrofnames[r].length-1));
  //         arrofsorted.push($('tr#item'+hey));
  //         namesorted=false;
  //     }
  //   }
  //   $('tbody tr').detach();
  //   $('tbody').append(arrofsorted);
  // });
  //
  // $('th#prices').on('click', function(){ //displays contacts alphabetically
  //   var arrofprices = [];
  //   var arrofsorted =[];
  //   for(var i =0; i<itemcount; i++){
  //     arrofprices.push({val: parseInt($('tr#item'+i+' .price').text().substr(1)), index:i});
  //   }
  //   arrofprices.sort(function(a, b) {
  //       var x = a.val; var y = b.val;
  //       return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  //   });
  //   if(!pricesorted){
  //     for(var r=0; r<arrofprices.length;r++){
  //         var hey = (arrofprices[r].index);
  //         arrofsorted.push($('tr#item'+hey));
  //         pricesorted=true;
  //     }
  //   }
  //   else{
  //     for(var r=arrofprices.length-1; r>=0 ;r--){
  //         var hey = (arrofprices[r].index);
  //         arrofsorted.push($('tr#item'+hey));
  //         pricesorted=false;
  //     }
  //   }
  //   $('tbody tr').detach();
  //   $('tbody').append(arrofsorted);
  // });
  //
  // $('.filter').click(function(e){
  //   $('#filterList').modal('show');
  // });
  //
  // $('.reset').click(function(e){
  //   $('tbody tr').detach();
  //   $('tbody').append(domstuff);
  //   $('.total').text('$'+total.toFixed(2));
  // });
  //
  // $('#filterList').on('click', '.filterList', function(e){
  //   e.preventDefault();
  //   var newdom = [];
  //   var newtotal = 0;
  //   if($('input#m2name').val()){
  //     for(var i = 0 ; i< domstuff.length; i++){
  //       if($(domstuff[i][0]).find('.name').text()===$('input#m2name').val()){
  //         newdom.push(domstuff[i][0]);
  //         newtotal+= parseInt($(domstuff[i][0]).find('.price').text().substr(1));
  //       }
  //     }
  //   }
  //   else{
  //     var ifcon;
  //     var condition= $($(":checked")[0]).attr('id');
  //     console.log(condition);
  //     switch(condition){
  //       case 'greater':
  //         for(var i = 0 ; i< domstuff.length; i++){
  //           if(ifcon = (parseInt($(domstuff[i][0]).find('.price').text().substr(1))>$('input#m2price').val())){
  //             newdom.push(domstuff[i][0]);
  //             newtotal+= parseInt($(domstuff[i][0]).find('.price').text().substr(1));
  //           }
  //         }
  //         break;
  //       case 'less':
  //         for(var i = 0 ; i< domstuff.length; i++){
  //           if(ifcon = (parseInt($(domstuff[i][0]).find('.price').text().substr(1))<$('input#m2price').val())){
  //             newdom.push(domstuff[i][0]);
  //             newtotal+= parseInt($(domstuff[i][0]).find('.price').text().substr(1));
  //           }
  //         }
  //         break;
  //       case 'equal':
  //         for(var i = 0 ; i< domstuff.length; i++){
  //           if(ifcon = (parseInt($(domstuff[i][0]).find('.price').text().substr(1))===$('input#m2price').val())){
  //             newdom.push(domstuff[i][0]);
  //             newtotal+= parseInt($(domstuff[i][0]).find('.price').text().substr(1));
  //           }
  //         }
  //         break;
  //     }
  //   }
  //   console.log(domstuff);
  //   console.log(newdom);
  //   $('tbody tr').detach();
  //   $('input').val('');
  //   $('tbody').append(newdom);
  //   $('.total').text('$'+newtotal.toFixed(2));
  // });

  $.get('/items')
    .success(function(data){
      console.log(data);
      if(data.length){
        console.log(data);
      domstuff = data.map(function(input,index){
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
}
