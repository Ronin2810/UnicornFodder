const mysql= require('mysql')

const db_sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#Ad28102001",
    database: "adidb",
});
db_sql.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySql Connection Successful");
});

module.exports = db_sql