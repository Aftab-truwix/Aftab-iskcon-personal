import { StrictMode, useState } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
const AdminLogin = React.lazy(() => import("./Components/AdminLogin.jsx"));
const AdminDashboard = React.lazy(() =>
  import("./Components/Admin-Dashboard/AdminDashboard.jsx")
);
const AdminStats = React.lazy(() =>
  import("./Components/Admin-Dashboard/Stats/AdminStats.jsx")
);
const AdminEvents = React.lazy(() =>
  import("./Components/Admin-Dashboard/Events/AdminEvents.jsx")
);
const AdminServices = React.lazy(() =>
  import("./Components/Admin-Dashboard/Services/AdminServices.jsx")
);
const AdminDonation = React.lazy(() =>
  import("./Components/Admin-Dashboard/Donation/AdminDonation.jsx")
);
const AdminBlogs = React.lazy(() =>
  import("./Components/Admin-Dashboard/Blogs/AdminBlogs.jsx")
);
const AdminProducts = React.lazy(() =>
  import("./Components/Admin-Dashboard/Products/AdminProducts.jsx")
);
const CreateEvents = React.lazy(() =>
  import("./Components/Admin-Dashboard/Events/CreateEvents.jsx")
);
const AdminSingleEvent = React.lazy(() =>
  import("./Components/Admin-Dashboard/Events/AdminSingleEvent.jsx")
);
const BlogsPage = React.lazy(() =>
  import("./Components/BlogPageComponent/BlogPage.jsx")
);
const ContactPage = React.lazy(() => import("./Components/ContactPage.jsx"));
const CreateBlogs = React.lazy(() =>
  import("./Components/Admin-Dashboard/Blogs/CreateBlogs.jsx")
);
const AdminSingleBlog = React.lazy(() =>
  import("./Components/Admin-Dashboard/Blogs/AdminSingleBlog.jsx")
);
const AdminSingleService = React.lazy(() =>
  import("./Components/Admin-Dashboard/Services/AdminSingleService.jsx")
);
const CreateService = React.lazy(() =>
  import("./Components/Admin-Dashboard/Services/CreateService.jsx")
);
const AdminGuestHouse = React.lazy(() =>
  import("./Components/Admin-Dashboard/GuestHouse/AdminGuestHouse.jsx")
);
const AdminSingleGuestHouse = React.lazy(() =>
  import("./Components/Admin-Dashboard/GuestHouse/AdminSingleGuestHouse.jsx")
);
const CreateGuestHouse = React.lazy(() =>
  import("./Components/Admin-Dashboard/GuestHouse/CreateGuestHouse.jsx")
);
const AdminClasses = React.lazy(() =>
  import("./Components/Admin-Dashboard/Classes/AdminClasses.jsx")
);
const CreateOfflineClasses = React.lazy(() =>
  import("./Components/Admin-Dashboard/Classes/CreateOfflineClasses.jsx")
);
const SingleClass = React.lazy(() =>
  import("./Components/Admin-Dashboard/Classes/SingleClass.jsx")
);
const AdminMedia = React.lazy(() =>
  import("./Components/Admin-Dashboard/Media/AdminMedia.jsx")
);
const CreateMedia = React.lazy(() =>
  import("./Components/Admin-Dashboard/Media/CreateMedia.jsx")
);
const DonationPage = React.lazy(() => import("./Pages/DonationPage.jsx"));
const SinglePageDonation = React.lazy(() =>
  import("./Components/Admin-Dashboard/Donation/SinglePageDonation.jsx")
);
const ShopPage = React.lazy(() => import("./Pages/ShopPage.jsx"));
const SingleProduct = React.lazy(() =>
  import("./Components/ShopPageComponents/SingleProduct.jsx")
);
const AboutUs = React.lazy(() => import("./Pages/AboutPage.jsx"));
const CardDetails = React.lazy(() => import("./Pages/CardDetails.jsx"));
const EventPage = React.lazy(() => import("./Pages/EventPage.jsx"));
const SignUpPage = React.lazy(() => import("./Pages/SignUpPage.jsx"));
const SignInPage = React.lazy(() => import("./Pages/SignInPage.jsx"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword.jsx"));
const ResetPassword = React.lazy(() => import("./Pages/ResetPassword.jsx"));
const CSRPage = React.lazy(() => import("./Pages/CSRPage.jsx"));
const CSRDonation = React.lazy(() =>
  import("./Components/Admin-Dashboard/CSRDonation/CSRDonation.jsx")
);
const SingleDonation = React.lazy(() =>
  import("./Components/DonationComponents/SingleDonation.jsx")
);
const SingleBlog = React.lazy(() =>
  import("./Components/BlogPageComponent/SingleBlog.jsx")
);
const MembershipPage = React.lazy(() => import("./Pages/MembershipPage.jsx"));
const CreateCSRDonationPage = React.lazy(() =>
  import("./Components/Admin-Dashboard/CSRDonation/CreateCSRDonation.jsx")
);
const SingleEventPage = React.lazy(() =>
  import("./Components/EventPageComponents/SingleEventPage.jsx")
);
const Profile = React.lazy(() => import("./Components/UserProfile/Profile.jsx"));
const DonatePage = React.lazy(() => import("./Components/DonatePage.jsx"));
const DonationHistory = React.lazy(() =>
  import("./Components/UserProfile/DonationHistory.jsx")
);
const ProtectedRoute = React.lazy(() => import("./Components/ProtectedRoute.jsx"));
const Checkout = React.lazy(() => import("./Components/Checkout.jsx"));
const Checkout2 = React.lazy(() => import("./Components/Checkout2.jsx"));
const Confirm = React.lazy(() => import("./Pages/Confirm.jsx"));
const AllProducts = React.lazy(() => import("./Pages/AllProducts.jsx"));
const TempleConstruction = React.lazy(() => import("./Pages/TempleConstruction.jsx"));
const DonationConfirm = React.lazy(() => import("./Pages/DonationConfirm.jsx"));
const DailyDarshan = React.lazy(() => import("./Pages/DailyDarshanPage.jsx"));
const LiveDarshan = React.lazy(() => import("./Pages/LiveDarshan.jsx"));
const AdminLiveDarshan = React.lazy(() =>
  import("./Components/Admin-Dashboard/LiveDarshan/AdminLiveDarshan.jsx")
);
const AdminDailyStory = React.lazy(() =>
  import("./Components/Admin-Dashboard/DailyStory/AdminDailyStory.jsx")
);
const StoryViewer = React.lazy(() => import("./Components/Strory.jsx"));
const Classes = React.lazy(() => import("./Components/Classes.jsx"));
const TempleConstructionPage = React.lazy(() =>
  import("./Components/TempleConstructionDonation.jsx")
);
import ErrorBoundary from "./Components/ErrorBoundary.jsx";

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
          <Route
            path="/temple-construction/donate"
            element={<TempleConstructionPage />}
          />

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

            <Route
              path="/admin-dashboard/live-darshan"
              element={<AdminLiveDarshan />}
            />
            <Route
              path="/admin-dashboard/story"
              element={<AdminDailyStory />}
            />
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
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <MainApp />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
