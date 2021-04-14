import React, { useMemo, useState } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 0,
  lng: 0,
};

const zoom = 3;

const markers = Array(256)
  .fill(0)
  .map(() => {
    return {
      position: {
        lat: Math.random() * 180 - 90,
        lng: Math.random() * 360 - 180,
      },
    };
  });

export function defaultGoogleMapsMarkerUrl(color = "#ea4335") {
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-27 -27 54 86"><path fill="${color}" stroke="#fff" stroke-width="2" d="M22.5 13a26 26 0 10-45 0C-16.8 21.2-3 40-3 55a3 3 0 006 0c0-15 13.8-33.8 19.5-42"/><circle r="9" fill="#0007"/></svg>`
    )
  );
}

const blueUrl = defaultGoogleMapsMarkerUrl("blue");
const greenUrl = defaultGoogleMapsMarkerUrl("green");

export default function App() {
  const [mountExtraMarker, setMountExtraMarker] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, //Set API key in .env file
  });

  const scaledSize = useMemo(() => {
    if (window.google) {
      return new window.google.maps.Size(50, 50);
    }
  }, [window.google]);

  return isLoaded && markers ? (
    <GoogleMap
      {...{ mapContainerStyle, zoom, center }}
      onClick={() => setMountExtraMarker((v) => !v)}
    >
      {markers.map(({ position }, i) => (
        <Marker
          key={i}
          {...{ position }}
          icon={{
            url: blueUrl,
            scaledSize,
          }}
        />
      ))}
      {mountExtraMarker ? (
        <Marker
          position={{
            lat: 0,
            lng: 0,
          }}
          icon={{
            url: greenUrl,
            scaledSize,
          }}
        />
      ) : null}
    </GoogleMap>
  ) : (
    "Loading..."
  );
}
