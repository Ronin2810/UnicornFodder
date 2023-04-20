const mongoose = require('mongoose')
const schema = mongoose.Schema

const investor_schema = new schema({
    i_id:{
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

module.exports = mongoose.model('investor_follows',investor_schema);