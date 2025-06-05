import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import useCities from "../../context/useCities";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IChangeCenterProps, TMapPosition } from "../../lib/types";
import { useGeolocation } from "../../customhooks/useGeoLocation";
import Button from "../Button";
import useURLPosition from "../../customhooks/useURLPosition";
function Map() {
  const { getPosition, isLoading, geoLocationposition } = useGeolocation();

  const { cities } = useCities();
  const [lat, lng] = useURLPosition();
  const [mapPosition, setMapPosition] = useState<TMapPosition>([40, 0]);

  useEffect(() => {
    if (lat && lng) setMapPosition([Number(lat), Number(lng)]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationposition) {
      setMapPosition([geoLocationposition.lat, geoLocationposition.lng]);
    }
  }, [geoLocationposition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoading ? "Loading" : " Get my location"}
      </Button>
      <MapContainer
        center={[Number(lat), Number(lng)]}
        zoom={9}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position?.lat || 0, city.position?.lng || 0]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: IChangeCenterProps) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;
