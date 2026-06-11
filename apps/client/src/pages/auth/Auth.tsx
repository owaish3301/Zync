import { Link, Outlet } from "react-router";

const Auth = () => {
  return (
    <div className="bg-background px-4 py-5 text-foreground min-h-dvh flex justify-center items-center">
      <div className="mx-auto flex w-full max-w-104 flex-col">
        <Link
          to="/auth/login"
          className="flex w-max items-center gap-2 rounded-full text-sm font-medium text-foreground-secondary"
          aria-label="Go to Zync login"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-surface-raised text-[13px] font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            Z
          </span>
          <span>Zync</span>
        </Link>

        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
