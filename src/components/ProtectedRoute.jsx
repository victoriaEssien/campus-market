

import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const accessToken = Cookies.get('token');
    
    if (!accessToken) {
        // Redirect to login if token is not found
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;
