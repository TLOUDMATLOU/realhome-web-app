import supabase from '@/lib/supabase';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const session = supabase.auth.session();

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;