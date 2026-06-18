import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/authApi";

import ErrorMessage from "../components/ui/ErrorMessage";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      setSaving(true);

      const result = await login(form);

      localStorage.setItem("token", result.token);
      localStorage.setItem(
        "user",
        JSON.stringify(result.user)
      );

      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-900">
        Login
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Sign in to access the Mini Business Operations App.
      </p>

      {error ? (
        <ErrorMessage message={error} />
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="mt-4 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;