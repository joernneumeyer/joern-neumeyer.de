#!/bin/bash
: <<'BLOCK_COMMENT'
  Copyright (C) 2019 Jörn Neumeyer

  This file is part of joern-neumeyer.de.

  joern-neumeyer.de is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  joern-neumeyer.de is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with joern-neumeyer.de. If not, see <https://www.gnu.org/licenses/>.
BLOCK_COMMENT

set -e

build-article() {
  article=$1
  cd articles/${article}
  if [[ -f ${article}.tex ]]
  then
    if [[ ${article}.tex -ot ${article}.pdf ]]
    then
      return
    fi
  fi
  latex ${article}.tex && dvips ${article}.dvi -Ppdf && ps2pdf ${article}.ps
  remove_list=$(echo "${article}.aux ${article}.dvi ${article}.log ${article}.ps ${article}.toc ${article}.out ${article}.out ${article}.synctex.gz texput.log")
  for item in ${remove_list}
  do
    if [[ -f ${item} ]]
    then
      rm ${item}
    fi
  done
  if [[ -f bundle-article.sh ]]
  then
    ./bundle-article.sh
  fi
  echo "{\"build_time\":\"$(date --iso-8601=seconds)\"}" > build-info.json
}

ARTICLES=$(ls articles | grep -E '^[^.]+$')

for ARTICLE in ${ARTICLES}
do
  build-article ${ARTICLE}
done
