(function() {
  var headerElement = document.getElementsByTagName('header')[0];
  fetch('header.html').then(function(response) {
    return response.text();
  }).then((html) => {
    headerElement.innerHTML = html;
  });
})();
