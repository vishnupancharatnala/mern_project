import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

// Auth
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
// import GenreList from "./pages/Admin/GenreList.jsx";

// Restricted
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";

import Home from "./pages/Home.jsx";
// import Profile from "./pages/User/Profile.jsx";
import AdminEmployeesList from "./pages/Admin/AdminEmployeesList.jsx";
import UpdateEmployee from "./pages/Admin/UpdateEmployee.jsx";
import CreateEmployee from "./pages/Admin/CreateEmployee.jsx";
// import AllMovies from "./pages/Movies/AllMovies.jsx";
// import MovieDetails from "./pages/Movies/MovieDetails.jsx";
// import AllComments from "./pages/Admin/AllComments.jsx";
// import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      {/* <Route path="/movies" element={<AllMovies />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/movies/:id" element={<MovieDetails />} /> */}

      <Route path="" element={<PrivateRoute />}>
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>

      <Route path="" element={<AdminRoute />}>
        {/* <Route path="/admin/movies/genre" element={<GenreList />} /> */}
        <Route path="/admin/employees/create" element={<CreateEmployee />} />
        <Route path="/admin/employees-list" element={<AdminEmployeesList />} />
        <Route path="/admin/employees/update/:id" element={<UpdateEmployee />} />
        {/* <Route path="/admin/movies/dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/admin/movies/comments" element={<AllComments />} /> */}
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

