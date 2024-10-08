// Initialize the map
const map = L.map('map').setView([38.9072, -77.0369], 13); // Coordinates for Washington, D.C.

// Add a tile layer (Mapbox or OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.google.com/maps/@6.5636953,3.4047905,13.5z?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker
