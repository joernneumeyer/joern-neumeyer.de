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

build-article() {
  cd articles
  latex $1.tex && dvips $1.dvi -Ppdf && ps2pdf $1.ps
  rm $1.aux $1.dvi $1.log $1.ps
}

ARTICLES=$(ls articles | grep .tex)
ARTICLES=${ARTICLES::-4}

for ARTICLE in ${ARTICLES}
do
  build-article ${ARTICLE}
done
