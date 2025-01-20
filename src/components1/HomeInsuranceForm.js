import React from 'react';

function HomeInsuranceForm({ formData, handleChange }) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="hasHomeInsurance">האם יש לך ביטוח דירה?</label>
        <select 
          id="hasHomeInsurance" 
          name="hasHomeInsurance" 
          value={formData.hasHomeInsurance} 
          onChange={handleChange} 
          required
        >
          <option value="">בחר</option>
          <option value="yes">כן</option>
          <option value="no">לא</option>
        </select>
      </div>

      {formData.hasHomeInsurance === 'yes' && (
        <div className="form-group">
          <label htmlFor="homeInsuranceCompany">באיזו חברה?</label>
          <input 
            type="text" 
            id="homeInsuranceCompany" 
            name="homeInsuranceCompany" 
            value={formData.homeInsuranceCompany} 
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

export default HomeInsuranceForm;
