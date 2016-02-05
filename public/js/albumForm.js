
'use strict';

$(document).ready(init);
var id = 0;
var items = [];
function init(e){
    $('.addAlbum').on('click', handleEntry);
}

function handleEntry(e){
  e.preventDefault();
  $.post('/albums', {name: $('input#name').val(), description: $('input#description').val()})
  .success(function(data){
    console.log(data);
  }).fail(function(error){
    console.log('we failed you bruh');
  });
  $('input').val('');
}
