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

import {
  createElementWithAttributes,
  getPageFragment,
  getPageScript,
  registerPageScript,
  setPageFragment,
  setPageTitle
} from '/lib.js';

document.addEventListener('DOMContentLoaded', () => {
  const headerList = document.getElementById('header-list');
  const mainElement = document.getElementsByTagName('main')[0];
  let initialLoad = true;

  const htmlCache = {};

  const clickHandlerFactory = page => function () {
    if (page.code === getPageFragment() && !initialLoad) return;
    document.getElementById('nav-link-' + getPageFragment()).classList.remove('is-selected');
    document.getElementById('nav-link-' + page.code).classList.add('is-selected');
    setPageFragment(page.code);
    setPageTitle(this.innerText + ' - J&ouml;rn Neumeyer');
    const pageUrl = 'pages/' + page.code + '.html';
    (
      htmlCache.hasOwnProperty(pageUrl)
        ? Promise.resolve(htmlCache[pageUrl])
        : fetch(pageUrl)
    )
      .then((response) => typeof response === 'string' ? response : response.text())
      .then((html) => {
        if (!htmlCache.hasOwnProperty(pageUrl)) {
          htmlCache[pageUrl] = html;
        }
        mainElement.innerHTML = html;
        const scriptHandler = getPageScript(page.code);
        if (scriptHandler) {
          scriptHandler();
          return;
        }
        const scriptUrl = 'pages/' + page.code + '.js';
        fetch(scriptUrl)
          .then(response => {
            if (response.status !== 200) {
              registerPageScript(page.code, () => { });
              return;
            }
            const pageScript = createElementWithAttributes('script', {
              type: 'module',
              src: scriptUrl
            });
            mainElement.appendChild(pageScript);
          }).catch(() => { });
      });
  };

  function mapPageInfoToLink(page) {
    const anchor = document.createElement('a');
    anchor.innerText = page.title;
    anchor.classList.add('tabs-item');
    anchor.classList.add('clickable');
    anchor.id = 'nav-link-' + page.code;
    anchor.addEventListener('click', clickHandlerFactory(page));
    return anchor;
  };

  fetch('/pages/pages.json')
    .then(response => response.json())
    .then(pages => {
      pages
        .map(mapPageInfoToLink)
        .forEach(function (link, i) {
          /* var linkWrapper = createElementWithAttributes('div', {
            className: 'col'
          });
          linkWrapper.appendChild(link); */
          headerList.appendChild(link);
        });

      setPageFragment(getPageFragment() || 'home');

      const linkId = 'nav-link-' + (getPageFragment() || 'home');
      document.getElementById(linkId).click();
      initialLoad = false;
    });
});
