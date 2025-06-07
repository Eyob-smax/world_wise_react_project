import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../customhooks/useAuth";
import PageNav from "../pageNav/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState, type FormEvent } from "react";
import Message from "../../components/message/Message";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("jack@example.com");
  const [password, setPassword] = useState<string>("qwerty");
  const [error, setError] = useState<string | null>(null);

  const { login, user, isAuthenticated } = useAuth();
  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      login(email, password);
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    }
  }

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <main className={styles.login}>
      {error && <Message message={error} />}
      <PageNav />
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
