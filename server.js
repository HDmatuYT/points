const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transport
const transporter = nodemailer.createTransport({
    service: "gmail", // Või muu e-posti teenus, mida kasutad
    auth: {
        user: "kinnituskood@gmail.com", // Sinu e-posti aadress
        pass: "farminG1234", // Sinu e-posti salasõna või rakenduse spetsiifiline parool
    },
});

// POST päring kinnituskoodi saatmiseks
app.post("/send-code", (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).send("Email puudub!");
    }

    const code = Math.floor(100000 + Math.random() * 900000); // 6-kohaline juhuslik number
    console.log(`Saadame koodi ${code} aadressile ${email}`);

    // E-posti saatmine
    const mailOptions = {
        from: "kinnituskood@gmail.com", // Saatja e-posti aadress
        to: "mathiasmandel55@gmail.com", // Saaja e-posti aadress
        subject: "Sinu kinnituskood",
        text: `Tere! Sinu kinnituskood on: ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Viga e-kirja saatmisel:", error);
            return res.status(500).send("E-kirja saatmisel tekkis viga.");
        }
        console.log("Kinnitus kood saadetud:", info.response);
        res.status(200).send({ message: "Kinnitus kood saadetud!" });
    });
});

// Käivita server
app.listen(PORT, () => {
    console.log(`Server töötab pordil ${PORT}`);
});
