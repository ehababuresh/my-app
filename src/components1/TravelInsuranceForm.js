import React, { useState, useEffect } from 'react';

function TravelInsuranceForm({ formData, handleChange, addInsuredPerson, removeInsuredPerson }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleDestinationChange = async (e) => {
    handleChange(e); // עדכון היעד בנתוני הטופס
    const value = e.target.value;
    if (value.length > 2) {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${value}`);
        if (response.ok) {
          const countries = await response.json();
          const countryNames = countries.map((country) => country.name.common);
          setSuggestions(countryNames);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="travel-insurance-form">
      <div className="form-group">
        <label htmlFor="destination">יעד:</label>
        <input 
          type="text" 
          id="destination" 
          name="destination" 
          value={formData.destination || ''} 
          onChange={handleDestinationChange} 
          required 
          placeholder="הכנס יעד נסיעה" 
          autoComplete="off"
        />
        {/* הצגת הצעות מדינות */}
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleChange({ target: { name: 'destination', value: suggestion } })}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="departureDate">תאריך יציאה:</label>
        <input 
          type="date" 
          id="departureDate" 
          name="departureDate" 
          value={formData.departureDate || ''} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="returnDate">תאריך חזרה:</label>
        <input 
          type="date" 
          id="returnDate" 
          name="returnDate" 
          value={formData.returnDate || ''} 
          onChange={handleChange} 
          required 
        />
      </div>

      <h3>פרטי מבוטחים</h3>
      {formData.insuredPersons.map((person, index) => (
        <div key={index} className="insured-person">
          <h4>מבוטח {index + 1}</h4>
          
          <div className="form-group">
            <label htmlFor={`name-${index}`}>שם:</label>
            <input 
              type="text" 
              id={`name-${index}`} 
              name="name" 
              value={person.name || ''} 
              onChange={(e) => handleChange(e, index, 'insuredPerson')} 
              required 
              placeholder="הכנס שם מלא" 
            />
          </div>

          <div className="form-group">
            <label htmlFor={`birthdate-${index}`}>תאריך לידה:</label>
            <input 
              type="date" 
              id={`birthdate-${index}`} 
              name="birthdate" 
              value={person.birthdate || ''} 
              onChange={(e) => handleChange(e, index, 'insuredPerson')} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor={`age-${index}`}>גיל:</label>
            <input 
              type="number" 
              id={`age-${index}`} 
              name="age" 
              value={person.age || ''} 
              onChange={(e) => handleChange(e, index, 'insuredPerson')} 
              required 
              placeholder="הכנס גיל" 
            />
          </div>

          <div className="form-group">
            <label htmlFor={`gender-${index}`}>מין:</label>
            <select 
              id={`gender-${index}`} 
              name="gender" 
              value={person.gender || 'male'} 
              onChange={(e) => handleChange(e, index, 'insuredPerson')} 
              required
            >
              <option value="male">זכר</option>
              <option value="female">נקבה</option>
            </select>
          </div>

          {person.gender === 'female' && (
            <div className="form-group">
              <label htmlFor={`isPregnant-${index}`}>האם בהריון:</label>
              <select 
                id={`isPregnant-${index}`} 
                name="isPregnant" 
                value={person.isPregnant || 'no'} 
                onChange={(e) => handleChange(e, index, 'insuredPerson')} 
              >
                <option value="no">לא</option>
                <option value="yes">כן</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor={`hasPreexistingConditions-${index}`}>מחלות קשות:</label>
            <input 
              type="text" 
              id={`hasPreexistingConditions-${index}`} 
              name="hasPreexistingConditions" 
              value={person.hasPreexistingConditions || ''} 
              onChange={(e) => handleChange(e, index, 'insuredPerson')} 
              placeholder="ציין מחלות (אם יש)" 
            />
          </div>

          <div className="form-group">
            <label htmlFor={`photos-${index}`}>העלאת תמונות (עד 10):</label>
            <input 
              type="file" 
              id={`photos-${index}`} 
              name="photos" 
              multiple 
              accept="image/*"
              onChange={(e) => handleChange(e, index, 'insuredPerson')} 
            />
          </div>

          <button type="button" onClick={() => removeInsuredPerson(index)} className="remove-button">
            הסר מבוטח
          </button>
        </div>
      ))}
      {formData.insuredPersons.length < 30 && (
        <button type="button" onClick={addInsuredPerson} className="add-button">
          הוסף מבוטח
        </button>
      )}
    </div>
  );
}

export default TravelInsuranceForm;
