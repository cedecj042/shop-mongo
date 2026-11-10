const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.signUp = (req,res,next) =>{
    res.render('authenticate/signup',{
        pageTitle: 'Register',
        path: '/signup'
    })
}

exports.postSignUp = async (req,res,next)=>{

    try{
        
        const {name, email, password}= req.body;
        const user = new User(name,email,password);

        await user.save()
        .then(result =>{
            console.log('Created User');
            res.redirect('/');
        }).catch(err =>{
            console.log(err);
        });


    }catch(err){
        next(err)
    }
    

}