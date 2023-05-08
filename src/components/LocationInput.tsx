import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const handleUseCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        // You can use the latitude and longitude values here for your app logic
        // feed this into uber eats api to get restaurants
      },
      (error) => {
        console.error("Error obtaining location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

const LocationInput = () => {
  return (
    <div className="main-frame-container max-w-600px d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <h1 className="text-center pb-5">uber-friends</h1>
        <p className="text-center">Enable location to find restaurants:</p>
        <div className="d-flex flex-column align-items-center">
          <Button
            onClick={handleUseCurrentLocation}
            variant="primary"
            type="submit"
            className=" mb-2"
          >
            Use Current Location
          </Button>
          <Link to="/start">
            <Button variant="primary" type="submit" className="mt-5">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
