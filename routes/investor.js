const express = require("express");
const bcrypt = require("bcrypt");
const db_sql = require('../dbconnect')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const authenticate = require("../middleware/auth_investor");
const investor_router = express.Router();

//Starting page (Cookie destroy)
investor_router.get("/", (req, res) => {
    req.session.destroy();
    res.render('start')
})

// Direct Login Page
investor_router.get("/investorlog", (req, res) => {
    res.render('investorlog')
})

//Login Page after registration
investor_router.post("/investorlog", (req, res) => {
    //take data from the form using body parser, hash the password and insert in investor table (SQL)
    const { name, email, password, confirmpassword, investtype, industry, stage, mininvestment, phone, linkedin, accredited, conflicts } = req.body;
    // console.log(accredited);
    let accr;
    if (password !== confirmpassword) {
        return res.redirect('/investorreg')
    }
    // check if password and confirm password are same here
    let hash_new = bcrypt.hashSync(confirmpassword, 10);
    if (accredited == 'yes') {
        accr = 1
    }
    else {
        accr = 0
    }
    const query = "insert into investor values (NULL,'" + name + "','" + email + "','" + hash_new + "','" + investtype + "','" + industry + "','" + stage + "','" + mininvestment + "','" + phone + "','" + linkedin + "'," + accr + ",'" + conflicts + "');"
    // console.log(query);
    db_sql.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Entry Successful");
        res.render('investorlog')
    })
})

//Registration Page
investor_router.get("/investorreg", (req, res) => {
    res.render('investorreg')
})

// After Login Home Page (Cookie create)
investor_router.post('/home', (req, res) => {
    // check password and email here
    const { email, password } = req.body;
    const query = "select Name,Email,Password from investor where Email='" + email + "';";
    db_sql.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        result = Object.values(JSON.parse(JSON.stringify(result)));
        const comp = bcrypt.compareSync(password, result[0].Password);
        if (comp) {
            req.session.user = {
                name: result[0].Name,
                email: result[0].Email,
                type: 1
            };// user is fetched from DB and stored in this variable
            req.session.isAuth = true;
            req.session.save();
            res.render('home', { profile: req.session.user.name, type: req.session.user.type })
        }
        else {
            res.redirect('/investorlog');
        }
    })
})

// Home Page after previous logged in 
investor_router.get('/home', authenticate, (req, res) => {
    res.render('home', { profile: req.session.user.name, type: req.session.user.type })
})

// Startup table
investor_router.get('/startuptb', authenticate, (req, res) => {
    // fetch data from startup table and display....make sure to display exxcept its own entry
    const query = 'select ID,Name from startup;'
    db_sql.query(query, (err, result) => {
        if (err) {
            return console.log(err);
        }
        result = Object.values(JSON.parse(JSON.stringify(result)));
        res.render('startuptb', { profile: req.session.user.name, type: req.session.user.type, data: result })
    })
    // res.render('startuptb',{profile:req.session.user.name,type:req.session.user.type})
})

// Investor table
investor_router.get('/investortb', authenticate, (req, res) => {
    // fetch data from investor table and display....make sure to display exxcept its own entry
    const query = 'select ID,Name from investor;'
    db_sql.query(query, (err, result) => {
        if (err) {
            return console.log(err);
        }
        result = Object.values(JSON.parse(JSON.stringify(result)));
        res.render('investortb', { profile: req.session.user.name, type: req.session.user.type, data: result })
    })
})

investor_router.get('/profile1', authenticate, (req, res) => {
    // console.log("inside investor router for profile");
    const q = "select * from investor where Email='" + req.session.user.email + "';"
    db_sql.query(q, (err, result) => {
        if (err) {
            console.log(err);
        }
        result = Object.values(JSON.parse(JSON.stringify(result)));
        const name = result[0].Name;
        const email = result[0].Email;
        const it = result[0].Investment_Type;
        const ip = result[0].Industry;
        const sod = result[0].Stage;
        const mia = result[0].Amount;
        const pno = result[0].phone;
        const lin = result[0].LinkedIn;
        const acc = result[0].Accredited;
        let acc1 = "";
        if (acc) {
            acc1 = "Yes";
        }
        else {
            acc1 = "No";
        }
        const con = result[0].Disclosure;
        res.render('investorprofile', {
            profile: req.session.user.name,
            name: name,
            email: email,
            it: it,
            ip: ip,
            sod: sod,
            mia: mia,
            pno: pno,
            lin: lin,
            acc: acc1,
            con: con,
            type: req.session.user.type
        })
    })

})

// investor_router.get('/getprofile/investor/:ID',(req,res)=>{
//     const id = req.params;
//     console.log(id);
// })
investor_router.get('/getprofile/investor', authenticate, (req, res) => {
    const id = req.query.ID;
    const query = "select * from investor where ID=" + id + ";"
    db_sql.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        result = Object.values(JSON.parse(JSON.stringify(result)));
        const name = result[0].Name;
        const email = result[0].Email;
        const it = result[0].Investment_Type;
        const ip = result[0].Industry;
        const sod = result[0].Stage;
        const mia = result[0].Amount;
        const pno = result[0].phone;
        const lin = result[0].LinkedIn;
        const acc = result[0].Accredited;
        let acc1 = "";
        if (acc) {
            acc1 = "Yes";
        }
        else {
            acc1 = "No";
        }
        const con = result[0].Disclosure;
        res.render('profinvestor', {
            profile: req.session.user.name,
            name: name,
            email: email,
            it: it,
            ip: ip,
            sod: sod,
            mia: mia,
            pno: pno,
            lin: lin,
            acc: acc1,
            con: con,
            type: req.session.user.type
        })

    })
})

investor_router.get('/getprofile/startup', authenticate, (req, res) => {
    const id = req.query.ID;
    const query = 'select * from startup where ID=' + id + ';'
    db_sql.query(query, (err, result) => {
        if (err) {
            return console.log(err);
        }
        result = Object.values(JSON.parse(JSON.stringify(result)));
        const name = result[0].Name;
        const email = result[0].Email;
        const ip = result[0].Industry;
        const sod = result[0].Stage;
        const loc = result[0].Location;
        const ts = result[0].TeamSize;
        const mia = result[0].Amount;
        const ptc = result[0].Pitch;
        const lin = result[0].LinkedIn;
        const web = result[0].Website;

        res.render('profstartup', {
            profile: req.session.user.name,
            name: name,
            email: email,
            ip: ip,
            sod: sod,
            loc: loc,
            ptc: ptc,
            ts: ts,
            mia: mia,
            lin: lin,
            web: web,
            type: req.session.user.type
        })
        // res.render('startuptb',{profile:req.session.user.name,type:req.session.user.type,data:result})
    })
})

module.exports = investor_router;
