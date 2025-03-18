function getBaseURL() {

    // production environment
    const production = import.meta.env.VITE_PROD;

    if(production==='true'){
      return "https://dominion-fc.onrender.com"; 
    }
    return "http://localhost:3000";
    
  }
  
  export default getBaseURL;