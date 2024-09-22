const conn = require('./connection');

const execute_ = async function execute_sp(statement, params) {
    try {
        const rows = await conn.promise().query(statement, params);
        return rows;
    } catch (err) {
        console.log(err);
        return [];
    }
};

module.exports = {
  execute_
}

