import SigIn from "../Components/SignIn";

export default function SignInPage({ setUser }) {
  return (
    <>
      <h2>Please Sign In:</h2>
      <SigIn setUser={setUser} />
    </>
  );
}
