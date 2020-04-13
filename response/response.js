
'use strict';

const camelcaseKeys = require('camelcase-keys');

module.exports = {
    commonMsg: function (status, msg, resData, err) {
        if (!msg) msg = 'Something went wrong';
        var code;
        if (status === 'failure') code = 404;
        else code = 200;
        var methodResponse = {};
        methodResponse['info'] = {};
        methodResponse['data'] = {};
        methodResponse['error'] = {};
        if (resData) {
        resData = JSON.stringify(resData);
        resData = JSON.parse(resData);
        methodResponse.data = camelcaseKeys(resData, { deep: true });
        }
        if (err) {
        methodResponse.error = err;
        }
        methodResponse.data.responseMsg = msg;
        methodResponse.info = {
        'status': status,
        'code': code
        };
        return methodResponse;
    },
}