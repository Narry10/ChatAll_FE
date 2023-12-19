export const generateKeywords = async (param) => {
    try {
      const response = await fetch('http://127.0.0.1:6080/generate-keywords', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),  // Remove the semicolon at the end of this line
  
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      // Do something with the data if needed
      return data;
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  