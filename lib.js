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

export function upperCaseFirst(text) {
  return text[0].toUpperCase() + text.substring(1);
}

export function getPageFragment() {
  return window.location.hash.substring(1);
}

export function setPageFragment(fragment) {
  window.location.hash = '#' + fragment;
}

export function setPageTitle(title) {
  document.getElementsByTagName('title')[0].innerHTML = title;
}

export function createElementWithAttributes(elementName, attributes) {
  const resultElement = document.createElement(elementName);
  for (const name in attributes) {
    resultElement[name] = attributes[name];
  }
  return resultElement;
}

export function clickNavItem(fragment) {
  const linkId = 'nav-link-' + fragment;
  document.getElementById(linkId).click();
}

export function delay(ms) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}

const pageScripts = { };

export function registerPageScript(page, handler) {
  pageScripts[page] = () => delay().then(handler);
  pageScripts[page]();
}

export function getPageScript(page) {
  return pageScripts[page];
}
