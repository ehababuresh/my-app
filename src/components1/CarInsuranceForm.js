import React from 'react';

function CarInsuranceForm({ formData, handleChange }) {
  return (
    <>
      {formData.cars.map((car, index) => (
        <div key={index} className="car-insurance-form">
          <h4>פרטי רכב {index + 1}</h4>

          <div className="form-group">
            <label htmlFor={`hasInsurance-${index}`}>האם יש לך ביטוח בשלוש השנים האחרונות?</label>
            <select 
              id={`hasInsurance-${index}`} 
              name="hasInsurance" 
              value={car.hasInsurance} 
              onChange={(e) => handleChange(e, index)} 
              required
            >
              <option value="">בחר</option>
              <option value="yes">כן</option>
              <option value="no">לא</option>
            </select>
          </div>

          {car.hasInsurance === 'yes' && (
            <div className="form-group">
              <label htmlFor={`yearsOfInsurance-${index}`}>כמה שנים יש לך ביטוח?</label>
              <input 
                type="number" 
                id={`yearsOfInsurance-${index}`} 
                name="yearsOfInsurance" 
                value={car.yearsOfInsurance} 
                onChange={(e) => handleChange(e, index)} 
                placeholder="מספר השנים עם ביטוח" 
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor={`hadAccidents-${index}`}>האם היו לך תאונות בשלוש השנים האחרונות?</label>
            <select 
              id={`hadAccidents-${index}`} 
              name="hadAccidents" 
              value={car.hadAccidents} 
              onChange={(e) => handleChange(e, index)} 
              required
            >
              <option value="">בחר</option>
              <option value="yes">כן</option>
              <option value="no">לא</option>
            </select>
          </div>

          {car.hadAccidents === 'yes' && (
            <div className="form-group">
              <label htmlFor={`accidentsCount-${index}`}>כמה תאונות היו לך?</label>
              <input 
                type="number" 
                id={`accidentsCount-${index}`} 
                name="accidentsCount" 
                value={car.accidentsCount} 
                onChange={(e) => handleChange(e, index)} 
                placeholder="מספר התאונות" 
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor={`carNumber-${index}`}>מספר רכב:</label>
            <input 
              type="text" 
              id={`carNumber-${index}`} 
              name="carNumber" 
              value={car.carNumber} 
              onChange={(e) => handleChange(e, index)} 
              placeholder="הכנס מספר רכב" 
            />
          </div>

          <div className="form-group">
            <label htmlFor={`licenseFiles-${index}`}>העלה עד 2 תמונות של רישיון רכב:</label>
            <input 
              type="file" 
              id={`licenseFiles-${index}`} 
              name="licenseFiles" 
              onChange={(e) => handleChange(e, index)} 
              multiple 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`idFiles-${index}`}>העלה עד 2 תמונות של תעודת זהות:</label>
            <input 
              type="file" 
              id={`idFiles-${index}`} 
              name="idFiles" 
              onChange={(e) => handleChange(e, index)} 
              multiple 
              required
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default CarInsuranceForm;
