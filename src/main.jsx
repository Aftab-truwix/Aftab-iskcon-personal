import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'
import AdminLogin from './Components/AdminLogin.jsx'
import AdminDashboard from './Components/Admin-Dashboard/AdminDashboard.jsx'
import AdminStats from './Components/Admin-Dashboard/Stats/AdminStats.jsx'
import AdminEvents from './Components/Admin-Dashboard/Events/AdminEvents.jsx'
import AdminServices from './Components/Admin-Dashboard/Services/AdminServices.jsx'
import AdminDonation from './Components/Admin-Dashboard/Donation/AdminDonation.jsx'
import AdminBlogs from './Components/Admin-Dashboard/Blogs/AdminBlogs.jsx'
import AdminProducts from './Components/Admin-Dashboard/Products/AdminProducts.jsx'
import CreateEvents from './Components/Admin-Dashboard/Events/CreateEvents.jsx'
import AdminSingleEvent from './Components/Admin-Dashboard/Events/AdminSingleEvent.jsx'
import ProductPage from './Components/ProductPage.jsx'
import BlogsPage from './Components/BlogPage.jsx'
import ContactPage from './Components/ContactPage.jsx'
import Cart from './Components/Cart.jsx'
import CreateBlogs from './Components/Admin-Dashboard/Blogs/CreateBlogs.jsx'
import AdminSingleBlog from './Components/Admin-Dashboard/Blogs/AdminSingleBlog.jsx'
import AdminSingleService from './Components/Admin-Dashboard/Services/AdminSingleService.jsx'
import CreateService from './Components/Admin-Dashboard/Services/CreateService.jsx'
import AdminGuestHouse from './Components/Admin-Dashboard/GuestHouse/AdminGuestHouse.jsx'
import AdminSingleGuestHouse from './Components/Admin-Dashboard/GuestHouse/AdminSingleGuestHouse.jsx'
import CreateGuestHouse from './Components/Admin-Dashboard/GuestHouse/CreateGuestHouse.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Homepage />} />
        {/* Admin Related routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path='/admin-dashboard/stats' element={<AdminStats />} />
        {/* Admin Events Related Routes */}
        <Route path='/admin-dashboard/events' element={<AdminEvents />} />
        <Route path='/admin-dashboard/events/create-event' element={<CreateEvents />} />
        <Route path='/admin-dashboard/events/single-event/:id' element={<AdminSingleEvent />} />
        {/* Admin Blogs Related Routes */}
        <Route path='/admin-dashboard/blogs' element={<AdminBlogs />} />
        <Route path='/admin-dashboard/blogs/create-blog' element={<CreateBlogs />} />
        <Route path='/admin-dashboard/blogs/single-blog/:id' element={<AdminSingleBlog />} />
        {/* Admin Services Related Routes */}
        <Route path='/admin-dashboard/services' element={<AdminServices />} />
        <Route path='/admin-dashboard/services/create-service' element={<CreateService />} />
        <Route path='/admin-dashboard/services/single-service/:id' element={<AdminSingleService />} />
        {/* Admin Donation Related Routes */}
        <Route path='/admin-dashboard/donation' element={<AdminDonation />} />
        {/* Admin Products Related Routes */}
        <Route path='/admin-dashboard/products' element={<AdminProducts />} />
        {/* Admin Guest House Related Routes */}
        <Route path='/admin-dashboard/guest-house' element={<AdminGuestHouse />} />
        <Route path='/admin-dashboard/guest-house/create-guest-house' element={<CreateGuestHouse />} />
        <Route path='/admin-dashboard/guest-house/guest-house/:id' element={<AdminSingleGuestHouse />} />
        <Route path="/shop" element={<ProductPage/>} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path="/contacts" element={<ContactPage/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
