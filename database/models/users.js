const validator = require('validator'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

module.exports = (mongoose) => {

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            validate: {
                validator: first_name => first_name.length > 2,
                message: "Your name should have more the 2 characters"
            },
            required: [true, 'Name is must!']
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validate: {
                validator: email => validator.isEmail(email),
                message: `{VALUE} is not a valid email`
            },
            required: [true, 'This field is must as per your security puprose!'],
            index: true
        },
        password: {
            type: String,
            required: [true, 'It is must to enter the password']
        },
        role: {
            type: String,
            required: [true, 'It is must to enter your role here']
        },
        attendance: {
            type : String
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        },
        status: {
            type: [{
                type: String,
                enum: ['active', 'inactive']
            }],
            default: ['active']
        }
    })

    userSchema.pre('save', async function(next) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)

        // hash the password using our new salt
        const hash = await bcrypt.hash(user.password, salt)

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });

    userSchema.methods.comparePassword = function (candidatePassword, callback) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return callback(err);
            callback(null, isMatch);
        });
    }

    return userSchema;

}