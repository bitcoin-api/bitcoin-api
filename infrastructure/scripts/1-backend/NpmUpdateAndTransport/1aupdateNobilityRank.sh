#!/bin/sh

version="$1"


####
####  Common Code
####

pushd ../../../../0-commonCode/api

npm version "$version"

popd

pushd ../../../../0-commonCode/exchange

npm version "$version"

popd


####
####  Backend
####


pushd ../../../../1-backend/commonUtilities

npm version "$version"

popd


# ####
# ####  Backend Giraffe Lick Leaf
# ####


pushd ../../../../1-backend/giraffeDeploy/commonUtilities

npm version "$version"

popd

