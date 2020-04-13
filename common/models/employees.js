'use strict';

var response = require('../../response/response.js');

module.exports = function(Employees) {
    // Employees.disableRemoteMethodByName('create');
    Employees.disableRemoteMethodByName('replaceOrCreate');
    Employees.disableRemoteMethodByName('upsertWithWhere');
    Employees.disableRemoteMethodByName('change_stream');
    Employees.disableRemoteMethodByName('upsert');
    Employees.disableRemoteMethodByName('updateAll');
    Employees.disableRemoteMethodByName('prototype.updateAttributes');
    // Employees.disableRemoteMethodByName('find');
    // Employees.disableRemoteMethodByName('findById');
    // Employees.disableRemoteMethodByName('findOne');
    // Employees.disableRemoteMethodByName('deleteById');
    Employees.disableRemoteMethodByName('confirm');
    Employees.disableRemoteMethodByName('count');
    Employees.disableRemoteMethodByName('exists');
    Employees.disableRemoteMethodByName('resetPassword');
    Employees.disableRemoteMethodByName('prototype.__count__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__create__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__delete__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__findById__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__get__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__updateById__accessTokens');
    Employees.disableRemoteMethodByName('replaceById');
    Employees.disableRemoteMethodByName('createChangeStream');
    Employees.disableRemoteMethodByName('prototype.__count__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__create__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__delete__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__findById__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__get__accessTokens');
    Employees.disableRemoteMethodByName('prototype.__updateById__accessTokens');
    Employees.disableRemoteMethodByName('replaceById');
    Employees.disableRemoteMethodByName('createChangeStream');
    
    /**
     * delete employee API
     */
    Employees.remoteMethod(
        'delete',
        {
            http: {
                status: 200,
                errorStatus: 400,
                path: '/delete/:employeeId',
                verb: 'delete'
            },
            description: 'Delete Timesheet',
            accepts: [
                { arg: 'employeeId', type: 'number', description: 'Provide employeeId', required: true },
            ],
          returns: [
    
            { arg: "result", http: { source: 'result' } }
          ]
        }
      );

    Employees.delete = function (employeeId,callback) {
       
        Employees.update({ 'employeeId': employeeId }, {
          'isDeleted': 1
        },
        function (err, result) {
              if(err){
                callback(null, err);
              }else{
                if(result){
                    var responseMsg = response.commonMsg('success', 'Employee deleted successfully', '', '');
                    responseMsg.data = result;
                    callback(null, responseMsg);
                }
              }
          });
    };


    /**
     * add employee API
     */
    Employees.remoteMethod(
        'add', {
        http: {
            status: 201,
            errorStatus: 400,
            verb: 'post'
          },
          description: 'Create a new instance of the model and persist it into the data source.',
          accepts: [
            {
              arg: 'empId',
              type: 'number',
              description: 'Enter employee Id ',
              required: true
            },
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
              arg: 'mobile',
              type: 'number',
              required: true
            },
            {
              arg: 'address',
              type: 'string',
              required: true
            },
            {
              arg: 'managerId',
              type: 'number',
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

    Employees.add = function (empId,firstName,lastName,dateOfBirth,mobile,address,managerId,callback) {
        
        let data = {
            empId:empId,
            firstName:firstName,
            lastName:lastName,
            dateOfBirth:dateOfBirth,
            mobile:mobile,
            address:address,
            managerId:managerId
        }
        Employees.create(data,
        function (err, result) {
              if(err){
                callback(null, err);
              }else{
                if(result){
                    var responseMsg = response.commonMsg('success', 'Employee Created successfully', '', '');
                    callback(null, responseMsg);
                }
              }
          });
    };

     /**
     * update employee API
     */
    Employees.remoteMethod(
        'modify', {
        http: {
            status: 201,
            errorStatus: 400,
            path: '/modify/:id',
            verb: 'post'
          },
          description: 'Create a new instance of the model and persist it into the data source.',
          accepts: [
            {
                arg: 'id',
                type: 'number',
                description: 'Enter employee Id ',
                required: true
            },
            {
              arg: 'empId',
              type: 'number',
              description: 'Enter employee Id ',
              required: true
            },
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
              arg: 'mobile',
              type: 'number',
              required: true
            },
            {
              arg: 'address',
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

    Employees.modify = function (id,empId,firstName,lastName,dateOfBirth,mobile,address,callback) {
        
        let data = {
            empId:empId,
            firstName:firstName,
            lastName:lastName,
            dateOfBirth:dateOfBirth,
            mobile:mobile,
            address:address
        }
        Employees.update({'id':id},data,
        function (err, result) {
              if(err){
                var responseMsg = response.commonMsg('failure', 'Employee not updated', '', err);
                callback(null, responseMsg);
              }else{
                if(result.count == 1){
                    var responseMsg = response.commonMsg('success', 'Employee Updated successfully', '', '');
                    callback(null, responseMsg);
                }else{
                    var responseMsg = response.commonMsg('failure', 'Employee not updated', '', '');
                    callback(null, responseMsg);
                }
              }
          });
    };


     /**
     * update employee API
     */
    Employees.remoteMethod(
        'list', {
        http: {
            status: 201,
            errorStatus: 400,
            path: '/list/:managerId',
            verb: 'get'
          },
          description: 'Create a new instance of the model and persist it into the data source.',
          accepts: [
            {
                arg: 'managerId',
                type: 'number',
                description: 'Enter manager Id ',
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

    Employees.list = function (managerId,callback) {
      
        Employees.find( 
            {
            where: {
                "managerId":managerId
            }
        },
        function (err, result) {
              if(err){
                callback(null, err);
              }else{
                if(result){
                    var responseMsg = response.commonMsg('success', 'Employee list successfully', '', '');
                    responseMsg.data = result;
                    callback(null, responseMsg);
                }
              }
          });
    };

     /**
     * details by Id employee API
     */
    Employees.remoteMethod(
        'listById', {
        http: {
            status: 201,
            errorStatus: 400,
            path: '/listById/:employeeId',
            verb: 'get'
          },
          description: 'Create a new instance of the model and persist it into the data source.',
          accepts: [
            {
                arg: 'employeeId',
                type: 'number',
                description: 'Enter manager Id ',
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

    Employees.listById = function (employeeId,callback) {
      
        Employees.find( 
            {
            where: {
                "id":employeeId
            }
        },
        function (err, result) {
              if(err){
                var responseMsg = response.commonMsg('failure', 'Employee data not fetched successfully', '', err);
                responseMsg.data = [];
                callback(null, responseMsg);
              }else{
                if(result.length > 0){
                    var responseMsg = response.commonMsg('success', 'Employee data fetched successfully', '', '');
                    responseMsg.data = result;
                    callback(null, responseMsg);
                }else{
                    var responseMsg = response.commonMsg('failure', 'Employee data not fetched', '', '');
                    responseMsg.data = [];
                    callback(null, responseMsg);
                }
              }
          });
    };



};
