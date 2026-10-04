// Map and Directions Service (SRS FR5 & SDD Section 5.6)
// Safely builds encoded Google Maps URLs without requiring paid Google Maps API keys

export function directionsUrl(place, city = '') {
  const query = city ? `${place}, ${city}` : place;
  const encoded = encodeURIComponent(query);
  return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
}

export function searchPlaceUrl(place, city = '') {
  const query = city ? `${place}, ${city}` : place;
  const encoded = encodeURIComponent(query);
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}

export function openDirections(place, city = '') {
  const url = directionsUrl(place, city);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) {
    console.warn('Popup blocked, fallback URL:', url);
    return false;
  }
  return true;
}
