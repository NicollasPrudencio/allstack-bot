import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <div
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-2
        sm:px-6 
        lg:px-8 
        bg-zinc-800
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="
            mt-2 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-white
          "
        >
          Login
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Auth;
