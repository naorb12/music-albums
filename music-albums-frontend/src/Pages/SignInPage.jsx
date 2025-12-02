import SigIn from "../Components/SignIn";
import { useNavigate } from "react-router";

export default function SignInPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  return (
    <>
      <h2>Please Sign In:</h2>
      <SigIn setIsLoggedIn={setIsLoggedIn} navigate={navigate} />
    </>
  );
}
