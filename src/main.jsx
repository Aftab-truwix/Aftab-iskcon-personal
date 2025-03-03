import { StrictMode, useState } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import AdminDashboard from "./Components/Admin-Dashboard/AdminDashboard.jsx";
import AdminStats from "./Components/Admin-Dashboard/Stats/AdminStats.jsx";
import AdminEvents from "./Components/Admin-Dashboard/Events/AdminEvents.jsx";
import AdminServices from "./Components/Admin-Dashboard/Services/AdminServices.jsx";
import AdminDonation from "./Components/Admin-Dashboard/Donation/AdminDonation.jsx";
import AdminBlogs from "./Components/Admin-Dashboard/Blogs/AdminBlogs.jsx";
import AdminProducts from "./Components/Admin-Dashboard/Products/AdminProducts.jsx";
import CreateEvents from "./Components/Admin-Dashboard/Events/CreateEvents.jsx";
import AdminSingleEvent from "./Components/Admin-Dashboard/Events/AdminSingleEvent.jsx";
import BlogsPage from "./Components/BlogPageComponent/BlogPage.jsx";
import ContactPage from "./Components/ContactPage.jsx";
import CreateBlogs from "./Components/Admin-Dashboard/Blogs/CreateBlogs.jsx";
import AdminSingleBlog from "./Components/Admin-Dashboard/Blogs/AdminSingleBlog.jsx";
import AdminSingleService from "./Components/Admin-Dashboard/Services/AdminSingleService.jsx";
import CreateService from "./Components/Admin-Dashboard/Services/CreateService.jsx";
import AdminGuestHouse from "./Components/Admin-Dashboard/GuestHouse/AdminGuestHouse.jsx";
import AdminSingleGuestHouse from "./Components/Admin-Dashboard/GuestHouse/AdminSingleGuestHouse.jsx";
import CreateGuestHouse from "./Components/Admin-Dashboard/GuestHouse/CreateGuestHouse.jsx";
import AdminClasses from "./Components/Admin-Dashboard/Classes/AdminClasses.jsx";
import CreateOfflineClasses from "./Components/Admin-Dashboard/Classes/CreateOfflineClasses.jsx";
import SingleClass from "./Components/Admin-Dashboard/Classes/SingleClass.jsx";
import AdminMedia from "./Components/Admin-Dashboard/Media/AdminMedia.jsx";
import CreateMedia from "./Components/Admin-Dashboard/Media/CreateMedia.jsx";
import DonationPage from "./Pages/DonationPage.jsx";
import SinglePageDonation from "./Components/Admin-Dashboard/Donation/SinglePageDonation.jsx";
// import DonationForm from "./Components/DonationForm.jsx";
import ShopPage from "./Pages/ShopPage.jsx";
import SingleProduct from "./Components/ShopPageComponents/SingleProduct.jsx";
import AboutUs from "./Pages/AboutPage.jsx";
import CardDetails from "./Pages/CardDetails.jsx";
import EventPage from "./Pages/EventPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import SignInPage from "./Pages/SignInPage.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import CSRPage from "./Pages/CSRPage.jsx";
import CSRDonation from "./Components/Admin-Dashboard/CSRDonation/CSRDonation.jsx";
import SingleDonation from "./Components/DonationComponents/SingleDonation.jsx";
import SingleBlog from "./Components/BlogPageComponent/SingleBlog.jsx";
import MembershipPage from "./Pages/MembershipPage.jsx";
import CreateCSRDonationPage from "./Components/Admin-Dashboard/CSRDonation/CreateCSRDonation.jsx";
import SingleEventPage from "./Components/EventPageComponents/SingleEventPage.jsx";
import Profile from "./Components/UserProfile/Profile.jsx";
import DonatePage from "./Components/DonatePage.jsx";
import DonationHistory from "./Components/UserProfile/DonationHistory.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx"; // Ensure you have a ProtectedRoute component
import Checkout from "./Components/Checkout.jsx";
import Checkout2 from "./Components/Checkout2.jsx";
import Confirm from "./Pages/Confirm.jsx";
import AllProducts from "./Pages/AllProducts.jsx";
import TempleConstruction from "./Pages/TempleConstruction.jsx";
import DonationConfirm from "./Pages/DonationConfirm.jsx";
import DailyDarshan from "./Pages/DailyDarshanPage.jsx";
import LiveDarshan from "./Pages/LiveDarshan.jsx";
import AdminLiveDarshan from "./Components/Admin-Dashboard/LiveDarshan/AdminLiveDarshan.jsx";
import AdminDailyStory from "./Components/Admin-Dashboard/DailyStory/AdminDailyStory.jsx";
import { ToastContainer } from "react-toastify";
import StoryViewer from "./Components/Strory.jsx";
import Classes from "./Components/Classes.jsx";
import TempleConstructionPage from "./Components/TempleConstructionDonation.jsx";



const MainApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       
        <Route path="/" element={<App />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donation-history" element={<DonationHistory />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/temple-construction/donate" element={<TempleConstructionPage />} />

          {/* Admin Authentication */}
          <Route
            path="/admin-login"
            element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/stats" element={<AdminStats />} />
            <Route path="/admin-dashboard/events" element={<AdminEvents />} />
            <Route
              path="/admin-dashboard/events/create-event"
              element={<CreateEvents />}
            />
            <Route
              path="/admin-dashboard/events/single-event/:id"
              element={<AdminSingleEvent />}
            />
            <Route path="/admin-dashboard/blogs" element={<AdminBlogs />} />
            <Route
              path="/admin-dashboard/blogs/create-blog"
              element={<CreateBlogs />}
            />
            <Route
              path="/admin-dashboard/blogs/single-blog/:id"
              element={<AdminSingleBlog />}
            />
            <Route
              path="/admin-dashboard/services"
              element={<AdminServices />}
            />
            <Route
              path="/admin-dashboard/services/create-service"
              element={<CreateService />}
            />
            <Route
              path="/admin-dashboard/services/single-service/:id"
              element={<AdminSingleService />}
            />
            <Route
              path="/admin-dashboard/donation"
              element={<AdminDonation />}
            />
            <Route
              path="/admin-dashboard/donation/single-donation/:id"
              element={<SinglePageDonation />}
            />
            <Route
              path="/admin-dashboard/products"
              element={<AdminProducts />}
            />
            <Route
              path="/admin-dashboard/guest-house"
              element={<AdminGuestHouse />}
            />
            <Route
              path="/admin-dashboard/guest-house/create-guest-house"
              element={<CreateGuestHouse />}
            />
            <Route
              path="/admin-dashboard/guest-house/guest-house/:id"
              element={<AdminSingleGuestHouse />}
            />
            <Route path="/admin-dashboard/classes" element={<AdminClasses />} />
            <Route
              path="/admin-dashboard/classes/create-classes"
              element={<CreateOfflineClasses />}
            />
            <Route
              path="/admin-dashboard/classes/class/:id"
              element={<SingleClass />}
            />
            <Route path="/admin-dashboard/media" element={<AdminMedia />} />
            <Route
              path="/admin-dashboard/media/create-media"
              element={<CreateMedia />}
            />
            <Route
              path="/admin-dashboard/csrdonation"
              element={<CSRDonation />}
            />
            <Route
              path="/admin-dashboard/csrdonation/create-csr-donation"
              element={<CreateCSRDonationPage />}
            />

            <Route path="/admin-dashboard/live-darshan" element={<AdminLiveDarshan />} />
            <Route path="/admin-dashboard/story" element={<AdminDailyStory />} />
          </Route>

          {/* Public Routes */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/daily-darshan" element={<DailyDarshan />} />
          <Route path="/live-darshan" element={<LiveDarshan />} />
          <Route path="/story" element={<StoryViewer />} />
          <Route path="/shop/single-product/:id" element={<SingleProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/single-blog/:id" element={<SingleBlog />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/details/:id" element={<CardDetails />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/status/:id" element={<Confirm />} />
          <Route path="/donationStatus/:id" element={<DonationConfirm />} />
          <Route path="/classes" element={<Classes />} />
          <Route
            path="/donation/single-donation/:id"
            element={<SingleDonation />}
          />
          <Route path="/temple-construction" element={<TempleConstruction />} />
          {/* <Route path="/donate-form" element={<DonationForm />} /> */}
          <Route path="/events" element={<EventPage />} />
          <Route
            path="/events/single-event/:id"
            element={<SingleEventPage />}
          />
          <Route path="/csr" element={<CSRPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/donation-checkout" element={<Checkout2 />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>

        {/* Authentication Pages */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <MainApp />
  </StrictMode>
);
