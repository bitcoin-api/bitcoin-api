'use strict';

const BEP20 = artifacts.require("BEP20");


module.exports = function(deployer) {
  
    deployer.deploy(BEP20);
};
