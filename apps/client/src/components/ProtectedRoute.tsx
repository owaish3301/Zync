import { authClient } from "@/lib/auth-client";
import { Loader } from "@repo/ui";
import { Outlet, Navigate } from "react-router";

const ProtectedRoute = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Loader />;
  }

  if (!session) {
    <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
