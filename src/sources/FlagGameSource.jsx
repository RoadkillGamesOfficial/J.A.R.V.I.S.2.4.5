//Fetches the flag country codes map from FlagCDN
export const fetchCountryMap = async () => {
  try {
    const res = await fetch('https://flagcdn.com/en/codes.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error loading flags source:", err);
    throw err;
  }
};

//Utility helper to extract a clean data object with the PNG source URL
export const getRandomFlagData = (countryMap) => {
  const keys = Object.keys(countryMap);
  if (keys.length === 0) return { image: '', country: '' };
  
  const randomCode = keys[Math.floor(Math.random() * keys.length)];
  
  return {
    image: `https://flagcdn.com/w320/${randomCode}.png`,
    country: countryMap[randomCode]
  };
};