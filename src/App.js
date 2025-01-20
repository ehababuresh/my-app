import React, { useState } from 'react';
import './App.css';
import LoadingSpinner from './components1/LoadingSpinner';
import Notification from './components1/Notification';
import CarInsuranceForm from './components1/CarInsuranceForm';
import HealthInsuranceForm from './components1/HealthInsuranceForm';
import HomeInsuranceForm from './components1/HomeInsuranceForm';
import LifeInsuranceForm from './components1/LifeInsuranceForm';
import TravelInsuranceForm from './components1/TravelInsuranceForm';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    insuranceType: '',
    idNumber: '',
    destination: '', // שדה destination הוגדר
    departureDate: '',
    returnDate: '',
    age: '',
    cars: [
      {
        hasInsurance: '',
        yearsOfInsurance: '',
        hadAccidents: '',
        accidentsCount: '',
        carNumber: '',
        licenseFiles: [],
        idFiles: [],
      },
    ],
    insuredPersons: [
      {
        name: '',
        birthdate: '',
        age: '',
        gender: 'male',
        isPregnant: 'no',
        hasPreexistingConditions: '',
        photos: [],
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e, index = null, type = null) => {
    const { name, value, files } = e.target;
    if (type === 'car') {
      const updatedCars = [...formData.cars];
      updatedCars[index][name] = files ? Array.from(files).slice(0, 2) : value;
      setFormData({ ...formData, cars: updatedCars });
    } else if (type === 'insuredPerson') {
      const updatedPersons = [...formData.insuredPersons];
      updatedPersons[index][name] = files ? Array.from(files).slice(0, 10) : value;
      setFormData({ ...formData, insuredPersons: updatedPersons });
    } else {
      // נוודא שהשדה קיים ב-formData לפני שמנסים לעדכן אותו
      if (formData.hasOwnProperty(name)) {
        setFormData({
          ...formData,
          [name]: files ? Array.from(files).slice(0, 2) : value,
        });
      } else {
        console.warn(`Field "${name}" is not defined in formData`);
      }
    }
  };

  const addCar = () => {
    setFormData({
      ...formData,
      cars: [
        ...formData.cars,
        {
          hasInsurance: '',
          yearsOfInsurance: '',
          hadAccidents: '',
          accidentsCount: '',
          carNumber: '',
          licenseFiles: [],
          idFiles: [],
        },
      ],
    });
  };

  const removeCar = (index) => {
    const updatedCars = formData.cars.filter((_, i) => i !== index);
    setFormData({ ...formData, cars: updatedCars });
  };

  const addInsuredPerson = () => {
    setFormData({
      ...formData,
      insuredPersons: [
        ...formData.insuredPersons,
        {
          name: '',
          birthdate: '',
          age: '',
          gender: 'male',
          isPregnant: 'no',
          hasPreexistingConditions: '',
          photos: [],
        },
      ],
    });
  };

  const removeInsuredPerson = (index) => {
    const updatedPersons = formData.insuredPersons.filter((_, i) => i !== index);
    setFormData({ ...formData, insuredPersons: updatedPersons });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formDataToSend = {
      ...formData,
      cars: formData.cars.map(car => ({
        ...car,
        licenseFiles: car.licenseFiles.map((file) => file.name),
        idFiles: car.idFiles.map((file) => file.name),
      })),
      insuredPersons: formData.insuredPersons.map(person => ({
        ...person,
        photos: person.photos.map((file) => file.name),
      }))
    };

    fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    })
    .then(response => {
      setLoading(false);
      if (response.ok) {
        setMessage('ההצעה נשלחה בהצלחה!');
        setIsSuccess(true);
      } else {
        setMessage('הייתה בעיה בשליחת ההצעה.');
        setIsSuccess(false);
      }
    })
    .catch((err) => {
      setLoading(false);
      console.error('Error:', err);
      setMessage('הייתה בעיה בשליחת ההצעה.');
      setIsSuccess(false);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>קבל הצעת ביטוח</h1>
        <h3>למלא פרטים ונחזור אליך בהקדם</h3>
        <form onSubmit={handleSubmit} className="insurance-form">
          {/* שדות כלליים */}
          <div className="form-group">
            <label htmlFor="name">שם מלא:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required
              placeholder="הכנס שם מלא" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="idNumber">תעודת זהות:</label>
            <input 
              type="text" 
              id="idNumber" 
              name="idNumber" 
              value={formData.idNumber} 
              onChange={handleChange} 
              required
              placeholder="הכנס תעודת זהות" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">אימייל:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required
              placeholder="הכנס כתובת אימייל" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">מספר טלפון:</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required
              placeholder="הכנס מספר טלפון" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="insuranceType">סוג הביטוח המבוקש:</label>
            <select 
              id="insuranceType" 
              name="insuranceType" 
              value={formData.insuranceType} 
              onChange={handleChange} 
              required
            >
              <option value="">בחר סוג ביטוח</option>
              <option value="health">ביטוח בריאות</option>
              <option value="car">ביטוח רכב</option>
              <option value="home">ביטוח דירה</option>
              <option value="life">ביטוח חיים</option>
              <option value="travel">ביטוח נסיעות לחו"ל</option>
            </select>
          </div>

          {/* טפסים דינמיים עבור סוגי הביטוח */}
          {formData.insuranceType === 'car' && (
            <CarInsuranceForm 
              formData={formData} 
              handleChange={(e, index) => handleChange(e, index, 'car')} 
              addCar={addCar} 
              removeCar={removeCar} 
            />
          )}
          {formData.insuranceType === 'health' && <HealthInsuranceForm formData={formData} handleChange={handleChange} />}
          {formData.insuranceType === 'home' && <HomeInsuranceForm formData={formData} handleChange={handleChange} />}
          {formData.insuranceType === 'life' && <LifeInsuranceForm formData={formData} handleChange={handleChange} />}
          {formData.insuranceType === 'travel' && (
            <TravelInsuranceForm 
              formData={formData} 
              handleChange={(e, index) => handleChange(e, index, 'insuredPerson')} 
              addInsuredPerson={addInsuredPerson} 
              removeInsuredPerson={removeInsuredPerson} 
            />
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            שלח הצעה
          </button>
        </form>

        {loading && <LoadingSpinner />}
        {message && (
          <Notification message={message} isSuccess={isSuccess} />
        )}
      </header>
    </div>
  );
}

export default App;
