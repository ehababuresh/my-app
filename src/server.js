require('dotenv').config(); // טוען משתני סביבה מקובץ .env
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// הגדרת Middleware
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

// הגדרת סכימה למידע של הצעת הביטוח
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

// יצירת מודל מהסכימה
const Insurance = mongoose.model('Insurance', insuranceSchema);

// מסלול לשליחת מייל ושמירת ההצעה למסד הנתונים
app.post('/send-email', async (req, res) => {
  const { name, email, phone, insuranceType, hasInsurance, yearsOfInsurance, hadAccidents, carNumber, idNumber } = req.body;

  // יצירת הצעה חדשה ושמירתה ב-MongoDB
  const newInsurance = new Insurance({
    name,
    email,
    phone,
    insuranceType,
    hasInsurance,
    yearsOfInsurance,
    hadAccidents,
    carNumber,
    idNumber,
  });

  try {
    await newInsurance.save(); // שמירת ההצעה ב-MongoDB

    // הגדרת חשבון המייל לשליחה (כגון Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // כתובת המייל שלך (יש לשמור ב-.env)
        pass: process.env.EMAIL_PASS  // סיסמת המייל שלך (יש לשמור ב-.env)
      }
    });

    // הגדרת תוכן המייל
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ehab.ab24@gmail.com', // כתובת הנמען (המייל שלך לקבלת הצעה)
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

    // שליחת המייל
    await transporter.sendMail(mailOptions);
    res.status(200).send('המייל נשלח בהצלחה');
  } catch (error) {
    console.error('שגיאה בתהליך:', error);
    res.status(500).send('שגיאה בתהליך - בדוק את החיבור למסד הנתונים או שליחת המייל.');
  }
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`השרת רץ על פורט ${port}`);
});
