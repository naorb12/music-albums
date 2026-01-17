import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router";
export default function Header({ user, setUser }) {
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
          {user === "" ? (
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
          )}
        </header>
      )}
    </>
  );
}
