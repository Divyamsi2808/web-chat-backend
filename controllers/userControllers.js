const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../models/users");



//to add user to the database.And send jwt token as a response
const createUser = asyncHandler(async (req, res) => {
    const { name, phone, email, password, username } = req.body;
    

    if (!name || !phone || !email || !password || !username) {
        return res.status(400).json({ error: "All fields are required" }); 
    }

    const usernameCheck = await Users.findOne({ username });
    if (usernameCheck)
      return res.status(409).json({ msg: "Username already used"});

    const emailCheck = await Users.findOne({ email });
    if (emailCheck)
        return res.status(409).json({ msg: "Email already used"});

    const phoneCheck = await Users.findOne({phone});
    if (phoneCheck)
    return res.status(409).json({msg: "number already in use. Please provide another number"})


    const user = new Users({
        name,
        phone,
        email,
        password : await bcrypt.hash(password, 12),
        username,
    });

    await user.save();

    res.status(201).json({
        token: jwt.sign({ user: username }, 'Divyamsi78'),
    });
});


//to verify the user details.And send the jwt token as a response
const login = (req, res) => {
	const {username,password} = req.body;
	if (username&& password) {
		Users.findOne({
			username
		}).then(async (user) => {
            const isPasswordMatched = await bcrypt.compare(password, user.password)
            if (!isPasswordMatched) {
				res.status(401).json({msg: 'username or password is incorrect'});
            }
            return res.json({
                token: jwt.sign({ user: username }, 'Divyamsi78'),
            });
        }).catch((err) => {
				console.error(err);
			});
	}else{
        res.status(401).json({
            msg: "Please enter username and password"
        })
    }
};

//to get all users
const getAllUsers = asyncHandler(
    async (req, res) => {
        const users = await Users.find();
        res.status(200).json(users);
    }
);


//to get user with id
const getUser = asyncHandler(
    async (req, res) => {
        const user = await Users.findOne({_id: req.params.id});
        res.status(202).json(user);
    }
);

module.exports = { getAllUsers, createUser, getUser, login};
