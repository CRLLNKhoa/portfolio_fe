import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import InputComponent from "../../components/InputComponent/InputComponent";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as userSevice from "../../services/userService";
import * as message from "../../components/Message/Message";
import Loading from "../../components/Loading/Loading";

const cx = classNames.bind(styles);

export default function Register() {
  const mutation = useMutationHooks((data) => userSevice.registerUser(data));
  const { data, isLoading } = mutation;

  const navigate = useNavigate();
  const handleCreateSuccess = async () => {
    message.success(data.message);
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .required("Required"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Chưa đúng định dạng email!"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Tối thiểu 8 ký tự, ít nhất 1 chữ cái và 1 số!"
        ),
      comfirmPassword: Yup.string()
        .required("Required")
        .oneOf(
          [Yup.ref("password"), null],
          "Xác nhận mật khẩu sai!"
        ),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (data?.status === "ERR") {
      message.error(data.message);
    }
    if (data?.status === "CREATED") {
      handleCreateSuccess();
    }
  }, [data]);

  return (
    <div className={cx("wrapper")}>
      {isLoading && <Loading tip="Đang đăng ký thông tin!" />}
      <div className={cx("left")}>
        <img
          height={500}
          alt="?"
          src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/82b8d8efd3b0ac6382b9d0d71a99c6cf9dcefa23/img/bg.svg"
        />
      </div>
      <div className={cx("right")}>
        <form onSubmit={formik.handleSubmit}>
          <img
            width={120}
            alt="?"
            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/82b8d8efd3b0ac6382b9d0d71a99c6cf9dcefa23/img/avatar.svg"
          />
          <h1>Đăng ký</h1>
          <div className={cx("list")}>
          <InputComponent
              error
              errorMessage={formik.errors.full_name}
              label="Họ và tên"
              icon={<FaUser />}
              name="full_name"
              id="full_name"
              type="text"
              value={formik.values.full_name  }
              onChange={formik.handleChange}
            />
            <InputComponent
              error
              errorMessage={formik.errors.email}
              label="Email"
              icon={<FaUser />}
              name="email"
              id="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <InputComponent
              errorMessage={formik.errors.password}
              label="Mật khẩu"
              icon={<FaLock />}
              name="password"
              id="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <InputComponent
              errorMessage={formik.errors.comfirmPassword}
              label="Xác nhận mật khẩu"
              icon={<FaLock />}
              name="comfirmPassword"
              id="comfirmPassword"
              type="password"
              value={formik.values.comfirmPassword}
              onChange={formik.handleChange}
            />
          </div>
          <button type="submit" className={cx("btn-login")}>
            Đăng ký
          </button>
          <Link to="/" style={{  fontSize: 12 }}>Đăng nhập</Link>
        </form>
      </div>
    </div>
  );
}
