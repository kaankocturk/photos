'use strict';

var $email, $password;

$(function() {
  $email = $('#email');
  $password = $('#password');
  $('.btn-primary').click(reset);
  $('form').on('submit', loginUser);
});

function reset(){
  $.post('/users/reset', {email: $email.val()}).success(function(data) {
    location.href = '/';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });
}

function loginUser(e) {
  e.preventDefault();

  var email = $email.val();
  var password = $password.val();

  $.post('/users/login', {email: email, password: password})
  .success(function(data) {
    location.href = '/';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });
}
