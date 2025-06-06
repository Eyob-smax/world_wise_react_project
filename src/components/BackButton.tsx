import { useNavigate } from "react-router-dom";
import Button from "./Button";
export default function BackButton({ type }: { type?: string }) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      buttonType={type as "submit" | "reset" | "button" | undefined}
      type="back"
    >
      Back
    </Button>
  );
}
