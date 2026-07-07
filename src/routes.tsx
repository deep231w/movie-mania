import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import HomePage from "./pages/homePage";

import { Navigate } from "react-router-dom";
import AccountPage from "./pages/account";
import ContentPage from "./pages/contentPage";
import OfflineContentPage from "./pages/offlineCOntentPage";

type RouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: RouteProps) {
  const user = localStorage.getItem("user");

  return user ? <>{children}</> : <Navigate to="/signin" replace />;
}

function PublicRoute({ children }: RouteProps) {
  const user = localStorage.getItem("user");

  return user ? <Navigate to="/home" replace /> : <>{children}</>;

}
export default function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" 
            element={
                <PublicRoute>
                    <SignUp/>
                </PublicRoute>
            } 
        />
        <Route path="/signin"
            element={
                <PublicRoute>
                    <SignIn/>
                </PublicRoute>
            }
        />
        <Route  
            path="/home" 
            element={
                <ProtectedRoute>
                    <HomePage/>
                </ProtectedRoute>
            }
        />
        <Route  
            path="/account" 
            element={
                <ProtectedRoute>
                    <AccountPage/>
                </ProtectedRoute>
            }
        />
        <Route 
            path="/content/:id"
            element={<ContentPage />}
        />
        <Route
            path="/offline-content/:id"
            element={
                <ProtectedRoute>
                    <OfflineContentPage/>
                </ProtectedRoute>
            }
        />
      </Routes>
    </BrowserRouter>
  );
}