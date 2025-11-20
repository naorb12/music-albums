import Link from "@mui/material/Link";
export default function Header() {
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0",
          maxWidth: "100%",
        }}
      >
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            console.info("I'm a button.");
          }}
          color="inherit"
        >
          Sign In
        </Link>
      </header>
    </>
  );
}
