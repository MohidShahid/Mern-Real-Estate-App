import { useForm } from "react-hook-form";
import Input from '../Components/Input'
function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    console.log("submit form");
  };
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <form
        className="flex w-[450px] h-[450px] flex-col bg-[#FAFAFA] p-7 gap-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="w-full text-center text-3xl font-medium">Login</h1>
        <Input
          type={"text"}
          placeholder={""}
          label={"Email"}
          {...register("email")}
          className={"w-full"}
        />
        <Input
          type={"password"}
          placeholder={""}
          label={"Password"}
          {...register("password")}
          className={"w-full"}
        />
        <Input type={"submit"} className={"bg-amber-300 w-full"} />
      </form>
    </div>
  );
}

export default Login;
