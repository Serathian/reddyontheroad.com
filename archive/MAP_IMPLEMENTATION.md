# Map Implementation Guide
## Interactive Route Map for Reddy on the Road

---

## Recommended: Mapbox GL JS

**Why Mapbox?**
- Beautiful custom styling
- Smooth animations
- Excellent route line rendering
- Free tier: 50,000 loads/month
- Best performance

### Installation

```bash
npm install mapbox-gl
# or
yarn add mapbox-gl
```

Or use CDN:
```html
<link href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' rel='stylesheet' />
<script src='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js'></script>
```

---

## Implementation Example

### 1. HTML Structure

```html
<div id="map" class="map-container"></div>
```

### 2. Basic Map Setup

```javascript
// Get your free API key from https://account.mapbox.com/
mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12', // Or custom style
  center: [25.0, 60.0], // Start in Finland
  zoom: 4,
  pitch: 0, // Can add 3D tilt if desired
});
```

### 3. Route Data Structure

Create a `route.json` file with your journey data:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": 1,
        "location": "Rovaniemi, Finland",
        "date": "2022-05-15",
        "description": "Started our journey at the Arctic Circle",
        "photos": ["rovaniemi-1.jpg", "rovaniemi-2.jpg"]
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25.7294, 66.5039]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 2,
        "location": "Stockholm, Sweden",
        "date": "2022-05-18",
        "description": "Beautiful archipelago and fika time"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [18.0686, 59.3293]
      }
    },
    // ... more stops
  ]
}
```

### 4. Draw Route Line

```javascript
// Wait for map to load
map.on('load', () => {
  
  // Add route line
  map.addSource('route', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [25.7294, 66.5039], // Rovaniemi
          [18.0686, 59.3293], // Stockholm
          [12.5683, 55.6761], // Copenhagen
          // ... all coordinates in order
        ]
      }
    }
  });

  map.addLayer({
    id: 'route-line',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#F97316', // Orange accent
      'line-width': 4,
      'line-opacity': 0.8
    }
  });

});
```

### 5. Add Location Markers

```javascript
// Custom motorhome icon HTML
const motorhomeIcon = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" fill="#92400E" opacity="0.9"/>
    <text x="16" y="21" font-size="16" text-anchor="middle" fill="#FEF3C7">🚐</text>
  </svg>
`;

// Add markers for each stop
fetch('route.json')
  .then(response => response.json())
  .then(data => {
    data.features.forEach((stop, index) => {
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'map-marker';
      el.innerHTML = motorhomeIcon;
      el.style.cursor = 'pointer';
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="map-tooltip">
            <strong>${stop.properties.location}</strong>
            <span>${stop.properties.date}</span>
          </div>
        `);
      
      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat(stop.geometry.coordinates)
        .setPopup(popup)
        .addTo(map);
      
      // Click handler - scroll to timeline post
      el.addEventListener('click', () => {
        const postElement = document.getElementById(`post-${stop.properties.id}`);
        if (postElement) {
          postElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      
    });
  });
```

---

## Sync Map with Timeline Scroll

### Intersection Observer Approach

```javascript
// Highlight current location based on scroll position
const timelinePosts = document.querySelectorAll('.timeline-post');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px', // Trigger when post is in center
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const postId = entry.target.dataset.stopId;
      highlightMapLocation(postId);
    }
  });
}, observerOptions);

timelinePosts.forEach(post => observer.observe(post));

function highlightMapLocation(stopId) {
  // Remove previous highlight
  document.querySelectorAll('.map-marker').forEach(m => {
    m.classList.remove('active');
  });
  
  // Add highlight to current marker
  const activeMarker = document.querySelector(`[data-stop-id="${stopId}"]`);
  if (activeMarker) {
    activeMarker.classList.add('active');
    
    // Optional: Fly to location
    const coords = getCoordinatesForStop(stopId);
    map.flyTo({
      center: coords,
      zoom: 10,
      duration: 1500
    });
  }
}
```

### CSS for Active Marker

```css
.map-marker {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.map-marker:hover {
  transform: scale(1.2);
  z-index: 10;
}

.map-marker.active {
  transform: scale(1.3);
  filter: drop-shadow(0 4px 8px rgba(249, 115, 22, 0.5));
  z-index: 20;
}

.map-marker.active svg circle {
  fill: #F97316; /* Orange when active */
}
```

---

## Custom Map Style (Optional)

Create a warm, nostalgic map style to match your design:

1. Go to [Mapbox Studio](https://studio.mapbox.com/)
2. Create a new style
3. Customize colors to match your palette:
   - **Water:** `#38BDF8` (light blue)
   - **Land:** `#FEF3C7` (warm cream)
   - **Roads:** `#B45309` (brown)
   - **Labels:** `#78350F` (dark coffee)

Or use these pre-made styles:
- `mapbox://styles/mapbox/light-v11` - Clean, minimal
- `mapbox://styles/mapbox/outdoors-v12` - For road trips
- `mapbox://styles/mapbox/streets-v12` - Standard

---

## Performance Optimization

### Lazy Load Map

```javascript
// Only load map when it enters viewport
const mapObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initializeMap(); // Load Mapbox script and initialize
      mapObserver.unobserve(entry.target);
    }
  });
});

mapObserver.observe(document.getElementById('map'));
```

### Cluster Markers (if many stops)

```javascript
map.addSource('stops', {
  type: 'geojson',
  data: routeData,
  cluster: true,
  clusterMaxZoom: 10,
  clusterRadius: 50
});

// Add cluster circles
map.addLayer({
  id: 'clusters',
  type: 'circle',
  source: 'stops',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': '#F97316',
    'circle-radius': 20,
    'circle-opacity': 0.8
  }
});
```

---

## Alternative: Leaflet (Simpler Option)

If you prefer a lighter library:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

```javascript
// Initialize map
const map = L.map('map').setView([60.0, 25.0], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add route line
const routeLine = L.polyline([
  [66.5039, 25.7294], // Rovaniemi
  [59.3293, 18.0686], // Stockholm
  [55.6761, 12.5683], // Copenhagen
], {
  color: '#F97316',
  weight: 4,
  opacity: 0.8
}).addTo(map);

// Add markers
const motorhomeIcon = L.divIcon({
  html: '🚐',
  className: 'map-marker',
  iconSize: [32, 32]
});

L.marker([66.5039, 25.7294], { icon: motorhomeIcon })
  .bindPopup('<strong>Rovaniemi</strong><br>May 15, 2022')
  .addTo(map);
```

---

## Accessibility Considerations

### 1. Provide Text Alternative

```html
<div id="map" class="map-container" aria-label="Interactive map showing route from Finland to Spain">
  <!-- Map renders here -->
</div>

<!-- Text alternative below map -->
<div class="sr-only" aria-live="polite">
  <h3>Journey Stops</h3>
  <ol>
    <li>Rovaniemi, Finland - May 15, 2022</li>
    <li>Stockholm, Sweden - May 18, 2022</li>
    <li>Copenhagen, Denmark - May 25, 2022</li>
    <!-- ... -->
  </ol>
</div>
```

### 2. Keyboard Navigation

```javascript
// Make markers keyboard accessible
markers.forEach((marker, index) => {
  const el = marker.getElement();
  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `Stop ${index + 1}: ${stopName}`);
  
  // Handle keyboard activation
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      marker.togglePopup();
    }
  });
});
```

### 3. Screen Reader Announcements

```javascript
// Announce current location when scrolling
function announceCurrentStop(stopName, date) {
  const announcement = document.getElementById('map-announcement');
  announcement.textContent = `Now viewing: ${stopName}, ${date}`;
}
```

```html
<div id="map-announcement" class="sr-only" aria-live="polite" aria-atomic="true"></div>
```

---

## Mobile Considerations

### Touch-Friendly Markers

```css
.map-marker {
  /* Minimum tap target size */
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Disable Scroll Zoom on Mobile

```javascript
if (window.innerWidth < 768) {
  map.scrollZoom.disable();
  // Re-enable on touch
  map.on('touchstart', () => map.scrollZoom.enable());
}
```

---

## Estimated Timeline

- **Setup & API Key:** 15 minutes
- **Basic map with route line:** 1 hour
- **Add markers & popups:** 1 hour
- **Scroll sync with timeline:** 2 hours
- **Custom styling:** 1-2 hours
- **Testing & polish:** 1 hour

**Total:** ~6-8 hours for full implementation

---

## Resources

- [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Route Coordinates Tool](https://www.google.com/maps) - Click to get lat/lng
- [GeoJSON Validator](https://geojson.io/) - Test your route data

---

## Sample Route Coordinates

Here's a starter template for your Finland → Spain route:

```javascript
const routeCoordinates = [
  [25.7294, 66.5039],  // Rovaniemi, Finland
  [24.9384, 60.1695],  // Helsinki, Finland
  [18.0686, 59.3293],  // Stockholm, Sweden
  [12.5683, 55.6761],  // Copenhagen, Denmark
  [13.4050, 52.5200],  // Berlin, Germany
  [6.1294, 50.7753],   // Cologne, Germany
  [4.8952, 52.3702],   // Amsterdam, Netherlands
  [2.3522, 48.8566],   // Paris, France
  [-3.7038, 40.4168],  // Madrid, Spain
  [-0.3763, 39.4699],  // Valencia, Spain
  // ... then reverse for return journey
];
```

Use [Google Maps](https://www.google.com/maps) to find exact coordinates:
1. Right-click on location
2. Select coordinates (first number)
3. Format as `[longitude, latitude]` ⚠️ Note the order!
