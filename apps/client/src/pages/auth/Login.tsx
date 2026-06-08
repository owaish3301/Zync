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
    <div className="mt-8">
      <header>
        <p className="uppercase text-muted text-xs">Welcome back</p>
        <h1 className="font-semibold mt-2 text-3xl">Sign in to Zync</h1>
      </header>
      <main className="mt-4">
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
            className="bg-accent mt-8 w-full rounded py-2 px-4 text-center text-sm border border-transparent min-h-11 hover:cursor-pointer"
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </form>
        <p className="mt-4 text-center text-sm font-light">
          New to Zync?{" "}
          <Link
            to="/auth/signup"
            className="underline font-normal hover:cursor-pointer underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Login;
