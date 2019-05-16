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

FORCE_BUILD=0
if [[ $1 ]]
then
  FORCE_BUILD=1
fi

build-article() {
  article=$1
  if [[ ${FORCE_BUILD} == 0 ]]
  then
    if [[ ${article}.tex -ot ${article}.pdf ]]
    then
      return
    fi
  fi
  pdflatex ${article}.tex
  pdflatex ${article}.tex
  if [[ -f bundle-article.sh ]]
  then
    ./bundle-article.sh
  fi
  echo "{\"build_time\":\"$(date --iso-8601=seconds)\"}" > build-info.json
}

# clean-article() {
#   article=$1
#   remove_list=$(echo "${article}.aux ${article}.dvi ${article}.log ${article}.ps ${article}.toc ${article}.out ${article}.out ${article}.synctex.gz ${article}.aux ${article}.log ${article}.snm ${article}.nav texput.log")
#   for item in ${remove_list}
#   do
#     if [[ -f ${item} ]]
#     then
#       rm ${item}
#     fi
#   done
# }

ARTICLES=$(ls articles | grep -E '^[^.]+$')
SLIDES=$(ls slides | grep -E '^[^.]+$')

cd articles
for ARTICLE in ${ARTICLES}
do
  cd ${ARTICLE}
  build-article ${ARTICLE}
  cd ..
done

cd ../slides
for SLIDE in ${SLIDES}
do
  cd ${SLIDE}
  build-article ${SLIDE}
  cd ..
done
