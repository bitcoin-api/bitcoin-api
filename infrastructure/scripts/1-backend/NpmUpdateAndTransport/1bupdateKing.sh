#!/bin/sh


####
####  Common Code
####

pushd ../../../../0-commonCode/api

npm install @bitcoin-api/redis-streams-utils@latest --save
npm install do-redis-request@latest --save
npm install drf@latest --save
npm install drq@latest --save
npm install get-redis-client@latest --save
npm install

popd
