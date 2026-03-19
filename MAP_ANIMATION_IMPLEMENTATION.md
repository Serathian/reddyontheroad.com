# Map Animation Implementation Guide
## Scroll-Driven Route Animation for Reddy on the Road

---

## 🎯 Animation Concept

As the user scrolls through weekly posts:
1. **Map flies** to the week's location
2. **Route line draws** progressively from previous week
3. **Pins animate** showing the stops
4. **Progress indicator** updates

---

## 🔧 Complete Mapbox Implementation

### Step 1: Initialize Map with Custom Style

```javascript
mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Get from https://account.mapbox.com

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [18.0, 55.0], // Center of Europe
  zoom: 4,
  pitch: 0,
  bearing: 0
});

// Store week data
const weekData = [
  {
    week: 1,
    locations: [
      { name: 'Rovaniemi', coords: [25.7294, 66.5039] },
      { name: 'Oulu', coords: [25.4714, 65.0121] },
      { name: 'Helsinki', coords: [24.9384, 60.1695] }
    ],
    center: [25.4, 64.0],
    zoom: 5
  },
  {
    week: 2,
    locations: [
      { name: 'Stockholm', coords: [18.0686, 59.3293] },
      { name: 'Gothenburg', coords: [11.9746, 57.7089] }
    ],
    center: [15.0, 58.5],
    zoom: 6
  },
  {
    week: 3,
    locations: [
      { name: 'Copenhagen', coords: [12.5683, 55.6761] },
      { name: 'Aarhus', coords: [10.2039, 56.1629] }
    ],
    center: [11.4, 56.0],
    zoom: 7
  }
  // ... add all weeks
];

// Generate complete route coordinates (all weeks in order)
const completeRoute = [];
weekData.forEach(week => {
  week.locations.forEach(loc => {
    completeRoute.push(loc.coords);
  });
});
```

### Step 2: Add Route Line (Animated Drawing)

```javascript
map.on('load', () => {
  
  // Add source for route line
  map.addSource('route', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: completeRoute
      }
    }
  });

  // Add route line layer with gradient
  map.addLayer({
    id: 'route-line',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': [
        'interpolate',
        ['linear'],
        ['line-progress'],
        0, '#F97316',  // Orange at start
        1, '#92400E'   // Brown at end
      ],
      'line-width': 4,
      'line-gradient': true
    }
  });

  // Add glow effect
  map.addLayer({
    id: 'route-line-glow',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#F97316',
      'line-width': 8,
      'line-blur': 4,
      'line-opacity': 0.4
    }
  }, 'route-line'); // Place behind main line

  // Add markers for all locations
  addAllMarkers();
});
```

### Step 3: Create Custom Markers

```javascript
// Create custom motorhome marker element
function createMarkerElement(locationName, isPast = false, isCurrent = false) {
  const el = document.createElement('div');
  el.className = 'map-marker';
  el.innerHTML = `
    <div class="marker-pin ${isPast ? 'past' : ''} ${isCurrent ? 'current' : ''}">
      <svg width="32" height="40" viewBox="0 0 32 40">
        <path d="M16 0C7.2 0 0 7.2 0 16c0 8.8 16 24 16 24s16-15.2 16-24c0-8.8-7.2-16-16-16z" 
              fill="${isCurrent ? '#F97316' : isPast ? '#B45309' : '#E5E5E5'}" 
              stroke="#78350F" 
              stroke-width="1"/>
        <text x="16" y="20" font-size="16" text-anchor="middle" fill="white">🚐</text>
      </svg>
    </div>
  `;
  
  return el;
}

// Add all markers to map
function addAllMarkers() {
  weekData.forEach((week, weekIndex) => {
    week.locations.forEach((location, locIndex) => {
      const el = createMarkerElement(location.name);
      
      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false
      }).setHTML(`
        <div class="map-tooltip">
          <strong>${location.name}</strong>
          <span>Week ${week.week}</span>
        </div>
      `);
      
      // Add marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(location.coords)
        .setPopup(popup)
        .addTo(map);
      
      // Store reference
      location.marker = marker;
      location.element = el;
    });
  });
}
```

### Step 4: Animate Route Based on Scroll

```javascript
let currentWeek = 0;

function updateMapToWeek(weekNumber) {
  const weekIndex = weekNumber - 1;
  const week = weekData[weekIndex];
  
  if (!week || currentWeek === weekNumber) return;
  currentWeek = weekNumber;
  
  // Fly to week's location
  map.flyTo({
    center: week.center,
    zoom: week.zoom,
    duration: 1500,
    essential: true,
    easing: (t) => t * (2 - t) // Ease out
  });
  
  // Update markers
  updateMarkerStates(weekNumber);
  
  // Animate route drawing
  animateRouteTo(weekNumber);
}

function updateMarkerStates(currentWeekNumber) {
  weekData.forEach((week) => {
    week.locations.forEach((location) => {
      const el = location.element;
      const pin = el.querySelector('.marker-pin');
      
      if (week.week < currentWeekNumber) {
        // Past weeks - muted
        pin.classList.add('past');
        pin.classList.remove('current');
      } else if (week.week === currentWeekNumber) {
        // Current week - highlighted
        pin.classList.add('current');
        pin.classList.remove('past');
        
        // Pulse animation
        setTimeout(() => {
          pin.style.animation = 'markerPulse 1s ease-out';
        }, 500);
      } else {
        // Future weeks - hidden or very faint
        pin.classList.remove('past', 'current');
      }
    });
  });
}

function animateRouteTo(weekNumber) {
  // Calculate how much of the route to show
  const weekIndex = weekNumber - 1;
  
  // Get coordinates up to current week
  let coordinatesUpToNow = [];
  for (let i = 0; i <= weekIndex; i++) {
    weekData[i].locations.forEach(loc => {
      coordinatesUpToNow.push(loc.coords);
    });
  }
  
  // Update route source
  map.getSource('route').setData({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: coordinatesUpToNow
    }
  });
}
```

### Step 5: Add CSS for Marker Animations

```css
/* Add to your CSS */
.map-marker {
  cursor: pointer;
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.marker-pin {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: all 300ms ease;
}

.marker-pin.current {
  transform: scale(1.2);
  filter: drop-shadow(0 4px 12px rgba(249, 115, 22, 0.6));
  animation: markerPulse 2s ease-in-out infinite;
}

.marker-pin.past {
  opacity: 0.6;
}

@keyframes markerPulse {
  0%, 100% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.3);
  }
}

.map-tooltip {
  font-family: 'Merriweather', serif;
  padding: 8px 12px;
}

.map-tooltip strong {
  display: block;
  font-size: 14px;
  color: #92400E;
  margin-bottom: 4px;
}

.map-tooltip span {
  font-size: 12px;
  color: #B45309;
}
```

### Step 6: Connect Scroll to Map Updates

```javascript
// Intersection Observer (already in prototype)
const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const weekNumber = parseInt(entry.target.dataset.week);
      
      // Update progress UI
      updateProgressIndicator(weekNumber);
      
      // Update map
      updateMapToWeek(weekNumber);
    }
  });
}, observerOptions);

// Observe all week cards
document.querySelectorAll('.week-card').forEach(card => {
  observer.observe(card);
});

function updateProgressIndicator(weekNumber) {
  const totalWeeks = weekData.length;
  const progress = (weekNumber / totalWeeks) * 100;
  
  document.getElementById('progress-text').textContent = `Week ${weekNumber} of ${totalWeeks}`;
  document.getElementById('progress-fill').style.width = `${progress}%`;
}
```

---

## 🎨 Advanced: Smooth Line Drawing Animation

For ultra-smooth line drawing effect using `stroke-dasharray`:

```javascript
function animateRouteTo(weekNumber) {
  const weekIndex = weekNumber - 1;
  
  // Calculate route up to this week
  let coords = [];
  for (let i = 0; i <= weekIndex; i++) {
    weekData[i].locations.forEach(loc => coords.push(loc.coords));
  }
  
  // Update source
  const routeGeoJSON = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coords
    }
  };
  
  map.getSource('route').setData(routeGeoJSON);
  
  // Calculate line length for animation
  const lineDistance = turf.length(routeGeoJSON, { units: 'kilometers' });
  
  // Animate drawing
  let start = null;
  const duration = 1000; // 1 second
  
  function animateFrame(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    
    // Calculate progress (0 to 1)
    const progress = Math.min(elapsed / duration, 1);
    
    // Update line dash
    map.setPaintProperty('route-line', 'line-dasharray', [
      progress * lineDistance,
      (1 - progress) * lineDistance
    ]);
    
    if (progress < 1) {
      requestAnimationFrame(animateFrame);
    }
  }
  
  requestAnimationFrame(animateFrame);
}
```

**Note:** Requires [Turf.js](https://turfjs.org/) for line length calculation:
```html
<script src='https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js'></script>
```

---

## 📱 Mobile Optimizations

```javascript
// Adjust map behavior for mobile
const isMobile = window.innerWidth < 1024;

if (isMobile) {
  // Disable map rotation
  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();
  
  // Faster animations
  weekData.forEach(week => {
    week.flyDuration = 1000; // Faster on mobile
  });
  
  // Simpler markers
  weekData.forEach(week => {
    week.locations.forEach(loc => {
      loc.marker.getElement().style.transform = 'scale(0.8)';
    });
  });
}

// Resize handler
window.addEventListener('resize', () => {
  map.resize();
});
```

---

## 🎯 Performance Optimizations

### 1. Lazy Load Map
```javascript
// Only initialize map when it enters viewport
const mapObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    initializeMap();
    mapObserver.disconnect();
  }
});

mapObserver.observe(document.getElementById('map'));
```

### 2. Throttle Scroll Events
```javascript
let scrollTimeout;
function handleScroll() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    // Update map
  }, 100);
}
```

### 3. Use Map's Built-in Clustering (if many stops)
```javascript
map.addSource('stops', {
  type: 'geojson',
  data: stopsGeoJSON,
  cluster: true,
  clusterMaxZoom: 8,
  clusterRadius: 50
});
```

---

## ♿ Accessibility Features

```javascript
// Add keyboard navigation for markers
weekData.forEach(week => {
  week.locations.forEach(location => {
    const el = location.marker.getElement();
    
    // Make focusable
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `View ${location.name}, Week ${week.week}`);
    
    // Keyboard activation
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        location.marker.togglePopup();
        scrollToWeek(week.week);
      }
    });
  });
});

// Announce map updates to screen readers
function announceMapUpdate(weekNumber, locationName) {
  const announcement = document.getElementById('map-announcement');
  if (announcement) {
    announcement.textContent = `Now viewing Week ${weekNumber}: ${locationName}`;
  }
}
```

Add to HTML:
```html
<div id="map-announcement" class="sr-only" aria-live="polite" aria-atomic="true"></div>
```

---

## 🚀 Complete Integration Example

```javascript
// main.js - Complete implementation

class JourneyMap {
  constructor(mapElement, weekData) {
    this.mapElement = mapElement;
    this.weekData = weekData;
    this.currentWeek = 0;
    this.markers = [];
    
    this.initMap();
    this.setupScrollObserver();
  }
  
  initMap() {
    mapboxgl.accessToken = 'YOUR_TOKEN';
    
    this.map = new mapboxgl.Map({
      container: this.mapElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [18.0, 55.0],
      zoom: 4
    });
    
    this.map.on('load', () => {
      this.addRouteLayer();
      this.addMarkers();
    });
  }
  
  addRouteLayer() {
    const allCoords = this.weekData.flatMap(w => 
      w.locations.map(l => l.coords)
    );
    
    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: allCoords
        }
      }
    });
    
    this.map.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      paint: {
        'line-color': '#F97316',
        'line-width': 4
      }
    });
  }
  
  addMarkers() {
    this.weekData.forEach(week => {
      week.locations.forEach(location => {
        const el = this.createMarkerElement(location.name);
        const marker = new mapboxgl.Marker(el)
          .setLngLat(location.coords)
          .addTo(this.map);
        
        this.markers.push({ week: week.week, marker, element: el });
      });
    });
  }
  
  createMarkerElement(name) {
    const el = document.createElement('div');
    el.className = 'map-marker';
    el.innerHTML = '🚐'; // Or SVG
    return el;
  }
  
  updateToWeek(weekNumber) {
    if (this.currentWeek === weekNumber) return;
    this.currentWeek = weekNumber;
    
    const week = this.weekData[weekNumber - 1];
    
    this.map.flyTo({
      center: week.center,
      zoom: week.zoom,
      duration: 1500
    });
    
    this.updateMarkers(weekNumber);
    this.updateRoute(weekNumber);
  }
  
  updateMarkers(currentWeek) {
    this.markers.forEach(({ week, element }) => {
      if (week === currentWeek) {
        element.classList.add('current');
      } else if (week < currentWeek) {
        element.classList.add('past');
      } else {
        element.classList.remove('current', 'past');
      }
    });
  }
  
  updateRoute(weekNumber) {
    const coords = [];
    for (let i = 0; i < weekNumber; i++) {
      this.weekData[i].locations.forEach(l => coords.push(l.coords));
    }
    
    this.map.getSource('route').setData({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coords
      }
    });
  }
  
  setupScrollObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const week = parseInt(entry.target.dataset.week);
            this.updateToWeek(week);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      }
    );
    
    document.querySelectorAll('.week-card').forEach(card => {
      observer.observe(card);
    });
  }
}

// Initialize
const journeyMap = new JourneyMap('map', weekData);
```

---

## 📊 Week Data Template

```javascript
// weeks-data.js
export const weekData = [
  {
    week: 1,
    dateRange: "May 15-21, 2022",
    title: "Arctic Circle to Helsinki",
    route: "Rovaniemi → Oulu → Helsinki",
    summary: "Our journey began...",
    stats: { stops: 3, distance: "640 km", photos: 34 },
    photos: ["week1-1.webp", "week1-2.webp", "week1-3.webp"],
    locations: [
      { name: "Rovaniemi", coords: [25.7294, 66.5039] },
      { name: "Oulu", coords: [25.4714, 65.0121] },
      { name: "Helsinki", coords: [24.9384, 60.1695] }
    ],
    center: [25.4, 64.0],
    zoom: 5
  },
  // ... more weeks
];
```

---

## 🎬 Ready to Implement!

**Files created:**
1. ✅ `MODERN_DESIGN_SYSTEM.md` - Full design specs
2. ✅ `modern-prototype.html` - Working HTML demo
3. ✅ `MAP_ANIMATION_IMPLEMENTATION.md` - This guide

**Next steps:**
1. Open `modern-prototype.html` in browser
2. Add your Mapbox token
3. Integrate the animation code from this guide
4. Add your real photos and content

The scroll-driven map animation will create a memorable, immersive experience! 🗺️✨
