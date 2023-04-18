const express = require("express");
const bcrypt = require("bcrypt");
const db_sql = require('../dbconnect')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const authenticate = require("../middleware/auth_startup");
const startup_router = express.Router();

startup_router.get("/",(req,res)=>{
    req.session.destroy();
    res.render('start')
})
startup_router.get("/startuplog",(req,res)=>{
    res.render('startuplog')
})

startup_router.post("/startuplog",(req,res)=>{
    const {name,email,password,confirmpassword,industry,stage,funding,location,pitch,linkedin,website,teamsize}=req.body;
    if (password!==confirmpassword) {
        return res.redirect('/startupreg')
    }
    let hash_new = bcrypt.hashSync(confirmpassword, 10);
    const query = "insert into startup values (NULL,'"+name+"','"+email+"','"+hash_new+"','"+industry+"','"+stage+"','"+funding+"','"+location+"','"+pitch+"','"+linkedin+"','"+website+"','"+teamsize+"');"
    // console.log(query);
    db_sql.query(query,(err,result)=>{
        if (err) {
            return console.log(err);
        }
        console.log("Registered successfully");
        res.render('startuplog')
    })
})

startup_router.get("/startupreg",(req,res)=>{
    res.render('startupreg')
})
startup_router.post('/home1',(req,res)=>{
    // check password and email here
    const{email,password} = req.body;
    const query = "select Name,Email,Password from startup where Email='"+email+"';";
    db_sql.query(query,(err,result)=>{
        if(err){
            console.log(err);
        }
        result = Object.values(JSON.parse(JSON.stringify(result)));
        const comp = bcrypt.compareSync(password,result[0].Password);
        if(comp){
            req.session.user = {
                name: result[0].Name,
                email: result[0].Email,
                type:2
            } ;// user is fetched from DB and stored in this variable
            req.session.isAuth=true;
            req.session.save();
            res.render('home',{profile:req.session.user.name,type:req.session.user.type})
        }
        else{
            res.redirect('/startuplog');
        }
    })
    
})


startup_router.get('/home',authenticate,(req,res)=>{
    res.render('home',{profile:req.session.user.name,type:req.session.user.type})
})
startup_router.get('/startuptb',authenticate,(req,res)=>{
    const query = 'select ID,Name from startup;'
    db_sql.query(query,(err,result)=>{
        if (err) {
            return console.log(err);
        }
        result = Object.values(JSON.parse(JSON.stringify(result)));
        res.render('startuptb',{profile:req.session.user.name,type:req.session.user.type,data:result})
    })

    // res.render('startuptb',{profile:req.session.user.name,type:req.session.user.type})
})
startup_router.get('/investortb',authenticate,(req,res)=>{
    const query = 'select ID,Name from investor;'
    db_sql.query(query,(err,result)=>{
        if (err) {
            return console.log(err);
        }
        result = Object.values(JSON.parse(JSON.stringify(result)));
        res.render('investortb',{profile:req.session.user.name,type:req.session.user.type,data:result})
    })
    // res.render('investortb',{profile:req.session.user.name,type:req.session.user.type})
})
startup_router.get('/profile2',authenticate,(req,res)=>{
    // console.log("inside startup router for profile");
    const q = "select * from startup where Email='"+req.session.user.email+"';"
    db_sql.query(q,(err,result)=>{
        if(err){
            console.log(err);
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

        res.render('startupprofile',{
            profile:req.session.user.name,
            name:name,
            email:email,
            ip:ip,
            sod:sod,
            loc:loc,
            ptc:ptc,
            ts:ts,
            mia:mia,
            lin:lin,
            web:web,
            type:req.session.user.type
        })
    })
})

startup_router.get('/getprofile/investor', authenticate, (req, res) => {
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

startup_router.get('/getprofile/startup', authenticate, (req, res) => {
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
module.exports = startup_router;
