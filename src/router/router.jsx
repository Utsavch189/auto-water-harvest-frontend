import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SensorData from "../pages/SensorData";
import Tasks from "../pages/Tasks";
import Page404 from "../pages/Page404";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}>
                <Route path="/" index element={<Dashboard />} />
                <Route path="/sensor" element={<SensorData />} />
                <Route path="/tasks" element={<Tasks />} />
				<Route path="*" element={<Page404/>} />
			</Route>

			<Route path="/login" element={<Login />} />

		</>
	)
);

export default router;