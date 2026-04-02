# Register User dengan Hash Password & Validasi

## Bagian 1 – Membuat Register View

- Buat folder pada views dengan nama register dan tambahkan 2 file yaitu index.tsx dan register.module.scss

  ![alt text](image.png)

- Modifikasi file index.tsx ( pada folder views/auth/register/index.tsx)

  ```tsx
  import Link from "next/link";
  import styles from "./register.module.scss";

  const TampilanRegister = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.register_title}>Halaman Register</h1>
        <Link href="/auth/login" className={styles.link}>
          Ke halaman login
        </Link>
      </div>
    );
  };

  export default TampilanRegister;
  ```

- Modifikasi file register.tsx ( pada folder pages/auth/register.tsx )

  ```tsx
  import TampilanRegister from "@/views/auth/register";

  const HalamanRegister = () => {
    return (
      <>
        <TampilanRegister />
      </>
    );
  };

  export default HalamanRegister;
  ```

- Modifikasi register.module.scss

  ```scss
  .register {
    padding: 40px;
  }

  .register_title {
    font-size: 28px;
    font-weight: bold;
  }
  ```

- Tambahkan form inputan pada file index.tsx ( pada folder views/auth/register/index.tsx ) Form berisi:
  - Email

    ```tsx
    <div className={style.register__form_item}>
      <label htmlFor="email" className={style.register__form_item__label}>
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        className={style.register__form_item__input}
      />
    </div>
    ```

  - Full Name

    ```tsx
    <div className={style.register__form_item}>
      <label htmlFor="Fullname" className={style.register__form_item__label}>
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
    ```

  - Password

    ```tsx
    <div className={style.register__form_item}>
      <label htmlFor="Password" className={style.register__form_item__label}>
        Password
      </label>
      <input
        type="password"
        id="Password"
        name="Password"
        placeholder="Password"
        className={style.register__form_item__input}
      />
    </div>
    ```

- Modifikasi register.module.scss

  ```scss
  .register {
    min-height: 100vh;
    display: flex;
    flex-direction: column; /* <- penting */
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    padding: 20px;

    &__title {
      width: 100%;
      text-align: center;
      font-size: 36px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 40px;
    }

    &__form {
      background: #ffffff;
      width: 100%;
      max-width: 420px;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

      &__item {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        &__label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        &__input {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #ddd;
          font-size: 14px;
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: #2a5298;
            box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.2);
          }
        }

        button {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #2a5298;
          color: #ffffff;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;

          &:hover {
            background: #1e3c72;
            transform: translateY(-2px);
          }
        }
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .register {
        &__form {
          padding: 30px 20px;
        }

        &__title {
          font-size: 26px;
        }
      }
    }
  }

  /* Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  ```

- Jalankan browsernya http://localhost:3000/auth/register sehingga tampilan sebagai berikut

  ![alt text](image-1.png)

---
