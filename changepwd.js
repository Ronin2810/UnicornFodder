// const bcrypt = require('bcrypt')
// const mysql = require('mysql')



// const db_sql = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "#Ad28102001",
//     database: "adidb",
// });
// db_sql.connect((err) => {
//     if (err) {
//       throw err;
//     }
//     console.log("MySql Connection Successful");
// });

// const query = "select (Password) from startup;"

// db_sql.query(query,(err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     result = Object.values(JSON.parse(JSON.stringify(result)));
//     console.log(result);
//     // for(let i=0;i<10;i++){
//     //     let pass = result[i].Password;
//     //     let hash_new = bcrypt.hashSync(pass, 10);
//     //     const q1 = "update startup set Password='"+hash_new+"' where ID="+(i+1)+";"
//     //     db_sql.query(q1,(err,result)=>{
//     //         if(err){
//     //             console.log(err);
//     //         }
//     //     })
//     // }
//     // console.log("Update Successful");
// })



