import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendMail = async (userEmail, verificationLink) => {
    await transporter.sendMail({
        from: `"TaskTrack" <${process.env.EMAIL_USER}`,
        to: userEmail,
        subject: "TaskTrack: Verify Your Email",
        html: `
            <h2>Email Verification</h2>
            <p>Click the button below to verify your account.</p>

            <a href="${verificationLink}"
                style="
                    display:inline-block;
                    padding: 10px 20px;
                    background: #2563eb;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                "
            >
                Verify Email
            </a>
            
            <p>This link expires in 24 hours.</p>
        `
    });
}

export const sendResetPassMail = async (userEmail, resetPasswordLink) => {
    await transporter.sendMail({
        from: `"TaskTrack" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "Password Reset",
        html: `
            <h2>Password Reset Request</h2>
            <p>Click the button below to reset your password:</p>
            <a href="${resetPasswordLink}"
                style="
                    display:inline-block;
                    padding: 10px 20px;
                    background: #2563eb;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                "
            >
                Reset Password
            </a>
            
            <p>This link expires in 15 minutes.</p>
        `
    })
};

export default sendMail;
