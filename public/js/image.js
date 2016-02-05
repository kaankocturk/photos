
$(document).ready(init);

function init(){
$('.remove').on('click',function(e){
  $.ajax({url:'/items/'+window.location.pathname.split('/')[2], method: 'DELETE'}).success(function(data){
  console.log('data:', data);
  location.replace('/');
  })
  .fail(function(err) {
  console.log('err:', err);
  });
});

}
