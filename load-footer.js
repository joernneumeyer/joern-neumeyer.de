(function() {
  var footerElement = document.getElementsByTagName('footer')[0];
  fetch('footer.html').then(function(response) {
    return response.text();
  }).then((html) => {
    footerElement.innerHTML = html;
  });
})();
