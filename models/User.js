const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        thoughts: [thoughtSchema],
        friends: [userSchema],
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

    const User = model('user', userSchema);

    module.exports = User;