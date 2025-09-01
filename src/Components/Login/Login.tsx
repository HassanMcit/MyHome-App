import { Button, Form, Input } from "@heroui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import bgImage from "../../assets/1W7A7574.jpg";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useNavigate();

  async function sendUserLogin(value: Inputs) {
  toast.promise(
    axios.post(`https://linked-posts.routemisr.com/users/signin`, value),
    {
      pending: "Please Wait...",
      success: {
        render() {
          // هنا axios بيرجع response → response.data
          // console.log(); 
          router('/');
          return "Login Successful 🎉";
        },
      },
      error: "Fail",
    }
  );
}

  return (
    <div
      className={`min-h-screen  flex items-center px-4 sm:px-6 lg:px-8 justify-center bg-cover bg-center lg:bg-top`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImage})`,
      }}
    >
      <Form
        onSubmit={handleSubmit(sendUserLogin)}
        className="container w-xl  flex flex-col gap-4"
      >
        <Input
          {...register("email", {
            required: { value: true, message: "Input Required" },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid Email",
            },
          })}
          label="Email"
          classNames={{
            label: "!text-white font-semibold text-md lg:text-lg",
          }}
          labelPlacement="outside"
          placeholder="Enter your Email"
          type="email"
          autoComplete="username"
        />
        <p className="text-sm text-red-700 px-3">{errors?.email?.message}</p>
        <Input
          {...register("password", {
            required: { value: true, message: "Input Required" },
            pattern: {
              value:
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).{8,}$/,
              message: "Please enter a valid Password",
            },
          })}
          // errorMessage="Please enter a valid email"
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your email"
          type="password"
          autoComplete="new-password"
          classNames={{
            label: "!text-white font-semibold text-md lg:text-lg",
          }}
        />
        <div className="flex gap-2">
          <Button color="success" className="text-white" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="light">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}
