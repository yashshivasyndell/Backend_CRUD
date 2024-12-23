const nodemailer = require("nodemailer");

async function sendWelcomeEmail(toEmail) {
    
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'developersweb004@gmail.com',
        pass: 'fpai ddqd awyc rqfr'
    },
  });

  try {
    // Send an email
    const info = await transporter.sendMail({
      from: '"Yash shiva" <developersweb004@gmail.com>',  
      to: toEmail,       
      subject: "Hello Learner",                              
      text: "Welcome to my project!!!!!",                              
      html: "<b>Welcome to Zoundslike! this is best language learning app ever</b>",
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

const sender =async (req,res)=>{
    const { email } = req.body;
    console.log("this is email coiming ",email);
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      try {
        await sendWelcomeEmail(email);
        res.status(200).json({ message: `Welcome email sent to ${email}` });
      } catch (error) {
        res.status(500).json({ message: "Failed to send email", error });
      }
}

module.exports = sender;
