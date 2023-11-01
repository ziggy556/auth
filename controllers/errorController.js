module.exports.errorHandler = (err) => {
    let errorToBeSent = {
        'email': '',
        'password': ''

    }
    console.log(err.message, err.code);

    if(err.message == 'Email does not exist'){
        errorToBeSent.email = err.message;
    }

    if(err.message == 'Password is invalid'){
        errorToBeSent.password = err.message;
    }

    if (err.code == 11000) {
        return new Promise(r => r({ email: 'Pls enter unique email id', password: '' }));
    }

    if (err.message.includes('User validation failed')) {
        for (let { properties } of Object.values(err.errors)) {
            errorToBeSent[properties.path] = properties.message;
        }
    }
    return new Promise(r => r(errorToBeSent));
}