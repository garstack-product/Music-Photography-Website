import cron from 'node-cron';
import { fetchAllEvents } from './api.js';
import { storeEvents } from './database.js';



// Add this date formatting utility function
function formatDate(dateInput) {
  if (!dateInput) return null;
  
  try {
    const date = new Date(dateInput);
    // Return null for invalid dates
    if (isNaN(date.getTime())) return null;
    return date.toISOString();
  } catch (e) {
    console.warn('Invalid date format:', dateInput);
    return null;
  }
}



async function processEventbriteEvents(events) {
  return events.map(e => ({
    ...e,
    id: `eb_${e.id}`,
    title: e.name?.text || 'Untitled Event',
    description: e.description?.text || '',
    venue: e.venue?.name || 'Unknown Venue',
    city: e.venue?.address?.city || '',
    date: formatDate(e.start?.utc),
    image_url: e.logo?.url || '',
    event_url: e.url || ''
  })).filter(e => e.date !== null); // Filter out events with invalid dates
}



async function processTicketmasterEvents(events) {
  return events.map(e => ({
    ...e,
    date: formatDate(e.dates?.start?.dateTime),
    venue: e._embedded?.venues?.[0]?.name || 'Unknown Venue',
    city: e._embedded?.venues?.[0]?.city?.name || ''
  })).filter(e => e.date !== null); // Filter out events with invalid dates
}



async function fetchAndStoreEvents() {
  console.log('Running event data fetch...');
  try {
    const results = await fetchAllEvents();
    
    // Process and store events
    await storeEvents(
      await processTicketmasterEvents(results.irelandMusic),
      'ticketmaster',
      'music',
      'IE'
    );
    
    await storeEvents(
      await processTicketmasterEvents(results.irelandFestivals),
      'ticketmaster',
      'festival',
      'IE'
    );
    
    await storeEvents(
      await processEventbriteEvents(results.eventbriteIreland),
      'eventbrite',
      'music',
      'IE'
    );

    console.log('Successfully stored all events');
  } catch (error) {
    console.error('Error in event fetch:', error);
  }
}

// Schedule daily at 3 AM
cron.schedule('0 3 * * *', fetchAndStoreEvents);

// Run immediately on startup
fetchAndStoreEvents().catch(console.error);