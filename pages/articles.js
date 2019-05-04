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

  var articles = [
    {
      title: 'How to compile Objective-C code on GNU/Linux based operating systems with GNUstep',
      code: 'objective-c-gnu-linux',
      description: 'Did you ever want to play around with Objective-C but didn\'t how without a Mac? In this article I explain how I got Objective-C running on my machine using GNUstep.',
      related_files: ['main.m', 'Foo.h', 'Foo.m', 'Makefile', 'build.sh']
    }
  ];

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

    var otherArticleFiles = createElementWithAttributes('span', {
      innerHTML: 'Other article files:&nbsp;',
      className: 'row col',
    });

    article.related_files.forEach(function(file) {
      otherArticleFiles.appendChild(createElementWithAttributes('a', {
        target: '_blank',
        rel: 'noreferrer',
        innerText: file,
        href: '/articles/' + article.code + '/' + file,
        className: 'button button--primary button--small',
      }));
    });

    downloadLinks.appendChild(articleDownloadTex);
    downloadLinks.appendChild(articleDownloadPdf);

    articleTexts.appendChild(articleHeading);
    articleTexts.appendChild(articleDescription);
    articleTexts.appendChild(downloadLinks);
    if (article.related_files.length) {
      articleTexts.appendChild(otherArticleFiles);
    }

    articleElement.appendChild(thumbnailContainer);
    articleElement.appendChild(articleTexts);

    return articleElement;
  }

  articles.forEach(function(article, i) {
    var renderedArticle = renderArticle(article);
    articlesList.appendChild(renderedArticle);
  });
})();
