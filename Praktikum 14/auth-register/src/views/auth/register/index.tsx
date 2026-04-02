import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
const [isLoading, setIsLoading] = useState(false);
const { push } = useRouter();
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const fullname = formData.get("Fullname") as string;
    const password = formData.get("Password") as string;

    // Validation
    if (!email || email.trim() === "") {
      setError("Email must be filled");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must have at least 6 characters");
      setIsLoading(false);
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, password }),
    });

    // const result = await response.json();
    // console.log(result);
    if (response.status === 200) {
      form.reset();
      setIsLoading(false);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        push("/auth/login");
      }, 2000);
    } else {
      setIsLoading(false);
      setError(
        response.status === 400 ? "Email already exists" : "An error occurred",
      );
    }
  };
  return (
    <div className={style.register}>
        {error && <p className={style.register__error}>{error}</p>}
        {success && <p className={style.register__success}>{success}</p>}
      <h1 className={style.register__title}>Halaman Register</h1>
      <div className={style.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.register__form_item}>
            <label
              htmlFor="email"
              className={style.register__form_item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.register__form_item__input}
              required
            />
          </div>

          <div className={style.register__form_item}>
            <label
              htmlFor="Fullname"
              className={style.register__form_item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.register__form_item__input}
            />
          </div>

          <div className={style.register__form_item}>
            <label
              htmlFor="Password"
              className={style.register__form_item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              className={style.register__form_item__input}
              minLength={6}
              required
            />
          </div>

          <button type="submit" className={style.register_form_item__button} disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <br />
        <p className={style.register__form_item_text}>
          Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;