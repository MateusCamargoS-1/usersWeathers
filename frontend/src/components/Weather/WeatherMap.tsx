import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import FlyToCity from "@/components/FlyToCity";

interface Props {
  lat: number;
  lon: number;
  city: string;
  description: string;
}

export const WeatherMap = ({ lat, lon, city, description }: Props) => (
  <div
    style={{
      height: "400px",
      width: "100%",
      marginTop: "2rem",
      borderRadius: "12px",
      overflow: "hidden",
    }}
  >
    <MapContainer center={[lat, lon]} zoom={10} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>
          {city} <br /> {description}
        </Popup>
      </Marker>
      <FlyToCity lat={lat} lon={lon} />
    </MapContainer>
  </div>
);
