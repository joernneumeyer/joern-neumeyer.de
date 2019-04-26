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
  pages.forEach(function(page) {
    var pageParts = page.split(' ');
    var anchor = document.createElement('a');
    anchor.innerText = pageParts.map(upperCaseFirst).join('');
    var listItem = document.createElement('li');
    listItem.appendChild(anchor);
    listItem.classname += 'badge';
    headerList.appendChild(listItem);
  });
})();
