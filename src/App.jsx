import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RecipesPage from "./pages/RecipesPage";
import SignUpPage from "./pages/SignUpPage";
import { getFromLocalStorage } from "./utils/localStorage";
import SingleRecipePage from "./pages/SingleRecipePage";
import AboutPage from "./pages/AboutPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";

import { ToastContainer } from "react-toastify";
function App() {
  const user = getFromLocalStorage();
  return (
    <BrowserRouter>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='recipes' element={<RecipesPage />} />
        <Route path='contact' element={<ContactPage />} />
        <Route path='about' element={<AboutPage />} />
        <Route
          path='add'
          element={
            <ProtectedRoute id={user?.email}>
              <CreateRecipePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='edit/:id'
          element={
            <ProtectedRoute id={user?.email}>
              <CreateRecipePage />
            </ProtectedRoute>
          }
        />
        <Route path='sign-up' element={<SignUpPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='profile/:id' element={<ProfilePage />} />
        <Route
          path='profile/edit'
          element={
            <ProtectedRoute id={user?.email}>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='recipes/:id'
          element={
            <ProtectedRoute id={user?.email}>
              <SingleRecipePage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
