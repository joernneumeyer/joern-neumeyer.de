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
  var articlesList = document.getElementById('articles-list');

  var renderArticle = function(article) {
    var articleElement = document.createElement('div');
    articleElement.classList.add('row');

    var thumbnail = document.createElement('img');
    thumbnail.alt = article.code;
    thumbnail.src = 'articles/' + article.code + '/thumb.svg';

    var thumbnailContainer = document.createElement('div');
    thumbnailContainer.classList.add('col-sm-3');
    thumbnailContainer.appendChild(thumbnail);

    var articleTexts = document.createElement('div');
    articleTexts.classList.add('col-sm-9');

    var articleHeading = createElementWithAttributes('p', {
      innerText: article.title,
      className: 'section-heading row col'
    });

    var articleDescription = createElementWithAttributes('p', {
      innerText: article.description,
      className: 'row col'
    });

    var downloadLinks = createElementWithAttributes('span', {
      innerHTML: 'Download links:&nbsp;',
      className: 'row col',
    });

    var articleDownloadTex = createElementWithAttributes('a', {
      target: '_blank',
      rel: 'noreferrer',
      innerText: 'Download LaTeX Source',
      href: '/articles/' + article.code + '/' + article.code + '.tex',
      className: 'button button--primary button--small',
    });

    var articleDownloadPdf = createElementWithAttributes('a', {
      target: '_blank',
      rel: 'noreferrer',
      innerText: 'Download PDF',
      href: '/articles/' + article.code + '/' + article.code + '.pdf',
      className: 'button button--primary button--small',
    });

    downloadLinks.appendChild(articleDownloadPdf);
    downloadLinks.appendChild(articleDownloadTex);

    if (article.bundle_available) {
      var articleDownloadZip = createElementWithAttributes('a', {
        target: '_blank',
        rel: 'noreferrer',
        innerText: 'Download Article ZIP bundle',
        href: '/articles/' + article.code + '/' + article.code + '.zip',
        className: 'button button--primary button--small',
      });
      downloadLinks.appendChild(articleDownloadZip);
    }

    var lastBuild = createElementWithAttributes('span', {
      innerHTML: 'Last build: ' + article.buildInfo.build_time.toLocaleDateString() + ' ' + article.buildInfo.build_time.toLocaleTimeString()
    });

    articleTexts.appendChild(articleHeading);
    articleTexts.appendChild(articleDescription);
    articleTexts.appendChild(downloadLinks);
    articleTexts.appendChild(lastBuild);

    articleElement.appendChild(thumbnailContainer);
    articleElement.appendChild(articleTexts);

    return articleElement;
  }

  fetch('/articles/articles.json')
    .then(function(response){
      return response.json();
    })
    .then(function(articles) {
      return Promise.all(
        articles.map(function(article) {
          return fetch('/articles/' + article.code + '/build-info.json')
          .then(function(response) {
            return response.json();
          })
          .then(function(buildInfo) {
            buildInfo.build_time = new Date(buildInfo.build_time);
            article.buildInfo = buildInfo;
            return article;
          });
        }
      ))
    })
    .then(function(articles) {
      console.log(articles);
      articles.forEach(function(article, i) {
        var renderedArticle = renderArticle(article);
        articlesList.appendChild(renderedArticle);
      });
    })
    .catch(function() {
      var errorElemenr = createElementWithAttributes('p', {
        innerHTML: 'Could not load any articles. Perhaps the server wen down?'
      });

      articlesList.appendChild(errorElemenr);
    });
})();
