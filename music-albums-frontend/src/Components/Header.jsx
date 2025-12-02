import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router";
export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const path = useLocation();

  const showHeader = path.pathname !== "/sign-in";
  return (
    <>
      {showHeader && (
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0",
            maxWidth: "100%",
          }}
        >
          {!isLoggedIn ? (
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/sign-in")}
              color="inherit"
            >
              Sign In
            </Link>
          ) : (
            <Link
              component="button"
              variant="body2"
              onClick={() => setIsLoggedIn(false)}
              color="inherit"
            >
              Log Out
            </Link>
          )}
        </header>
      )}
    </>
  );
}
