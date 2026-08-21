if (listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2) {
  mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({
      container: 'map', // ID of the container div
      style: "mapbox://styles/mapbox/streets-v12",
      center: listing.geometry.coordinates, // [lng, lat]
      zoom: 9
  });

  const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat(listing.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h4>${listing.title}</h4><p>Exact Location provided after booking</p>`
        )
      )
      .addTo(map);
} else {
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    mapContainer.innerHTML = "<p class='text-muted text-center mt-3'>Map location not available for this listing.</p>";
  }
}