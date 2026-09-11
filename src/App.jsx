import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Hotels from "./pages/Hotels.jsx";
import HotelDetail from "./pages/HotelDetail.jsx";
import FAQs from "./pages/FAQs.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import HotelPartners from "./pages/HotelPartners.jsx";
import Collaborate from "./pages/Collaborate.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";

import AccountLayout from "./pages/account/AccountLayout.jsx";
import Profile from "./pages/account/Profile.jsx";
import Bookings from "./pages/account/Bookings.jsx";
import Wishlist from "./pages/account/Wishlist.jsx";

import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Customers from "./pages/admin/Customers.jsx";
import Managers from "./pages/admin/Managers.jsx";
import HotelsAdmin from "./pages/admin/HotelsAdmin.jsx";
import Revenue from "./pages/admin/Revenue.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";

import ManagerDashboard from "./pages/manager/ManagerDashboard.jsx";
import ManagerProfile from "./pages/manager/ManagerProfile.jsx";

function PublicLayout({ children, transparent = false }) {
  return (
    <>
      <Navbar transparent={transparent} />
      <main className="page-transition">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<PublicLayout transparent><Home /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout transparent><Services /></PublicLayout>} />
      <Route path="/hotels" element={<PublicLayout><Hotels /></PublicLayout>} />
      <Route path="/hotels/:id" element={<PublicLayout><HotelDetail /></PublicLayout>} />
      <Route path="/faqs" element={<PublicLayout><FAQs /></PublicLayout>} />
      <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
      <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
      <Route path="/hotel-partners" element={<PublicLayout><HotelPartners /></PublicLayout>} />
      <Route path="/collaborate" element={<PublicLayout><Collaborate /></PublicLayout>} />
      <Route path="/blogs" element={<PublicLayout><Blogs /></PublicLayout>} />
      <Route path="/blogs/:id" element={<PublicLayout><BlogDetail /></PublicLayout>} />
      <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />
      <Route path="/superadmin/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route
        path="/checkout"
        element={
          <PublicLayout>
            <ProtectedRoute roles={["customer"]}>
              <Checkout />
            </ProtectedRoute>
          </PublicLayout>
        }
      />

      <Route
        path="/order-confirmation"
        element={
          <PublicLayout>
            <ProtectedRoute roles={["customer"]}>
              <OrderConfirmation />
            </ProtectedRoute>
          </PublicLayout>
        }
      />

      {/* Customer account */}
      <Route
        path="/account"
        element={
          <PublicLayout>
            <ProtectedRoute roles={["customer"]}>
              <AccountLayout />
            </ProtectedRoute>
          </PublicLayout>
        }
      >
        <Route index element={<Profile />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>

      {/* Superadmin */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute roles={["superadmin"]}>
            <AdminLayout role="superadmin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="managers" element={<Managers />} />
        <Route path="hotels" element={<HotelsAdmin />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Manager */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute roles={["manager"]}>
            <AdminLayout role="manager" />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManagerDashboard />} />
        <Route path="hotels" element={<HotelsAdmin />} />
        <Route path="profile" element={<ManagerProfile />} />
      </Route>

      <Route path="*" element={<PublicLayout><div className="pt-40 pb-24 text-center text-muted">Page not found.</div></PublicLayout>} />
    </Routes>
  );
}
