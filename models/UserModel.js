const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { ObjectId } = mongoose.Schema.Types;


const UserModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    securityQuestionAnswer: {
        type: String,
        required: true
    },
    todoList: [{ type: ObjectId, ref: 'ListModel' }]
});

UserModel.pre('save', function(next) {
    return bcrypt
      .hash(this.password, salt)
      .then(hash => {
        this.password = hash;
        return next();
      })
      .catch(err => {
        return next(err);
      });
});

UserModel.pre('save', function(next) {
    return bcrypt
      .hash(this.securityQuestionAnswer, salt)
      .then(hash => {
        this.securityQuestionAnswer = hash;
        return next();
      })
      .catch(err => {
        return next(err);
      });
});

// UserModel.pre('save', function(next) {
//     const passHash = bcrypt.hashSync(this.password, salt);
//     const secHash = bcrypt.hashSync(this.securityQuestionAnswer, salt);
//     this.password = passHash;
//     this.securityQuestionAnswer = secHash;
//     return;
// });

// UserModel.methods.validatePassword = function(passwordGuess) {
//     return bcrypt.compare(passwordGuess, this.password);
// };

// UserModel.methods.validateSecQuestion = function(questionGuess) {
//     return bcrypt.compare(questionGuess, this.securityQuestionAnswer);
// };

module.exports = mongoose.model('users', UserModel);