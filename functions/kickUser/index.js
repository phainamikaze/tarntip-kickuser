'use strict';
var mysql      = require('mysql');

var pool = mysql.createPool({
    host     :  process.env.DBHOST,
    user     :  process.env.DBUSER,
    password :  process.env.DBPASS,
    database :  process.env.DBNAME,
    connectionLimit:2
});


module.exports.handler = (event, context ,callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const body = JSON.parse(event.body);
    pool.getConnection(function(error, connection) {
        const sqlcommand = "UPDATE radacct SET acctstoptime = acctupdatetime,acctterminatecause='admin-reset' WHERE AcctUniqueId = ? and username = ? and acctstoptime IS NULL";
        connection.query(sqlcommand,[body.AcctUniqueId, body.username], function (err, results) {
            connection.release();
            if(err){
                callback(null,
                    {
                        statusCode: 400,
                        headers: {
                            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            "error":err
                        })
                    }
                );
            }else{
                callback(null,
                    {
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({
                            "ok":{
                                AcctUniqueId: body.AcctUniqueId,
                                username: body.username
                            }
                        })
                    }
                );
            }

        });
    });
};
