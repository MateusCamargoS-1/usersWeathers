import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface FlyToCityProps {
  lat: number;
  lon: number;
}

const FlyToCity = ({ lat, lon }: FlyToCityProps) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lon], 12, {
      duration: 2
    });
  }, [lat, lon, map]);

  return null;
};

export default FlyToCity;
