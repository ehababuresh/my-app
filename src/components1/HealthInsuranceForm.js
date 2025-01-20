import React from 'react';

function HealthInsuranceForm({ formData, handleChange }) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="hasHealthInsurance">האם יש לך ביטוח חיים?</label>
        <select 
          id="hasHealthInsurance" 
          name="hasHealthInsurance" 
          value={formData.hasHealthInsurance} 
          onChange={handleChange} 
          required
        >
          <option value="">בחר</option>
          <option value="yes">כן</option>
          <option value="no">לא</option>
        </select>
      </div>

      {formData.hasHealthInsurance === 'yes' && (
        <div className="form-group">
          <label htmlFor="healthInsuranceCompany">באיזו חברה?</label>
          <input 
            type="text" 
            id="healthInsuranceCompany" 
            name="healthInsuranceCompany" 
            value={formData.healthInsuranceCompany} 
            onChange={handleChange} 
            placeholder="הכנס את שם החברה"
            required
          />
        </div>
      )}
    </>
  );
}

export default HealthInsuranceForm;
