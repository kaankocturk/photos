'use strict';
$(document).ready(init);

function init(){
  var ref = new Firebase('https://sharealbums.firebaseio.com/');
  if(document.cookie){
    $('.loginli, .regli').css('visibility', 'hidden');
    $('.logoutli, .changeli').css('visibility', 'visible');
  }else{
    $('.loginli, .regli').css('visibility', 'visible');
    $('.logoutli, .changeli').css('visibility', 'hidden');
  }
}
