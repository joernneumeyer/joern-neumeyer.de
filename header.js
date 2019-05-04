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

document.addEventListener('DOMContentLoaded', function(){
  var headerList = document.getElementById('header-list');
  var pages = ['home', 'articles', 'contact', 'copyright'];
  var mainElement = document.getElementsByTagName('main')[0];
  var initialLoad = true;

  var clickHandlerFactory = function(page) {
    return function() {
      if (page === getPageFragment() && !initialLoad) return;
      document.getElementById('nav-link-' + getPageFragment()).classList.remove('is-selected');
      document.getElementById('nav-link-' + page).classList.add('is-selected');
      setPageFragment(page);
      setPageTitle(this.innerText + ' - J&ouml;rn Neumeyer');
      fetch('pages/' + page + '.html').then(function(response) {
        return response.text();
      }).then(function(html) {
        mainElement.innerHTML = html;
        fetch('pages/' + page + '.js').then(function(response) {
          if (response.status === 404) {
            throw undefined;
          }
          return response.text();
        }).then(eval).catch(function(error){
          if (error === undefined) {
            console.info('did not find a script for page ' + page);
          } else {
            console.error('Error while loading script for "' + page + '"');
            throw error;
          }
        });
      });
    };
  };

  var mapPageTitleToLink = function(page) {
    var pageParts = page.split('-');
    var anchor = document.createElement('a');
    anchor.innerText = pageParts.map(upperCaseFirst).join('');
    anchor.classList.add('tabs-item');
    anchor.classList.add('clickable');
    anchor.classList.add('col');
    anchor.id = 'nav-link-' + page;
    anchor.addEventListener('click', clickHandlerFactory(page));
    return anchor;
  };

  var makeSpacingSpan = function() {
    var span = document.createElement('span');
    span.innerHTML = '&nbsp;';
    return span;
  };

  pages
    .map(mapPageTitleToLink)
    .forEach(function(link, i) {
      headerList.appendChild(link);
      if (i < pages.length - 1) {
        headerList.appendChild(makeSpacingSpan());
      }
    });

  setPageFragment(getPageFragment() || 'home');

  var linkId = 'nav-link-' + (getPageFragment() || 'home');
  document.getElementById(linkId).click();
  initialLoad = false;
});
