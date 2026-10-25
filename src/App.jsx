import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { StaysProvider } from "./context/StaysContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CompareProvider } from "./context/CompareContext";
import Layout from "./components/Layout";
import { RequireCustomer, RequireStaff, RequireSuperadmin } from "./components/Guards";

import Home from "./pages/Home";
import Stays from "./pages/Stays";
import StayDetails from "./pages/StayDetails";
import Checkout from "./pages/Checkout";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import Itinerary from "./pages/Itinerary";
import { Login, Register } from "./pages/Auth";
import { Journal, JournalPost } from "./pages/Journal";
import { Collaborate, Contact } from "./pages/Forms";
import { About, Faqs, Legal, NotFound } from "./pages/Static";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Bookings from "./pages/admin/Bookings";
import Cancellations from "./pages/admin/Cancellations";
import StaysAdmin from "./pages/admin/StaysAdmin";
import { Customers, Managers, Logs, Requests } from "./pages/admin/People";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StaysProvider>
          <FavoritesProvider>
            <CompareProvider>
              <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: "#101A17", color: "#F8F4EC", borderRadius: "14px", padding: "14px 18px", fontWeight: 600, fontSize: "14px" }, success: { iconTheme: { primary: "#D4B483", secondary: "#101A17" } } }} />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="stays" element={<Stays />} />
                  <Route path="stays/:id" element={<StayDetails />} />
                  <Route path="compare" element={<Compare />} />
                  <Route path="itinerary" element={<Itinerary />} />
                  <Route path="journal" element={<Journal />} />
                  <Route path="journal/:id" element={<JournalPost />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="collaborate" element={<Collaborate />} />
                  <Route path="faqs" element={<Faqs />} />
                  <Route path="privacy" element={<Legal />} />
                  <Route path="terms" element={<Legal />} />
                  <Route element={<RequireCustomer />}>
                    <Route path="checkout/:id" element={<Checkout />} />
                    <Route path="booking-success/:id" element={<BookingSuccess />} />
                    <Route path="my-bookings" element={<MyBookings />} />
                    <Route path="favorites" element={<Favorites />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route element={<RequireStaff />}>
                  <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="cancellations" element={<Cancellations />} />
                    <Route path="stays" element={<StaysAdmin />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="requests" element={<Requests />} />
                    <Route element={<RequireSuperadmin />}>
                      <Route path="managers" element={<Managers />} />
                      <Route path="logs" element={<Logs />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </CompareProvider>
          </FavoritesProvider>
        </StaysProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
