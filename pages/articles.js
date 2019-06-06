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

import { createElementWithAttributes, registerPageScript } from '../lib.js';

function renderArticle(article) {
  const articleElement = document.createElement('div');
  articleElement.classList.add('row');

  const articleTexts = document.createElement('div');
  articleTexts.classList.add('col-sm-12');
  // articleTexts.classList.add('col-sm-9');

  const articleHeading = createElementWithAttributes('p', {
    innerText: article.title,
    className: 'section-heading row col'
  });

  const articleDescription = createElementWithAttributes('p', {
    innerText: article.description,
    className: 'row col'
  });

  const downloadLinks = createElementWithAttributes('span', {
    innerHTML: 'Download links:&nbsp;',
    className: 'row col',
  });

  const articleDownloadTex = createElementWithAttributes('a', {
    target: '_blank',
    rel: 'noreferrer',
    innerText: 'Download LaTeX Source',
    href: '/articles/' + article.code + '/' + article.code + '.tex',
    className: 'button button--primary button--small',
  });

  const articleDownloadPdf = createElementWithAttributes('a', {
    target: '_blank',
    rel: 'noreferrer',
    innerText: 'Download PDF',
    href: '/articles/' + article.code + '/' + article.code + '.pdf',
    className: 'button button--primary button--small',
  });

  downloadLinks.appendChild(articleDownloadPdf);
  downloadLinks.appendChild(articleDownloadTex);

  if (article.bundle_available) {
    const articleDownloadZip = createElementWithAttributes('a', {
      target: '_blank',
      rel: 'noreferrer',
      innerText: 'Download Article ZIP bundle',
      href: '/articles/' + article.code + '/' + article.code + '.zip',
      className: 'button button--primary button--small',
    });
    downloadLinks.appendChild(articleDownloadZip);
  }

  const lastBuild = createElementWithAttributes('span', {
    innerHTML: 'Last build: ' + article.buildInfo.build_time.toLocaleDateString() + ' ' + article.buildInfo.build_time.toLocaleTimeString()
  });

  articleTexts.appendChild(articleHeading);
  articleTexts.appendChild(articleDescription);
  articleTexts.appendChild(downloadLinks);
  articleTexts.appendChild(lastBuild);

  articleElement.appendChild(articleTexts);

  return articleElement;
}

const articlesPromise = fetch('/articles/articles.json')
  .then(response => response.json())
  .then(articles => Promise.all(
    articles.map(article => fetch('/articles/' + article.code + '/build-info.json')
      .then(response => response.json())
      .then(buildInfo => {
        buildInfo.build_time = new Date(buildInfo.build_time);
        article.buildInfo = buildInfo;
        return article;
      })
    )
  ));

function loadAndRenderArticles() {
  const articlesList = document.getElementById('articles-list');
  articlesPromise.then(articles => articles.forEach((article, i) => {
    const renderedArticle = renderArticle(article);
    articlesList.appendChild(renderedArticle);
    if (i < articles.length - 1) {
      const hr = document.createElement('hr');
      articlesList.appendChild(hr);
    }
  }))
    .catch(e => {
      console.error(e);
      const errorElement = createElementWithAttributes('p', {
        innerHTML: 'Could not load any articles. Perhaps the server is down?'
      });
      articlesList.appendChild(errorElement);
    });
}

registerPageScript('articles', loadAndRenderArticles);
