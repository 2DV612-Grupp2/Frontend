const companyFacade = require('../model/company/facade');
const accountFacade = require('../model/account/facade');
const mongoose      = require('mongoose');
const Promise       = require('bluebird');
/**
* Create new account.
*/
exports.create = function(username, password, company, role) {
  companyFacade.findOne({ name: company })
  .then((results) => {
    if (!results) {
      return accountFacade.create({
        username,
        password,
        role
      })
    } else {
      return accountFacade.create({
        username,
        password,
        company: results.id,
        role
      })
    }
  })
  .then((account) => {
    console.log('Created Account: ');
    console.log(JSON.stringify(account, null, 4));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
};

exports.list = function() {
  accountFacade.find()
  .then((results) => {
    results.forEach((account) => {
      console.log(JSON.stringify(account, null, 4));
    });
  })
  .finally(() => {
    mongoose.connection.close();
  });
};

/**
* Function to delete the accounts collection. Destroying all data of accounts
* in the database.
*/
exports.drop = function(connection) {
  const promise = new Promise((resolve, reject) => {
    connection.dropCollection('accounts', (err, result) => {
      if (err) reject(err);
      else {
        console.log('Accounts collection dropped');
        resolve(result);
      }
    });
  });

  promise.finally(() => {
    mongoose.connection.close();
  });

  return promise;
};
