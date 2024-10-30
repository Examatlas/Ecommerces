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
// import Drawer from "./components/Admin_Components/Drawer";
import SubSchools from "./components/Admin_Components/SubSchool";
import Dashboard from "./components/Admin_Components/Dashboard/Dashboard";
import Category from "./components/Admin_Components/Master/MasterCategory/Category";
import SubCategory from "./components/Admin_Components/Master/MasterCategory/SubCategory";
import Subject from "./components/Admin_Components/Master/Subject";
import Blog from "./components/Admin_Components/Blog/Blog"
import AddBlog from "./components/Admin_Components/Blog/AddBlog"
import EditBlog from "./components/Admin_Components/Blog/EditBlog";
import UserBlog from "./components/User_Components/Blog/UserBlog";
import BlogData from "./components/User_Components/Blog/BlogData";
import ExamBook from "./components/User_Components/Book/ExamBook";
import Exam from "./components/Admin_Components/Exam/Exam";
import AddExam from "./components/Admin_Components/Exam/AddExam";
import ExamList from "./components/Admin_Components/Exam/ExamList";
import EditExam from "./components/Admin_Components/Exam/EditExam";

function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/ECommerce") || location.pathname.startsWith("/Master");

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
            <Route path="/books/:examName" element={<ExamBook/>}/>
            {/* <Route path="/" element={<Book />} /> */}
            <Route path="/user" element={<Book />} />
            <Route path="/blog" element={<UserBlog/>}/>
            <Route path="/blogdata/:id" element={<BlogData/>}/>
            <Route path="/ecommerce/wishlist" element={<Wishlist />} />
            <Route path="/ecommerce/cart" element={<Cart />} />
            <Route path="/billingForm" element={<BillingForm />} />

            {/* Admin section */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/blog" element={<Blog/>} />
            <Route path="/admin/add-blog" element={<AddBlog/>} />
            <Route path="/admin/edit-blog/:id" element={<EditBlog/>} />
            <Route path="/ECommerce/addBook" element={<AddBook />} />
            <Route path="/admin/book" element={<Books />} />
            <Route path="/ECommerce/orderRecieve" element={<OrderReceive />} />
            <Route path="/ECommerce/editBook/:id" element={<EditBook />} />
            {/* <Route path="/admin/drawer" element={<Drawer/>} /> */}
            <Route path="/admin/subschool" element={<SubSchools/>} />
            <Route path="/admin/dashboard" element={<Dashboard/>} />
            <Route path="/admin/Exam" element={<Exam/>}/>
            <Route path="/ECommerce/addExam" element={<AddExam/>}/>
            <Route path="/admin/Exam" element={<ExamList/>}/>
            <Route path="/ECommerce/editExam/:id" element={<EditExam/>}/>

            <Route path="/Master/MasterCategory/Category" element={<Category/>} />
            <Route path="/Master/MasterCategory/Sub-Category" element={<SubCategory/>} />
            <Route path="/Master/Subject" element={<Subject/>} />
          
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
