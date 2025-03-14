const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    const isMatch = await bcrypt.compare(password, user.password);//password: login bodysine girilen password, user.password: dbdeki password
      if(user){
          if(isMatch){
            //USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/');
          }else{
            res.status(400).send('Wrong email or password');
          }
        
      }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(()=>{
    res.redirect('/');
  });
};


