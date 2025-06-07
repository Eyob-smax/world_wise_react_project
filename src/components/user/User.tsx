import { useNavigate } from "react-router-dom";
import { useAuth } from "../../customhooks/useAuth";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleClick() {
    const conf = confirm("Are u sure about this?");
    if (conf) {
      logout();
      navigate("/", { replace: true });
    }
  }

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
