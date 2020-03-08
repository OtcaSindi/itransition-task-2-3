const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    title: {type: String, default: 'Note'},
    content: {type: String, required: true},
    color: {type: String}
})

module.exports = model('Note', schema)
