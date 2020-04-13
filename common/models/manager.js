'use strict';

var response = require('../../response/response.js');

module.exports = function(Manager) {
    // Manager.disableRemoteMethodByName('create');
    Manager.disableRemoteMethodByName('replaceOrCreate');
    Manager.disableRemoteMethodByName('upsertWithWhere');
    Manager.disableRemoteMethodByName('change_stream');
    Manager.disableRemoteMethodByName('upsert');
    Manager.disableRemoteMethodByName('updateAll');
    Manager.disableRemoteMethodByName('prototype.updateAttributes');
    // Manager.disableRemoteMethodByName('find');
    // Manager.disableRemoteMethodByName('findById');
    // Manager.disableRemoteMethodByName('findOne');
    // Manager.disableRemoteMethodByName('deleteById');
    Manager.disableRemoteMethodByName('confirm');
    Manager.disableRemoteMethodByName('count');
    Manager.disableRemoteMethodByName('exists');
    Manager.disableRemoteMethodByName('resetPassword');
    Manager.disableRemoteMethodByName('prototype.__count__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__create__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__delete__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__findById__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__get__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__updateById__accessTokens');
    Manager.disableRemoteMethodByName('replaceById');
    Manager.disableRemoteMethodByName('createChangeStream');
    Manager.disableRemoteMethodByName('prototype.__count__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__create__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__delete__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__findById__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__get__accessTokens');
    Manager.disableRemoteMethodByName('prototype.__updateById__accessTokens');
    Manager.disableRemoteMethodByName('replaceById');
    Manager.disableRemoteMethodByName('createChangeStream');

    /**
     * login manager API
     */
    Manager.remoteMethod(
        'login', {
        http: {
            status: 201,
            errorStatus: 400,
            path : '/login',
            verb: 'get'
          },
          description: 'Create a new instance of the model and persist it into the data source.',
          accepts: [
            {
                arg: 'email',
                type: 'string',
                description: 'Enter email Id ',
                required: true
            },
            {
                arg: 'password',
                type: 'string',
                description: 'Enter password',
                required: true
            },
          ],
          returns: {
            arg: 'data',
            type: [],
            root: true
          },
        }
    );

    Manager.login = function(email,password,callback){
        Manager.findOne(
            {
            fields:{
                id:true,
                firstName:true,
                lastName:true
            },
            where: { 
                'email': email,
                'password':password}
            }, function (err, user) {
            if (err) {
                var responseMsg = response.commonMsg('failure', 'Manager login failed', null, err);
                callback(err);
            } else if (user) {
                var responseMsg = response.commonMsg('success', 'Manager login successfully', '', '');
                responseMsg.data = user;
                responseMsg.data.isMatch = 1;
                callback(null, responseMsg);
            } else {
                var responseMsg = response.commonMsg('success', 'Login credential does not match !', '', '');
                responseMsg.data.isMatch = 0;
                callback(null, responseMsg);
            }
        })
    }


    /**
     * add manager API
     */
    Manager.remoteMethod(
        'add', {
        http: {
            status: 201,
            errorStatus: 400,
            verb: 'post'
          },
          description: 'Create a new instance of the model and persist it into the data source.',
          accepts: [
          
            {
              arg: 'firstName',
              type: 'string',
              required: true
            },
            {
              arg: 'lastName',
              type: 'string',
              required: true
            },
            {
              arg: 'dateOfBirth',
              type: 'string',
              required: true
            },
            {
                arg: 'email',
                type: 'string',
                required: true
            },
            {
                arg: 'password',
                type: 'string',
                required: true
            },
            {
              arg: 'address',
              type: 'string',
              required: true
            },
            {
              arg: 'company',
              type: 'string',
              required: true
            }
          ],
          returns: {
            arg: 'data',
            type: [],
            root: true
          },
        }
    );

    Manager.add = function (firstName,lastName,dateOfBirth,email,password,address,company,callback) {
        
        let data = {
            firstName:firstName,
            lastName:lastName,
            dateOfBirth:dateOfBirth,
            email:email,
            password: password,
            address:address,
            company: company
        }
        Manager.find({where:{email:email}},function(err,res){
            if(err){
                callback(null, err);
            }  else if(res.length > 0){

                var responseMsg = response.commonMsg('failure', 'Email already exists!', '', '');
                responseMsg.data.isEmailExists = 1;
                callback(null, responseMsg);

            } else {
                Manager.create(data,
                function (err, result) {
                    if(err){
                        var responseMsg = response.commonMsg('success', 'Manager created failed!', '', err);
                        callback(null, err);
                    } else {
                        var responseMsg = response.commonMsg('success', 'Manager created successfully!', '', '');
                        callback(null, responseMsg);
                    }
                })
            }
        });
    };

};
