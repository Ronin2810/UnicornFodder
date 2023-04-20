const investor_schema = require('./models/investor_follow')
const startup_schema = require('./models/startup_follow')
const mongoose = require('mongoose')


const db_mongo = 'mongodb://127.0.0.1:27017/UFdb'
mongoose.connect(db_mongo)
.then(()=>{
    console.log("MongoDB Connection Successful");
})
.catch((err)=>{
    console.log(err);
})

for (let index = 1; index <= 10; index++) {
    const i_user = new investor_schema({
        i_id:index,
        i_followers:[],
        s_followers:[],
        i_following:[],
        s_following:[]
    })
    
    const s_user = new startup_schema({
        s_id:index,
        i_followers:[],
        s_followers:[],
        i_following:[],
        s_following:[]
    })
    i_user.save()
    s_user.save()
}