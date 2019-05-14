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

if [[ -f c-pointer-arithmetic.zip ]]
then
  rm c-pointer-arithmetic.zip
fi

zip c-pointer-arithmetic.zip \
  example-array.c \
  example-output-parameter.c \
  example-punning.c \
  example-stack.c \
  example-stdin.c \
  Makefile \
  c-pointer-arithmetic.tex \
  c-pointer-arithmetic.pdf
