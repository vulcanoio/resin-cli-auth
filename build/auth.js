
/*
Copyright 2016 Resin.io

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

/**
 * @module auth
 */
var open, resin, server, utils;

open = require('open');

resin = require('resin-sdk');

server = require('./server');

utils = require('./utils');


/**
 * @summary Login to the Resin CLI using the web dashboard
 * @function
 * @public
 *
 * @description
 * This function opens the user's default browser and points it
 * to the Resin.io dashboard where the session token exchange will
 * take place.
 *
 * Once the the token is retrieved, it's automatically persisted.
 *
 * @fulfil {String} - session token
 * @returns {Promise}
 *
 * @example
 * auth.login().then (sessionToken) ->
 *   console.log('I\'m logged in!')
 *   console.log("My session token is: #{sessionToken}")
 */

exports.login = function() {
  var callbackUrl, options;
  options = {
    port: 8989,
    path: '/auth'
  };
  callbackUrl = "http://localhost:" + options.port + options.path;
  return utils.getDashboardLoginURL(callbackUrl).then(function(loginUrl) {
    setTimeout(function() {
      return open(loginUrl);
    }, 1000);
    return server.awaitForToken(options).tap(resin.auth.loginWithToken);
  });
};
