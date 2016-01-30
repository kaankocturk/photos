'use strict';
$(document).ready(init);

function init(){
  var ref = new Firebase('https://loginz.firebaseio.com/');
  ref.set('whoa!');
  if(document.cookie){
    $('.loginli, .regli').css('visibility', 'hidden');
  }else{
    $('.loginli, .regli').css('visibility', 'visible');
    $('.logoutli').css('visibility', 'hidden');
  }
}
