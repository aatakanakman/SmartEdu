const   mongoose      = require('mongoose'),
        bcrypt        = require('bcrypt')
        Schema        = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    }
})

//Veritabanına kaydetmeden önce, şifrenin hashlenmesini istiyoruz. //! bcrypt paketi ile
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
})


const User = mongoose.model('User', UserSchema);
module.exports = User;