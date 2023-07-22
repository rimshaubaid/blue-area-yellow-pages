import React from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  TrafficLayer,
  LoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 33.7182,
  lng: 73.0714
};

function MyComponent() {
{/*const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCYSe88Tj9SKG9fM_6e9j03R1Rmob685pU"
  })*/}

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

   return (                        
     <LoadScript googleMapsApiKey="AIzaSyCYSe88Tj9SKG9fM_6e9j03R1Rmob685pU">
       <GoogleMap
         mapContainerStyle={containerStyle}
         center={center}
         
         zoom={20}
         onLoad={onLoad}
         onUnmount={onUnmount}
       >
         <TrafficLayer autoUpdate />
       </GoogleMap>
     </LoadScript>
   );

}

export default React.memo(MyComponent)