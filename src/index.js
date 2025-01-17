import "babel-polyfill";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  addOffset,
  validateIp,
  addTileLayer,
  getAddress,
  getIp,
} from "./helpers";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  //   iconAnchor: [22, 94],
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
});
addTileLayer(map);
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;
  console.log(mapData);

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + " " + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const ip = await getIp(); // Получаем IP
    const mapData = await getAddress(ip); // Используем IP для получения информации
    setInfo(mapData); // Обновляем интерфейс
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
});
