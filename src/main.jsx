import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../src/App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.VITE_APP_BASENAME}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
