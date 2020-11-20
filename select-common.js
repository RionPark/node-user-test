
const dbInfo = require('./db-config');
const oracleDb = require('oracledb');

async function getArrayFromDB(sql,params){
    if(!params) params = [];

    var con = await oracleDb.getConnection(dbInfo);
    var result = await con.execute(sql,params);

    var jsonArr = [];
    for(var i=0;i<result.rows.length;i++){
        var row = result.rows[i];
        var nt = {};
        for(var j=0;j<result.metaData.length;j++){
            var md = result.metaData[j];
            nt[md.name] = row[j];
        }
        jsonArr.push(nt);
    }
    return jsonArr;
}

module.exports = getArrayFromDB;