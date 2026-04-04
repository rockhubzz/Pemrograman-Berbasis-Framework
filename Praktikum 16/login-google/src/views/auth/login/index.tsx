import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push, query } = useRouter();

    const callbackUrl: any = query.callbackUrl || "/";
    const [error, setError] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl,
            });

            if (!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {
                setIsLoading(false);
                const errorMessages: { [key: string]: string } = {
                  CredentialsSignin: "Email or password is incorrect",
                  AccessDenied: "Access denied",
                  SessionCallback: "Session error",
                  Default: "Unable to sign in",
                };

                setError(errorMessages[res?.error] || "Login failed");
            }
        } catch (error) {
            setIsLoading(false);
            setError("wrong email or password");
        }
    };

    return (
        <div className={style.login}>
            {error && <p className={style.login__error}>{error}</p>}
            <h1 className={style.login__title}>Halaman Login</h1>
            <div className={style.login__form}>
                <form onSubmit={handleSubmit}>
                    <div className={style.login__form__item}>
                        <label
                            htmlFor="email"
                            className={style.login__form__item__label}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={style.login__form__item__input}
                        />
                    </div>

                    <div className={style.login__form__item}>
                        <label
                            htmlFor="Password"
                            className={style.login__form__item__label}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className={style.login__form__item__input}
                        />
                    </div>
                    <button
                        type="submit"
                        className={style.login__form__item__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                    <br /><br />
                       <button
                        onClick={() => signIn("google", { callbackUrl, redirect: false })}
                        className={style.login_form_item__button}
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Sign in with Google"}
                      </button>

                </form>
                <br />
                <p className={style.login__form__item__text}>
                    Sudah punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
                </p>
            </div>
        </div>
    );
};

export default TampilanLogin;