#!/bin/bash

DIST="./dist";

mkdir -p $DIST;
rm -rf $DIST/*;

cp index.html js/unruly-particles.js bower_components/three.js/three.min.js $DIST;