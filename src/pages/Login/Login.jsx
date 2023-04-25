import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import InputComponent from "../../components/InputComponent/InputComponent";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as userSevice from "../../services/userService";
import {useDispatch} from "react-redux"
import * as message from "../../components/Message/Message"
import Loading from "../../components/Loading/Loading";
import { updateUser } from "../../redux/slides/userSlide"

const cx = classNames.bind(styles);

export default function Login() {
  const mutation = useMutationHooks((data) => userSevice.loginUser(data));
  const dispatch = useDispatch();
  const { data, isLoading } = mutation;

  const navigate = useNavigate()
  const handleLoginSuccess =  async() => {
    message.success(data.message)
    await handleGetDetailUser(data?.data?._id)
    navigate("/home")
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
        mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (data?.status === "ERR") {
      message.error(data.message)
    }
    if(data?.status === "OK"){
      handleLoginSuccess()
    }
  }, [data]);

  const handleGetDetailUser = async (id) => {
    const res = await userSevice.getDetailUser(id)
    dispatch(updateUser({...res?.data}))
}

  return (
    <div className={cx("wrapper")}>
    {isLoading &&  <Loading tip="Đang xử lí đăng nhập!" />}
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
          <h1>Xin Chào</h1>
          <div className={cx("list")}>
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
          </div>
          <button type="submit" className={cx("btn-login")}>LOGIN</button>
          <Link to="/register" style={{ color: "#34c595", fontSize: 12 }}>
            Đăng ký tài khoản
          </Link>
        </form>
      </div>
    </div>
  );
}
