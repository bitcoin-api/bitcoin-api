#!/bin/bash

echo "****☢️🐑 Teleporting Mega Monkies ****"
echo "👾👾👾👾👾👾👾👾👾👾"
echo "🦍🦍🦍🦍🦍"
echo "👾👾👾👾👾👾👾👾👾👾"

deployCommand="$1"
pemPath="a/b/c/pem-file-name.pem"
destinationUserName="ec2-user"
destinationUrl="ec2-xxx.compute-1yyy.amazonaws.com"
sourceBaseCodePath="/Users/username/code"
destinationBaseCodePath="/home/ec2-user/code"



echo '👾👾👾👾👾👾👾👾👾👾'
echo '👽👽🛸0-COMMONCODE: API'
echo '👾👾👾👾👾👾👾👾👾👾'

apiSourcePath="${sourceBaseCodePath}/zanzibar-realms/0-commonCode/api"
apiDestinationPath="${destinationBaseCodePath}/0-commonCode/api"

scp \
    -i "${pemPath}" \
    -r \
    "${apiSourcePath}/constants" \
    "${apiSourcePath}/utils" \
    "${apiSourcePath}/index.js" \
    "${apiSourcePath}/package.json" \
    "${apiSourcePath}/package-lock.json" \
    "${destinationUserName}@${destinationUrl}:${apiDestinationPath}"


echo '👾👾👾👾👾👾👾👾👾👾'
echo '👽👽🛸0-COMMONCODE: EXCHANGE'
echo '👾👾👾👾👾👾👾👾👾👾'

exchangeSourcePath="${sourceBaseCodePath}/zanzibar-realms/0-commonCode/exchange"
exchangeDestinationPath="${destinationBaseCodePath}/0-commonCode/exchange"

scp \
    -i "${pemPath}" \
    -r \
    "${exchangeSourcePath}/constants" \
    "${exchangeSourcePath}/utils" \
    "${exchangeSourcePath}/index.js" \
    "${exchangeSourcePath}/package.json" \
    "${exchangeSourcePath}/package-lock.json" \
    "${destinationUserName}@${destinationUrl}:${exchangeDestinationPath}"


echo ' 👾👾👾👾👾👾👾👾👾👾'
echo '👽👽🛸1-BACKEND: COMMON UTILITIES'
echo '👾👾👾👾👾👾👾👾👾👾'

backendSourcePath="${sourceBaseCodePath}/zanzibar-realms/1-backend/commonUtilities"
backendDestinationPath="${destinationBaseCodePath}/1-backend/commonUtilities"

scp \
    -i "${pemPath}" \
    -r \
    "${backendSourcePath}/doBitcoinRequest" \
    "${backendSourcePath}/mongo" \
    "${backendSourcePath}/constants.js" \
    "${backendSourcePath}/deadFunction.js" \
    "${backendSourcePath}/getSafeWriteError.js" \
    "${backendSourcePath}/index.js" \
    "${backendSourcePath}/package-lock.json" \
    "${backendSourcePath}/package.json" \
    "${backendSourcePath}/runGiraffeEvolutionProcedure.js" \
    "${backendSourcePath}/runSpiritual.js" \
    "${backendSourcePath}/signalOnStatusToCommandCenter.js" \
    "${destinationUserName}@${destinationUrl}:${backendDestinationPath}"


echo '👾👾👾👾👾👾👾👾👾👾'
echo '👽👽🛸1-BACKEND: GIRAFFE-UTILS'
echo '👾👾👾👾👾👾👾👾👾👾'
giraffeUtilsSourcePath="${sourceBaseCodePath}/zanzibar-realms/1-backend/giraffeDeploy/commonUtilities"
giraffeUtilsDestinationPath="${destinationBaseCodePath}/1-backend/giraffe-utils"

scp \
    -i "${pemPath}" \
    -r \
    "${giraffeUtilsSourcePath}/constants.js" \
    "${giraffeUtilsSourcePath}/getTimeInfo.js" \
    "${giraffeUtilsSourcePath}/index.js" \
    "${giraffeUtilsSourcePath}/listenForEventsAndExecuteActions.js" \
    "${giraffeUtilsSourcePath}/package-lock.json" \
    "${giraffeUtilsSourcePath}/package.json" \
    "${giraffeUtilsSourcePath}/sendErrorToDeployStreamOnControlC.js" \
    "${destinationUserName}@${destinationUrl}:${giraffeUtilsDestinationPath}"


echo '👾👾👾👾👾👾👾👾👾👾'
echo '👽👽🛸PUBLIC-NPM: BITCOIN-ADDRESS-VALIDATION'
echo '👾👾👾👾👾👾👾👾👾👾'

bitcoinAddressValidationSourcePath="${sourceBaseCodePath}/bitcoin-address-validation"
bitcoinAddressValidationDestinationPath="${destinationBaseCodePath}/x-public/bitcoin-address-validation"

scp \
    -i "${pemPath}" \
    -r \
    "${bitcoinAddressValidationSourcePath}/src" \
    "${bitcoinAddressValidationSourcePath}/.npmignore" \
    "${bitcoinAddressValidationSourcePath}/LICENSE" \
    "${bitcoinAddressValidationSourcePath}/package-lock.json" \
    "${bitcoinAddressValidationSourcePath}/package.json" \
    "${bitcoinAddressValidationSourcePath}/README.md" \
    "${destinationUserName}@${destinationUrl}:${bitcoinAddressValidationDestinationPath}"


echo '👾👾👾👾👾👾👾👾👾👾'
echo '👽👽🛸PUBLIC-NPM: BITCOIN-API'
echo '👾👾👾👾👾👾👾👾👾👾'

bitcoinApiSourcePath="${sourceBaseCodePath}/bitcoin-api"
bitcoinApiDestinationPath="${destinationBaseCodePath}/x-public/bitcoin-api"

scp \
    -i "${pemPath}" \
    -r \
    "${bitcoinApiSourcePath}/LICENSE" \
    "${bitcoinApiSourcePath}/package-lock.json" \
    "${bitcoinApiSourcePath}/package.json" \
    "${bitcoinApiSourcePath}/README.md" \
    "${destinationUserName}@${destinationUrl}:${bitcoinApiDestinationPath}"


# if [ $deployCommand == 'drq' ]; then

#     sourcePath="${sourceBaseCodePath}/drq"
#     destinationPath="${destinationBaseCodePath}/drq"

#     scp \
#         -i "${pemPath}" \
#         -r \
#         "${sourcePath}/doOperationInQueueCore" \
#         "${sourcePath}/.npmignore" \
#         "${sourcePath}/index.js" \
#         "${sourcePath}/LICENSE" \
#         "${sourcePath}/package.json" \
#         "${sourcePath}/package-lock.json" \
#         "${sourcePath}/README.md" \
#         "${sourcePath}/tools.js" \
#         "${destinationUserName}@${destinationUrl}:${destinationPath}"

# elif [ $deployCommand == 'bqe' ]; then

#     sourcePath="${sourceBaseCodePath}/background-executor"
#     destinationPath="${destinationBaseCodePath}/openSource/bqe"

#     scp \
#         -i "${pemPath}" \
#         -r \
#         "${sourcePath}/getStart" \
#         "${sourcePath}/getAddOperation.js" \
#         "${sourcePath}/index.js" \
#         "${sourcePath}/LICENSE" \
#         "${sourcePath}/package.json" \
#         "${sourcePath}/package-lock.json" \
#         "${sourcePath}/README.md" \
#         "${destinationUserName}@${destinationUrl}:${destinationPath}"


# elif [ $deployCommand == 'bitcoin-request' ]; then

#     sourcePath="${sourceBaseCodePath}/bitcoin-request"
#     destinationPath="${destinationBaseCodePath}/bitcoin-request"

#     scp \
#         -i "${pemPath}" \
#         -r \
#         "${sourcePath}/index.js" \
#         "${sourcePath}/LICENSE" \
#         "${sourcePath}/package.json" \
#         "${sourcePath}/package-lock.json" \
#         "${sourcePath}/README.md" \
#         "${destinationUserName}@${destinationUrl}:${destinationPath}"

# elif [ $deployCommand == 'drf' ]; then

#     sourcePath="${sourceBaseCodePath}/drf"
#     destinationPath="${destinationBaseCodePath}/drf"

#     scp \
#         -i "${pemPath}" \
#         -r \
#         "${sourcePath}/.npmignore" \
#         "${sourcePath}/index.js" \
#         "${sourcePath}/LICENSE" \
#         "${sourcePath}/package.json" \
#         "${sourcePath}/package-lock.json" \
#         "${sourcePath}/README.md" \
#         "${destinationUserName}@${destinationUrl}:${destinationPath}"

# elif [ $deployCommand == 'redis-streams-utils' ]; then

#     sourcePath="${sourceBaseCodePath}/redis-streams-utils"
#     destinationPath="${destinationBaseCodePath}/redis-streams-utils"
    
#     scp \
#         -i "${pemPath}" \
#         -r \
#         "${sourcePath}/redisStreamsUtils" \
#         "${sourcePath}/.npmignore" \
#         "${sourcePath}/LICENSE" \
#         "${sourcePath}/package.json" \
#         "${sourcePath}/package-lock.json" \
#         "${sourcePath}/README.md" \
#         "${destinationUserName}@${destinationUrl}:${destinationPath}"

# else
#   echo "Invalid deploy command"
# fi


echo "👾👾👾👾👾👾👾👾👾👾"
echo "🦍🦍🦍🦍🦍"
echo "👾👾👾👾👾👾👾👾👾👾"
echo "****☢️🐑 The Mega Monkies Were Teleported Successfully ****"