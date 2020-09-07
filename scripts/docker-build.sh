#!/bin/sh

build() {
  cp ./tsconfig.json ./$1/original-tsconfig.json
  docker build ./$1 \
    --rm=false \
    -t challenge/$1
  rm ./$1/original-tsconfig.json
}

build api
build web