const mysql = require( 'mysql' );

module.exports = class AsyncDatabase {
    constructor() {
        this.connection = mysql.createConnection({
          host : process.env.DB_HOST,
          user : process.env.DB_USER,
          password : process.env.DB_PASSWORD,
          database : process.env.DB_NAME
        });
    }

    query(sql, args) {
        return new Promise( (resolve, reject) => {
            this.connection.query( sql, args, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err ) return reject( err );
                resolve();
            });
        });
    }
}

// const db = new AsyncDatabase();
