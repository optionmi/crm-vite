import React, { useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import locationAPI from "../../api/locationAPI";
import AuthContext from "../../context/AuthContext";
import L from "leaflet";

function ViewLocation() {
    const mapRef = useRef(null);
    let { authToken } = useContext(AuthContext);
    const { id } = useParams();

    useEffect(() => {
        locationAPI.getLocationByID(id, authToken).then((data) => {
            if (!mapRef.current) {
                const map = L.map("map").setView(
                    [data?.latitude, data?.longitude],
                    13
                );

                L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                }).addTo(map);

                // Create a marker at the user's current location
                const marker = L.marker([
                    data?.latitude,
                    data?.longitude,
                ]).addTo(map);

                mapRef.current = map;
            }
        });
    }, []);

    return (
        <div>
            <Header />
            <Sidebar />
            <div className="location">
                <div className="header d-flex justify-content-between">
                    <h4>View Location</h4>
                </div>

                <div id="map"></div>
            </div>
        </div>
    );
}

export default ViewLocation;
