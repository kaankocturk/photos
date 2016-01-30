'use strict';

var $email, $newpassword, $oldpassword;

$(function() {
  $('.loginli, .regli, .logoutli').css('visibility', 'hidden');
  $email = $('#email');
  $oldpassword = $('#old');
  $newpassword = $('#new');
  $('form').on('submit', changepw);
});

function changepw(e) {
  e.preventDefault();
  var email = $email.val();
  var oldpassword = $oldpassword.val();
  var newpassword = $newpassword.val();
  $.post('/users/changepw', {email: email, oldPassword: oldpassword, newPassword: newpassword})
  .success(function(data) {
    location.href = '/';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });
}
