const bcrypt = require('bcrypt')
const User = require('../models/User');

async function register(name, email, password) {
    if (typeof password !== 'string' ||
        password.length === 0 ||
        Buffer.byteLength(password, 'utf8') > 72
    ) {
        throw new Error('Password must be beteween 1 and 72 bytes');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User({ name, email, passwordHash });
    return await user.save();

}

async function login(email, password) {
    const user = await User.findOne({ email }).select('+passwordHash');
    
    if(!user?.passwordHash){
        return null;
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    return matches ? user._id : null;
}


module.exports = { register, login }