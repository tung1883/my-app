const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'must provide account'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters'],
    },
    password: {
        type: String,
        required: [true, 'must provide password'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters'],
    },
});

module.exports = mongoose.model('Task', TaskSchema);