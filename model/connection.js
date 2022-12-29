const mysql =require('mysql');

class Connection {
    static configToMySQL = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'student',
        charset: 'utf8_general_ci'
    }
    static getConnection() {
        return mysql.createConnection(Connection.configToMySQL)
    }
    static connecting1() {
        Connection.getConnection().connect(error => {
            if (error) {
                console.log(error.message);
            } else {
                console.log('Connect Success !!!')
            }
        })
    }
}
module.exports = Connection;