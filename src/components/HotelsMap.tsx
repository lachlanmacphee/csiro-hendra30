import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "preact/hooks";

const hotelPositions = [
  { name: "R Hotel", lat: -38.147760123458646, lng: 144.36584312600257 },
  { name: "Novotel", lat: -38.144888965753445, lng: 144.3635561971671 },
  { name: "Vue Apartments", lat: -38.147264835678584, lng: 144.366015483673 },
  { name: "Holiday Inn", lat: -38.148138361304106, lng: 144.35516771066162 },
  { name: "The Pier", lat: -38.14032031313499, lng: 144.36267523949658 },
];

let map: L.Map | null = null;

export default function HotelsMap() {
  useEffect(() => {
    if (!map) {
      map = L.map("map").setView([-38.1499384, 144.3617737], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      for (const hotel of hotelPositions) {
        const marker = L.marker([hotel.lat, hotel.lng]).addTo(map);
        marker.bindPopup(`<b>${hotel.name}</b>`);
      }
    }

    return () => {
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, []);

  return <div id="map" class="w-full h-72"></div>;
}
