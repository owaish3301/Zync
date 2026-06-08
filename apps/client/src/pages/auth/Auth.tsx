import { Link, Outlet } from "react-router";

const Auth = () => {
  return (
    <div className="px-4 py-6">
      <div>
        {/* left panel */}
        <Link to="/auth/login" className="flex gap-2 items-center">
          <span className="bg-accent px-2 py-1 rounded text-sm font-semibold">
            Z
          </span>
          <span className="text-sm font-semibold">Zync</span>
        </Link>

        {/* login or signup page */}
        <Outlet />
      </div>
      <div>{/* right panel - desktop only */}</div>
    </div>
  );
};

export default Auth;
