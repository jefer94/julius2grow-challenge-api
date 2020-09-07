#!/bin/sh

build() {
  docker build ./$1 \
    --rm=false \
    -t challenge/$1
}

build api