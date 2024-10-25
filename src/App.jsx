import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/User_Components/Header";
import Book from "./components/User_Components/Book/Book";
import Wishlist from "./components/User_Components/Book/Wishlist";
import Cart from "./components/User_Components/Book/Cart";
import BillingForm from "./components/User_Components/Book/BillingForm";
import PaymentSuccess from "./components/User_Components/Book/PaymentSuccess";
import OrderHistory from "./components/User_Components/Book/OrderHistory";
import Footer from "./components/User_Components/Footer";
import EmailBox from "./components/User_Components/EmailBox";
import ResetPasswordForm from "./components/User_Components/ResetPasswordForm";
import { AuthProvider } from "./components/User_Components/Auth/AuthContext";
import BookDetail from "./components/User_Components/Book/BookDetail";

// admin section
import AddBook from "./components/Admin_Components/AddBook";
import Books from "./components/Admin_Components/Books";
import OrderReceive from "./components/Admin_Components/OrderReceive";
import EditBook from "./components/Admin_Components/EditBook";
import Login from "./components/Admin_Components/Login";

// Component that uses `useLocation`
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/ECommerce");

  return (
    <>
      {/* Show Header and Footer only for non-admin routes */}
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <Layout>
          <Routes>
            {/* User section */}
            <Route path="/examAtlas/reset-password-token" element={<ResetPasswordForm />} />
            <Route path="/emailbox" element={<EmailBox />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/OrderHistory" element={<OrderHistory />} />
            <Route path="/bookdetail/:id" element={<BookDetail />} />
            <Route path="/" element={<Book />} />
            <Route path="/user" element={<Book />} />
            <Route path="/ecommerce/wishlist" element={<Wishlist />} />
            <Route path="/ecommerce/cart" element={<Cart />} />
            <Route path="/billingForm" element={<BillingForm />} />

            {/* Admin section */}
            <Route path="/admin" element={<Login />} />
            <Route path="/ECommerce/addBook" element={<AddBook />} />
            <Route path="/admin/book" element={<Books />} />
            <Route path="/ECommerce/orderRecieve" element={<OrderReceive />} />
            <Route path="/ECommerce/editBook/:id" element={<EditBook />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
