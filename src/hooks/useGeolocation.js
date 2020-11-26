import React, { useState, useEffect } from "react";

function useGeoLocation(positionOptions) {
  const [geoLocation, setGeoLocation] = useState({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setGeoLocation({ loading: true });
    const onPosition = (position) => {
      setGeoLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        loading: false,
        error: null,
      });
    };
    const onError = (error) => {
      setGeoLocation({ position: null, loading: false, error: error });
    };
    navigator.geolocation.getCurrentPosition(onPosition, onError);
    const listener = navigator.geolocation.getCurrentPosition(
      onPosition,
      onError
    );
    return () => navigator.geolocation.clearWatch(listener);
  }, []);

  return [geoLocation, setGeoLocation];
}

export default useGeoLocation;
