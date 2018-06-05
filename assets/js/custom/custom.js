var getParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};



function inputsMustBePresent(selector, buttonSelector) {
  $('body').on('keyup change', selector, function() {
    var allComplete =
      $(selector).toArray().every(function(input) {
        if ($(input).attr('type') == 'radio') {
          var inputName = $(input).attr('name');
          return $("[name='" + inputName + "']:checked").length > 0;
        } else {
          return !!$(input).val();
        }

      });
    debugger
    if (allComplete) {
      $(buttonSelector).prop('disabled', false);
    } else {
      $(buttonSelector).prop('disabled', true);
    }
  });
}

$(document).ready(function(){
  $('.information-icon').popover();
});