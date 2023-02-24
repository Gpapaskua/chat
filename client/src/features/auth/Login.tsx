import { FormEvent, useRef, useState } from "react";
import { useAuth, useLogin } from "./hooks";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Login() {
  const [err, setErr] = useState("");
  const { setToken } = useAuth();
  const { mutate } = useLogin();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    if (!usernameRef.current || !passwordRef.current) return;
    setErr("");
    mutate(
      {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      },
      {
        onSuccess: ({ accessToken }) => {
          setToken(accessToken);
        },
        onError: (err) => {
          console.log(err);
          if (err.response?.status === 401) {
            setErr("username or password is incorrect.");
            return;
          }
          setErr("Something went wrong...");
        },
      }
    );
  };

  return (
    <div className="w-full min-h-screen bg-secondary flex justify-center items-center">
      <form
        onSubmit={handleAuth}
        className="bg-white w-full max-w-lg shadow-xl rounded-lg p-8 mb-4"
      >
        <div className="mb-6">
          <Input
            label="Username"
            id="username"
            size="small"
            ref={usernameRef}
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="mb-6">
          <Input
            size="small"
            label="Password"
            id="password"
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button size="small" className="w-full" type="submit">
            Sign In
          </Button>
        </div>
        {err ? <p className="text-center text-error pt-2">{err}</p> : null}
      </form>
    </div>
  );
}
