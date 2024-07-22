import { Button, Col, InputField, Row, getItem, setItem } from "@/components";
import { themesSetting } from "@/recoil";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { withRouter } from "next/router";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultValue = {
  username: "",
  password: "",
};

const Login = (props: any) => {
  const router = useRouter();

  const setTheme = useSetRecoilState(themesSetting);
  useEffect(() => {
    if (getItem("userdata").loggedIn !== undefined) {
      props.router.push("/dashboard");
    }
    setTheme({
      header: false,
      sidebar: false,
      footer: false,
      content: true,
    });
    return () => {
      setTheme({
        header: true,
        sidebar: true,
        footer: true,
        content: true,
      });
    };
  }, [props.router, setTheme]);

  const {
    register,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValue,
  });

  const [eposta, epostaDegistir] = useState("");
  const [sifre, sifreDegistir] = useState("");
  const [password, setPassword] = useState(true);

  function handleEPostaChange(e: any) {
    epostaDegistir(e.target.value);
  }

  function handleSifreChange(e: any) {
    sifreDegistir(e.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const varmiURL = `http://localhost:3000/api/kullanici/?eposta=${eposta}&sifre=${sifre}`;

    try {
      var resp = await fetch(varmiURL);
      if (resp.status === 200) {
        props.router.push("/dashboard");
        setItem("userdata", {
          loggedIn: true,
        });
        console.log("girildi");
      } else {
        toast.error("Yanlış kullanıcı adı veya şifre");
      }
    } catch (error) {
      console.log("Hata : " + error);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="login-box container" style={{ marginTop: "10%" }}>
      <ToastContainer />
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <div className="h1">
            <b>SENSOR </b>APP
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <p className="login-box-msg">Sign in to start your session</p>
            <InputField
              label="Username"
              name="username"
              type="text"
              onChange={handleEPostaChange}
              placeholder="Username"
              value={eposta}
              iconFormGroup="fas fa-envelope"
              formGroup
            />
            <InputField
              label="Password"
              name="password"
              type="text"
              value={sifre}
              onChange={handleSifreChange}
              register={register("password")}
              placeholder="Password"
              iconFormGroup={password ? "fas fa-eye-slash" : "fas fa-eye"}
              customeCss={password ? "password-hide-css" : ""}
              btnAction={() => setPassword(!password)}
              formGroup
              errors={errors?.password}
            />
            <Row>
              <Col size="12">
                <Button
                  loading
                  disabled={!isDirty || !isValid}
                  textLoading="Waiting"
                  type="submit"
                  color="primary"
                  block
                  title="Sign In"
                />
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
