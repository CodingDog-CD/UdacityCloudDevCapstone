"use strict";
exports.__esModule = true;
exports.authConfig = exports.apiEndpoint = void 0;
// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
var apiId = '93ukdaquo9';
exports.apiEndpoint = "https://" + apiId + ".execute-api.eu-central-1.amazonaws.com/dev";
exports.authConfig = {
    // TODO: Create an Auth0 application and copy values from it into this map. For example:
    // domain: 'dev-nd9990-p4.us.auth0.com',
    domain: 'dev-qvu-29oi.us.auth0.com',
    clientId: '2nmwwnTY1qI3SnS171m95zkU3WBb2VVs',
    callbackUrl: 'http://localhost:3000/callback'
};
