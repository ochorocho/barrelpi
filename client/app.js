
$(document).foundation();
$(document).ready(function() {
  $('#timespan a').click(function() {
    $('#timespan a').removeClass('active');
    $(this).addClass('active');
  });
});
