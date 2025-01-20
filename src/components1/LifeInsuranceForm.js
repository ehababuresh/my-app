import React from 'react';

function LifeInsuranceForm({ formData, handleChange }) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="hasLifeInsurance">האם יש לך ביטוח חיים?</label>
        <select 
          id="hasLifeInsurance" 
          name="hasLifeInsurance" 
          value={formData.hasLifeInsurance} 
          onChange={handleChange} 
          required
        >
          <option value="">בחר</option>
          <option value="yes">כן</option>
          <option value="no">לא</option>
        </select>
      </div>

      {formData.hasLifeInsurance === 'yes' && (
        <div className="form-group">
          <label htmlFor="lifeInsuranceCompany">באיזו חברה?</label>
          <input 
            type="text" 
            id="lifeInsuranceCompany" 
            name="lifeInsuranceCompany" 
            value={formData.lifeInsuranceCompany} 
            onChange={handleChange} 
            placeholder="הכנס את שם החברה"
            required
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="idFiles">העלה עד 2 תמונות של תעודת זהות:</label>
        <input 
          type="file" 
          id="idFiles" 
          name="idFiles" 
          onChange={handleChange} 
          multiple 
          required
        />
      </div>
    </>
  );
}

export default LifeInsuranceForm;
