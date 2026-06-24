import { authClient } from "@/lib/auth-client";
import { Loader } from "@repo/ui";
import { Outlet, Navigate } from "react-router";

const ProtectedRoute = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Loader />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
