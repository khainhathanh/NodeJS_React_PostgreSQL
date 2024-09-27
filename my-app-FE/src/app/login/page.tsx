"use client";
import "@/styles/app.css";
import  { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useAccessControl } from "../../component/common/accessControl/useAccessControl";
import SignIn from "./signin";
import SignUp from "./signup";
import { findUser } from "../../adapter/currencyApi/swr/hooks/findUser";
import { useForm } from "react-hook-form";
function Login() {
  const auth = useAccessControl();
  const [isCheckLogin, setIsCheckLogin] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [isSentCode, setIsSentCode] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const [statusForm, setStatusForm] = useState("signIn");

  useEffect(() => {
    const fetchData = async () => {
      //dùng axios rút gọn code bỏ qua cofig header loằng ngoằng
      await findUser({user : watch('username') ,pass : watch('password')})
    };

    if (isCheckLogin) {
      fetchData().then(() => {setIsSentCode(true);})
        .catch((e: AxiosError) => {
          if (e.response?.status === 401) {
            setError("ログインに失敗しました。入力内容を確認してください");
          }
          return setError(e.response?.statusText);
        });
      setIsCheckLogin(false);
    }
  }, [isCheckLogin]);

  const submitCode = async () => {
    await signIn("credentials", {
      username: watch('username'),
      code: watch('otp'),
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        // ページ遷移処理は今の所全てLayout.tsで扱うようにした。
      } else {
        setError("ログインに失敗しました。入力内容を確認してください");
      }
    });
  };
  return (

    <div className="login">
      <h2 className={statusForm == "signIn" ? "active" : ""} onClick={() => setStatusForm("signIn")}>sign in </h2>
      <h2 className={statusForm == "signUp" ? "active" : ""} onClick={() => setStatusForm("signUp")}>sign up</h2>

      {statusForm == "signUp" ? 
      <SignUp/> : 
      <SignIn 
        register = {register}
        isSentCode={isSentCode} 
        submitCode= {handleSubmit(submitCode)}
        setIsCheckLogin={setIsCheckLogin} />
      }
    </div>
  );
}

export default Login;
