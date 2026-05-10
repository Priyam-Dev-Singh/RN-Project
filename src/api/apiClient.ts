const BASE_URL = 'https://openlibrary.org/search.json';

export const fetchFeedData = async (query: string, page: number) => {
  try {
   
    const q = query ? encodeURIComponent(query) : 'stoic';
    const url = `${BASE_URL}?q=${q}&page=${page}&limit=15`;
    
    const response = await fetch(url);
    
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.docs;
    
  } catch (err) {
    console.error('Fetch Error:', err);
    return null;
  }
};