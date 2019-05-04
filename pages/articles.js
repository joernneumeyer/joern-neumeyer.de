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
  setPageTitle('Articles - Jörn Neumeyer');

  var articlesList = document.getElementById('articles-list');

  var articles = [
    {
      title: 'How to compile Objective-C code on GNU/Linux based operating systems with GNUstep',
      code: 'objective-c-gnu-linux',
      description: 'Did you ever want to play around with Objective-C but didn\'t how without a Mac? In this article I explain how I got Objective-C running on my machine using GNUstep.'
    }
  ];

  var renderArticle = function(article) {
    var articleElement = document.createElement('li');

    var articleHeading = document.createElement('h3');
    articleHeading.innerText = article.title;

    var articleDescription = document.createElement('p');
    articleDescription.innerText = article.description;

    articleElement.appendChild(articleHeading);
    articleElement.appendChild(articleDescription);

    return articleElement;
  }

  articles.forEach(function(article, i) {
    var renderedArticle = renderArticle(article);
    articlesList.appendChild(renderedArticle);
  });
})();
