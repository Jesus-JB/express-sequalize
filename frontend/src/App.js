import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gallery from "./pages/Gallery";
import UploadPhoto from "./pages/UploadPhoto";
import PhotoDetail from "./pages/PhotoDetail";
import Tags from "./pages/Tags";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import EditPhoto from "./pages/EditPhoto";
import Users from "./pages/Users";
import Info from "./pages/Info";
import Changelog from "./pages/Changelog";
import UserGallery from "./pages/UserGallery";
import CarpetaPublica from "./pages/CarpetaPublica";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadPhoto />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/photo/:id"
          element={
            <PrivateRoute>
              <PhotoDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/photo/:id/edit"
          element={
            <PrivateRoute>
              <EditPhoto />
            </PrivateRoute>
          }
        />
        <Route path="/tags" element={<Tags />} />
        <Route
          path="/users-management"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route path="/user/:id/gallery" element={<UserGallery />} />
        <Route path="/carpeta/:id" element={<CarpetaPublica />} />
        <Route path="/info" element={<Info />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
