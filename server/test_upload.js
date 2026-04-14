const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

async function testUpload() {
  try {
    const formData = new FormData();
    formData.append('resumeText', 'This is a test resume content');
    formData.append('jobDesc', 'This is a test job description');

    const res = await axios.post('http://localhost:5000/api/analyze/upload', formData, {
      headers: formData.getHeaders(),
    });
    console.log("SUCCESS:", res.data);
  } catch (err) {
    if (err.response) {
      console.error("ERROR Response Data:", err.response.data);
    } else {
      console.error("ERROR Message:", err.message);
    }
  }
}

testUpload();
