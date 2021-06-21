#!/bin/sh


####
####  Backend
####

pushd ../../../../1-backend/addressGenerator

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install @bitcoin-api/full-stack-backend-private@latest --save
npm install

popd


pushd ../../../../1-backend/feeDataBot

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install @bitcoin-api/full-stack-backend-private@latest --save
npm install

popd


pushd ../../../../1-backend/withdrawsBot

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install @bitcoin-api/full-stack-exchange-private@latest --save
npm install @bitcoin-api/full-stack-backend-private@latest --save
npm install

popd


pushd ../../../../1-backend/depositsBot

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install @bitcoin-api/full-stack-exchange-private@latest --save
npm install @bitcoin-api/full-stack-backend-private@latest --save
npm install

popd


####
####  Backend Giraffe Lick Leaf
####


pushd ../../../../1-backend/giraffeDeploy/giraffe

npm install @bitcoin-api/giraffe-utils@latest --save
npm install @bitcoin-api/full-stack-api-private@latest --save
npm install

popd


pushd ../../../../1-backend/giraffeDeploy/tree

npm install @bitcoin-api/giraffe-utils@latest --save
npm install @bitcoin-api/full-stack-api-private@latest --save
npm install

popd


####
####  API
####


pushd ../../../../2-api

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install @bitcoin-api/full-stack-exchange-private@latest --save
npm install

popd


####
####  Beyond
####


pushd ../../../../infrastructure/scripts/x-universal/megaActions/dbOperations

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install @bitcoin-api/full-stack-exchange-private@latest --save
npm install

popd


pushd ../../../../infrastructure/scripts/x-universal/megaActions/dbOperationOnAll

npm install @bitcoin-api/full-stack-api-private@latest --save
npm install @bitcoin-api/full-stack-exchange-private@latest --save
npm install

popd
