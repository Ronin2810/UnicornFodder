const mongoose = require('mongoose')
const schema = mongoose.Schema

const startup_schema = new schema({
    s_id:{
        type:Number,
        required: true
    },
    s_followers:{
        type:[Number]
    },
    s_following:{
        type:[Number]
    },
    i_followers:{
        type:[Number]
    },
    i_following:{
        type:[Number]
    },
})

module.exports = mongoose.model('startup_follows',startup_schema);