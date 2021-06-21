#!/bin/sh


####
####  Common Code
####


pushd ../../../../0-commonCode/exchange

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install

popd


####
####  Backend
####


pushd ../../../../1-backend/commonUtilities

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install bqe@latest --save
npm install bitcoin-request@latest --save
npm install

popd


####
####  Backend Giraffe Lick Leaf
####


pushd ../../../../1-backend/giraffeDeploy/commonUtilities

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install

popd
