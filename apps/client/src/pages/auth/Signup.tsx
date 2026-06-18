import {
  Button,
  ContinueWithGithub,
  Divider,
  LabelledInput,
  Loader,
  PasswordLabelledInput,
} from "@repo/ui";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { emailSchema } from "@repo/validators";
import { authClient } from "@/lib/auth-client";

type SignupData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  username: string;
};

type SignupErrors = {
  email: string | null;
  confirmPassword: string | null;
  signupError: string | null;
};

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    username: "",
  });

  const [error, setError] = useState<SignupErrors>({
    email: null,
    confirmPassword: null,
    signupError: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(1);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const checkEmailWhitelist = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    const validation = emailSchema.safeParse(formData.email);
    const nextError: SignupErrors = {
      email: validation.success
        ? null
        : (validation.error.issues[0]?.message ?? "Invalid email"),
      confirmPassword:
        formData.password === formData.confirmPassword
          ? formData.password.length < 8
            ? "Password should be minimum 8 characters long."
            : null
          : "Passwords do not match",
      signupError: null,
    };

    setError(nextError);

    if (nextError.email || nextError.confirmPassword) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/onboarding/check-email`,
        {
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (data.allowed === true) {
        setStage(2);
      } else {
        setError((prev) => ({
          ...prev,
          email:
            "Can not signup with this email. Try again with an email thats been invited to join zync.",
        }));
      }
    } catch (e) {
      console.error(e);
      setError((prev) => ({
        ...prev,
        email: "Failed to verify email. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    setLoading(true);
    await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      username: formData.username,
      fetchOptions: {
        onSuccess() {
          setLoading(false);
          navigate("/dashboard");
        },
        onError(ctx) {
          setLoading(false);
          setError((prev) => ({ ...prev, signupError: ctx.error.message }));
        },
      },
    });
  };

  return (
    <div className="flex flex-1 flex-col pb-4 mt-4 ">
      <header>
        <h1 className="text-3xl font-semibold leading-[1.05] tracking-normal text-foreground">
          Sign up on Zync
        </h1>
      </header>
      <main className="mt-6">
        <div>
          <ContinueWithGithub />
          <Divider />

          {stage === 1 && (
            <form autoComplete="on" onSubmit={checkEmailWhitelist}>
              <LabelledInput
                id="email"
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(error.email)}
                aria-describedby={error.email ? "email-error" : undefined}
              />
              {error.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="-mt-2 mb-4 text-sm text-red-400"
                >
                  {error.email}
                </p>
              )}
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
              <PasswordLabelledInput
                id="confirmPassword"
                label="Confirm password"
                type="password"
                name="confirmPassword"
                placeholder="Enter your password again"
                autoComplete="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                aria-invalid={Boolean(error.confirmPassword)}
                aria-describedby={
                  error.confirmPassword ? "confirm-password-error" : undefined
                }
              />
              {error.confirmPassword && (
                <p
                  id="confirm-password-error"
                  role="alert"
                  className="-mt-2 mb-4 text-sm text-red-400"
                >
                  {error.confirmPassword}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="mt-7 flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_1px_2px_rgba(0,0,0,0.28)] transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:border-white/25 hover:bg-accent-hover hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_5px_rgba(0,0,0,0.32)] active:scale-[0.99] active:bg-accent-active disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? <Loader /> : "Next (1/2)"}
              </Button>
            </form>
          )}

          {stage === 2 && (
            <form autoComplete="on" onSubmit={handleSubmit}>
              <LabelledInput
                id="name"
                label="Name"
                type="text"
                name="name"
                placeholder="John Doe"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
              <LabelledInput
                id="username"
                label="Username"
                type="text"
                name="username"
                placeholder="john_the_don_14"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
              />

              {error.signupError && (
                <p
                  id="signup-error"
                  role="alert"
                  className="mt-4 text-sm text-red-400"
                >
                  {error.signupError}
                </p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="mt-4 flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_1px_2px_rgba(0,0,0,0.28)] transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:border-white/25 hover:bg-accent-hover hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_5px_rgba(0,0,0,0.32)] active:scale-[0.99] active:bg-accent-active disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? <Loader /> : "Signup"}
              </Button>
            </form>
          )}
        </div>
        <p className="mt-5 text-center text-sm font-light text-muted">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-normal text-foreground-secondary underline decoration-white/20 underline-offset-4 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground hover:decoration-white/50"
          >
            Login
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Signup;
