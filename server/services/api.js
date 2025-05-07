import fetch from 'node-fetch';

const TICKETMASTER_KEY = process.env.TICKETMASTER_KEY;
const EVENTBRITE_KEY = process.env.EVENTBRITE_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

const queries = {
  irelandMusic: {
    countryCode: 'IE',
    classificationName: 'music',
    size: 250
  },
  irelandFestivals: {
    countryCode: 'IE',
    classificationName: 'festival',
    size: 200
  },
  ukFestivals: {
    countryCode: 'GB',
    classificationName: 'festival',
    size: 200
  },
  germanyFestivals: {
    countryCode: 'DE',
    classificationName: 'festival',
    size: 200
  },
  franceFestivals: {
    countryCode: 'FR',
    classificationName: 'festival',
    size: 200
  }
};

export async function fetchTicketmasterEvents(queryName) {
  const query = new URLSearchParams({
    apikey: TICKETMASTER_KEY,
    ...queries[queryName]
  }).toString();

  try {
    const response = await fetch(`${BASE_URL}/events.json?${query}`);
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error(`Ticketmaster ${queryName} fetch error:`, error);
    return [];
  }
}

export async function fetchEventbriteEvents() {
  try {
    const response = await fetch(
      `https://www.eventbriteapi.com/v3/events/search/?location.address=ireland&categories=103&expand=venue&token=${EVENTBRITE_KEY}`
    );
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Eventbrite fetch error:', error);
    return [];
  }
}

export async function fetchAllEvents() {
  const results = {};
  
  for (const queryName in queries) {
    results[queryName] = await fetchTicketmasterEvents(queryName);
  }
  
  results.eventbriteIreland = await fetchEventbriteEvents();
  
  return results;
}

export async function getEvents(params = {}) {
  return fetchTicketmasterEvents({
    countryCode: 'IE',
    classificationName: 'music',
    size: 250,
    ...params
  });
}

// Venue-specific function
export async function getVenues() {
  const query = new URLSearchParams({
    apikey: TICKETMASTER_KEY,
    countryCode: 'IE',
    size: 200
  }).toString();

  const response = await fetch(`${BASE_URL}/venues.json?${query}`);
  const data = await response.json();
  return data._embedded?.venues || [];
}


// At the bottom of api.js, ensure you're exporting it:
console.log('API exports:', {
  fetchAllEvents,
  fetchEventbriteEvents,
  fetchTicketmasterEvents,
  getVenues
});