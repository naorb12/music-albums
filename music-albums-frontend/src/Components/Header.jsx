import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router";
export default function Header({ user, setUser }) {
  const navigate = useNavigate();
  const path = useLocation();

  const isSignInPage = path.pathname === "/sign-in";
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "left",
          gap: "10px",
          margin: "0",
          maxWidth: "100%",
        }}
      >
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/")}
          color="inherit"
        >
          {" "}
          Home
        </Link>
        {!isSignInPage &&
          (user === "" ? (
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/sign-in")}
              color="inherit"
            >
              Sign In
            </Link>
          ) : (
            <div>
              <label htmlFor="">Hello {user}, </label>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  setUser("");
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("userName");
                }}
                color="inherit"
              >
                Log Out
              </Link>
            </div>
          ))}
      </header>
    </>
  );
}
