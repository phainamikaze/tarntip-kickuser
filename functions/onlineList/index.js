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
    pool.getConnection(function(error, connection) {
        const sqlcommand = "SELECT username,acctstarttime,AcctUniqueId FROM radacct WHERE acctstoptime IS NULL LIMIT 0, 100";
        connection.query(sqlcommand, function (err, results) {
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
                            "online":results
                        })
                    }
                );
            }

        });
    });
};
