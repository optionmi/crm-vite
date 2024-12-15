import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import locationAPI from "../api/locationAPI";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState(() =>
		sessionStorage.getItem("token")
			? JSON.parse(sessionStorage.getItem("token"))
			: null
	);
	const [User_type, setUser_type] = useState(() =>
		sessionStorage.getItem("user_type")
			? JSON.parse(sessionStorage.getItem("user_type"))
			: null
	);
	const [Team, setTeam] = useState(() =>
		sessionStorage.getItem("team")
			? JSON.parse(sessionStorage.getItem("team"))
			: null
	);
	const [Name, setName] = useState(() =>
		sessionStorage.getItem("name")
			? JSON.parse(sessionStorage.getItem("name"))
			: null
	);
	const [Email, setEmail] = useState(() =>
		sessionStorage.getItem("email")
			? JSON.parse(sessionStorage.getItem("email"))
			: null
	);
	const [ID, setID] = useState(() =>
		sessionStorage.getItem("id")
			? JSON.parse(sessionStorage.getItem("id"))
			: null
	);
	const [Message, setMessage] = useState(null);
	const [Loading, setLoading] = useState(false);

	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [locationID, setLocationID] = useState(() =>
		sessionStorage.getItem("location")
			? JSON.parse(sessionStorage.getItem("location"))
			: null
	);

	const navigate = useNavigate();

	let loginUser = async (e) => {
		e.preventDefault();
		setLoading(true);
		let response = await fetch(
			`${import.meta.env.VITE_APP_BASEURL}/api/auth/login/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: e.target.email.value,
					password: e.target.password.value,
				}),
			}
		);
		let data = await response.json();
		if (data.user_type === "salesperson") {
			if (data.team === "SalesTeam") {
				if ("geolocation" in navigator) {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							const { latitude, longitude } = position.coords;
							setLatitude(latitude);
							setLongitude(longitude);

							locationAPI.hasLocation(data.token, data.id).then((info) => {
								if (info.message === "yes") {
									const locationId = info.locationId;
									console.log(info.locationId);
									setLocationID(locationId);
									sessionStorage.setItem(
										"location",
										JSON.stringify(locationId)
									);

									const locationData = {
										latitude: latitude,
										longitude: longitude,
									};

									locationAPI.updateLocation(
										locationId,
										locationData,
										data.token
									);
								} else {
									const locationData = {
										latitude: latitude,
										longitude: longitude,
										id: data.id,
									};

									locationAPI
										.createLocation(locationData, data.token)
										.then((data) => {
											sessionStorage.setItem(
												"location",
												JSON.stringify(data.id)
											);
										});
								}
							});
						},
						(error) => {
							// Handle location permission denied or errors
							console.error("Error getting location:", error);
							setMessage(
								"Error getting location. Please enable location services."
							);
							setAuthToken(null);
							setUser_type(null);
							setEmail(null);
							setName(null);
							setID(null);
							setLatitude(null);
							setLongitude(null);
							setLocationID(null);
							sessionStorage.removeItem("token");
							sessionStorage.removeItem("user_type");
							sessionStorage.removeItem("email");
							sessionStorage.removeItem("name");
							sessionStorage.removeItem("id");
							if (sessionStorage.getItem("team")) {
								setTeam(null);
								sessionStorage.removeItem("team");
								sessionStorage.removeItem("location");
							}
							navigate("/login");
						},
						{ enableHighAccuracy: true }
					);
				} else {
					console.error("Geolocation is not available in your browser.");
					setMessage("Geolocation is not available in your browser.");
					setAuthToken(null);
					setUser_type(null);
					setEmail(null);
					setName(null);
					setID(null);
					setLatitude(null);
					setLongitude(null);
					setLocationID(null);
					sessionStorage.removeItem("token");
					sessionStorage.removeItem("user_type");
					sessionStorage.removeItem("email");
					sessionStorage.removeItem("name");
					sessionStorage.removeItem("id");
					if (sessionStorage.getItem("team")) {
						setTeam(null);
						sessionStorage.removeItem("team");
						sessionStorage.removeItem("location");
					}
					navigate("/login");
				}
			}
		}
		if (response.status === 200) {
			setAuthToken(data.token);
			setUser_type(data.user_type);
			setName(data.name);
			setEmail(data.email);
			setID(data.id);
			sessionStorage.setItem("token", JSON.stringify(data.token));
			sessionStorage.setItem("user_type", JSON.stringify(data.user_type));
			sessionStorage.setItem("name", JSON.stringify(data.name));
			sessionStorage.setItem("email", JSON.stringify(data.email));
			sessionStorage.setItem("id", JSON.stringify(data.id));
			if (data.team) {
				setTeam(data.team);
				sessionStorage.setItem("team", JSON.stringify(data.team));
			}
			navigate("/");
		} else {
			setMessage(data.message);
		}
		setLoading(false);
	};

	let logoutUser = async (e) => {
		setAuthToken(null);
		setUser_type(null);
		setEmail(null);
		setName(null);
		setID(null);
		setLatitude(null);
		setLongitude(null);
		setLocationID(null);
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_type");
		sessionStorage.removeItem("email");
		sessionStorage.removeItem("name");
		sessionStorage.removeItem("id");
		if (sessionStorage.getItem("team")) {
			setTeam(null);
			sessionStorage.removeItem("team");
			sessionStorage.removeItem("location");
		}
		navigate("/login");
	};

	let contextData = {
		authToken,
		User_type,
		Message,
		Loading,
		loginUser,
		logoutUser,
		Team,
		Name,
		Email,
		ID,
		setLatitude,
		setLongitude,
		locationID,
		setMessage,
	};

	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};
