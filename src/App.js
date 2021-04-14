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
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" viewBox="-27 -27 54 86">
        <path d="
          M 22.51666049 13
          A 26 26 0 1 0 -22.51666049 13
          C -16.780896127 21.191520442 -3 40 -3 55
          A 3 3 0 0 0 3 55
          C 3 40 16.780896127 21.191520442 22.51666049 13"
            fill="${color}" stroke="white" stroke-width="2" />
        <circle cx="0" cy="0" r="9" fill="#0007" />
      </svg>`
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
