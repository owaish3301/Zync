import {
  Button,
  ContinueWithGithub,
  Divider,
  PasswordLabelledInput,
  LabelledInput,
} from "@repo/ui";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import { Link } from "react-router";

type SigninData = {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<SigninData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-1 flex-col pb-4 mt-4 ">
      <header>
        <h1 className="text-3xl font-semibold leading-[1.05] tracking-normal text-foreground">
          Sign in to Zync
        </h1>
      </header>

      <main className="mt-6">
        <div>
          <ContinueWithGithub />
          <Divider />
          <form autoComplete="on">
            <LabelledInput
              id="email"
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <PasswordLabelledInput
              id="password"
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              className="mt-7 flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_1px_2px_rgba(0,0,0,0.28)] transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:border-white/25 hover:bg-accent-hover hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_5px_rgba(0,0,0,0.32)] active:scale-[0.99] active:bg-accent-active disabled:pointer-events-none disabled:opacity-50"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm font-light text-muted">
          New to Zync?{" "}
          <Link
            to="/auth/signup"
            className="font-normal text-foreground-secondary underline decoration-white/20 underline-offset-4 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground hover:decoration-white/50"
          >
            Create an account
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Login;
