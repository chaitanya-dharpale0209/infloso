const bcrypt = require('bcryptjs');
const User = require("../Model/User");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const node_mail_sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});



//registration of user
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const registeredData = new User({ username, email, password: hashedPassword, role, verified: false });
        await registeredData.save();

        // This line generates verification token
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // This is email verification link
        const verificationLink = `https://infloso-zffl.onrender.com/api/auth/verify-email/${verificationToken}`;

        // this will send email verification link to the registering email id
        node_mail_sender.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email - InflosoAI",
            html: `<p>Click the link below to verify your email:</p>
                   <a href="${verificationLink}">${verificationLink}</a>`
        }, (error, info) => {
            if (error) {
                console.error("Nodemailer Error:", error);
                return res.status(500).json({ message: "Failed to send verification email", error });
            } else {

                //generated the token after successfull username and password login
                        const token = jwt.sign(
                            {username: registeredData.username},
                            process.env.JWT_SECRET,
                            { expiresIn: '1h' }
                        );
                console.log("Verification email sent:", info.response);
                return res.status(200).json({ message: 'User registered successfully. Please verify your email.', token })
            }
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: error.message });
    }
};



// Email Verification
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) return res.status(400).json({ message: "Invalid token or user not found" });

        // after email verificaton, we are setting verified = true in our databse
        user.verified = true;
        await user.save();

        res.status(200).json({ message: "Email verified successfully. You can now log in." });

    } catch (e) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};



//user login using username and password
const login =async(req, res)=>{
    //taking the user entered data 
    const {username, password} = req.body;

    try{
        //checking the user's username in the database
        const user = await User.findOne({username});
        if(!user){ return res.status(400).json({ message:'no user with the given username' })}

          // Check if user is verified
          if (!user.verified) return res.status(400).json({ message: "Please verify your email before logging in." });


        //checking the user's password with the hashed password in the databse
        const validpassword = await bcrypt.compare(password, user.password);
        if(!validpassword){ return res.status(400).json({message:'password invalid'});}

        //generated the token after successfull username and password login
        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        console.log("successfully logged in")
        //giving the response of token after successfull login
       res.json({token})

    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

// Request password reset by Sending the Email
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        // This linke will reset token
        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const resetLink = `https://infloso-h8ktt4s6w-chaitanya-dharpales-projects-509faa8f.vercel.app/reset-password/${resetToken}`;



        // This line will send reset link via email
        await node_mail_sender.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetLink}">${resetLink}</a>`
        });

        res.status(200).json({ message: "Password reset link sent to email." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reset Password in the Database
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        console.log("Received token:", token);  // Debugging
        console.log("New password:", newPassword);  // Debugging

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Debugging

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Save new password
        await user.save();
        res.status(200).json({ message: "Password reset successfully. You can now log in." });

    } catch (error) {
        console.error("Error resetting password:", error.message); // Logging
        res.status(400).json({ message: "Invalid or expired token" });
    }
};


module.exports = {register, verifyEmail,login, requestPasswordReset, resetPassword}