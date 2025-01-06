import L from "leaflet";

export function addTileLayer(map) {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        'Coded by <a href="https://github.com/DenisShagi" target="_blank">Shag Denis</a>',
    }).addTo(map);
}
