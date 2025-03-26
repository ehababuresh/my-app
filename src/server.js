require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// חיבור למסד הנתונים MongoDB
mongoose.connect('mongodb://localhost:27017/insuranceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('מחובר ל-MongoDB בהצלחה');
}).catch((error) => {
  console.error('שגיאה בחיבור ל-MongoDB:', error);
});

// סכימה למסד הנתונים
const insuranceSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  insuranceType: String,
  hasInsurance: Boolean,
  yearsOfInsurance: Number,
  hadAccidents: Boolean,
  carNumber: String,
  idNumber: String,
});

const Insurance = mongoose.model('Insurance', insuranceSchema);

// מסלול לשליחת מייל ושמירת ההצעה
app.post('/send-email', async (req, res) => {
  console.log("Received request body:", req.body);
  const { name, email, phone, insuranceType, hasInsurance, yearsOfInsurance, hadAccidents, carNumber, idNumber } = req.body;

  if (!name || !email || !phone || !insuranceType || !idNumber) {
    return res.status(400).send("שגיאה: נא למלא את כל השדות הנדרשים");
  }

  const newInsurance = new Insurance({
    name,
    email,
    phone,
    insuranceType,
    hasInsurance: hasInsurance || false,
    yearsOfInsurance: yearsOfInsurance || 0,
    hadAccidents: hadAccidents || false,
    carNumber: carNumber || '',
    idNumber,
  });

  try {
    await newInsurance.save();
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ehab.ab24@gmail.com',
      subject: 'בקשת הצעת ביטוח חדשה',
      text: `
        שם: ${name}
        אימייל: ${email}
        טלפון: ${phone}
        סוג הביטוח: ${insuranceType}
        האם יש ביטוח: ${hasInsurance ? 'כן' : 'לא'}
        מספר שנות ביטוח: ${yearsOfInsurance}
        היו תאונות: ${hadAccidents ? 'כן' : 'לא'}
        מספר רכב: ${carNumber}
        תעודת זהות: ${idNumber}
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send("שגיאה בשליחת המייל");
      }
      console.log("Email sent:", info.response);
      res.status(200).send("המייל נשלח בהצלחה");
    });
  } catch (error) {
    console.error('שגיאה בתהליך:', error);
    res.status(500).send('שגיאה בתהליך - בדוק את החיבור למסד הנתונים או שליחת המייל.');
  }
});

app.listen(port, () => {
  console.log(`השרת רץ על פורט ${port}`);
});