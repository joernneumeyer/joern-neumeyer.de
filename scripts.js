(function() {
  var footerElement = document.getElementsByTagName('footer')[0];
  fetch('footer.html').then(function(response) {
    return response.text();
  }).then((html) => {
    footerElement.innerHTML = html;
  });

  var headerElement = document.getElementsByTagName('header')[0];
  fetch('header.html').then(function(response) {
    return response.text();
  }).then((html) => {
    headerElement.innerHTML = html;
  });
})();
