/**
 * Copyright (C) 2019 Jörn Neumeyer
 *
 * This file is part of joern-neumeyer.de.
 *
 * joern-neumeyer.de is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * joern-neumeyer.de is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with joern-neumeyer.de. If not, see <https://www.gnu.org/licenses/>.
*/

(function(){
  var headerList = document.getElementById('header-list');
  var pages = ['home'];
  var mainElement = document.getElementsByTagName('main')[0];
  var currentPage = '';

  var clickHandlerFactory = function(page) {
    return function() {
      if (page === currentPage) return;
      currentPage = page;
      fetch(page + '.html').then(function(response) {
        return response.text();
      }).then(function(html) {
        mainElement.innerHTML = html;
        fetch(page + '.js').then(function(response) {
          return response.text();
        }).then(eval).catch(function(){
          console.info('did not find a script for page ' + page);
        });
      });
    };
  };

  pages.forEach(function(page) {
    var pageParts = page.split('-');
    var span = document.createElement('span');
    span.innerText = pageParts.map(upperCaseFirst).join('');
    var listItem = document.createElement('li');
    listItem.appendChild(span);
    listItem.className += 'badge clickable';
    listItem.id = 'nav-link-' + page;
    listItem.addEventListener('click', clickHandlerFactory(page));
    headerList.appendChild(listItem);
  });
})();
