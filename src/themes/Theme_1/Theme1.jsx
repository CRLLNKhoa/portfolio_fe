import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { RiSunFill, RiMoonFill, RiMenuFill } from "react-icons/ri";
import {
  HiOutlineHome,
  HiOutlineMail,
  HiOutlineFolderOpen,
} from "react-icons/hi";
import { BiUser, BiBrain } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { Drawer } from "antd";
import Home from "./Home";
import About from "./About";
import Exp from "./Exp";
import Skill from "./Skill";
import Project from "./Project";
import Contact from "./Contact";
import { Fade, Slide } from "react-awesome-reveal";
import { useNavigate, useParams } from "react-router-dom";
import * as userService from "../../services/userService.js"
import Loading from "../../components/Loading/Loading";
import Not from "../../components/404/Not";

const cx = classNames.bind(styles);

export default function Theme1() {
  const {slug} = useParams()
  const [info, setInfo] = useState()
  const [isLoading, setLoading] = useState(false)

  const handleGetDetailUser = async (slug) => {
    setLoading(true)
    const res = await userService.getView(slug)
    setLoading(false)
    setInfo(res)
  }

  useEffect(() => {
    handleGetDetailUser(slug)
  }, [slug]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [error, setErro] = useState(false)
  useEffect(() => {
    if(info?.status==="ERR"){
      setErro(true)
    }
  }, [info]);

  console.log(info)


  const [theme, setTheme] = useState(true);
  const root = document.querySelector(":root");
  useEffect(() => {
    if (theme === false) {
      root.style.setProperty("--label-theme1", "#000000");
      root.style.setProperty("--label-theme1-2", "#ffffff");
      root.style.setProperty("--btn-theme1", "#000000");
      root.style.setProperty("--text-theme1", "#323232");
      root.style.setProperty("--bg-opacity", 0);
      root.style.setProperty("--bg-opacity-s", 1);
      root.style.setProperty("--label-theme1-3", "#F8F8F8");
      root.style.setProperty("--black", "#ffffff");
      root.style.setProperty("--black1", "#090909");
    }
    if (theme === true) {
      root.style.setProperty("--label-theme1", "#ffffff");
      root.style.setProperty("--label-theme1-2", "#000000");
      root.style.setProperty("--label-theme1-3", "#000000");
      root.style.setProperty("--btn-theme1", "#000000");
      root.style.setProperty("--text-theme1", "#bbbbbb");
      root.style.setProperty("--bg-opacity", 1);
      root.style.setProperty("--bg-opacity-s", 0);
      root.style.setProperty("--black", "#090909");
      root.style.setProperty("--black1", "#ffffff");
    }
  }, [theme]);
  return (
    <div className={cx("wrapper")}>
      {isLoading && <Loading tip="Đang tải thông tin!" />}
      {error && <Not tip="Người dùng không tồn tại!" />}
      <div className={cx("sidebar")}>
        <div className={cx("wrapper-sidebar")}>
          <ul>
            <a href="#home">
              <HiOutlineHome style={{ marginRight: 10 }} /> Home
            </a>
            <a href="#about">
              <BiUser style={{ marginRight: 10 }} /> About
            </a>
            <a href="#exp">
              <CgFileDocument style={{ marginRight: 10 }} /> Experience
            </a>
            <a href="#skill">
              <BiBrain style={{ marginRight: 10 }} /> Skill
            </a>
            <a href="#project">
              <HiOutlineFolderOpen style={{ marginRight: 10 }} /> Project
            </a>
            <a href="#contact">
              <HiOutlineMail style={{ marginRight: 10 }} /> Contact
            </a>
          </ul>
        </div>
      </div>
      <div className={cx("sidebar-top")}>
        <div className={cx("wrapper-sidebarTop")}>
          <span className={cx("logo")}>MyPortfolio</span>
          <div className={cx("right")}>
            {theme ? (
              <span onClick={() => setTheme(!theme)} className={cx("btn")}>
                <RiSunFill />
              </span>
            ) : (
              <span onClick={() => setTheme(!theme)} className={cx("btn")}>
                <RiMoonFill />
              </span>
            )}
            <span onClick={showDrawer} className={cx("btn")}>
              <RiMenuFill />
            </span>
          </div>
          <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            width={"50%"}
          >
            <div className={cx("wrapper-sidebar")}>
              <ul>
                <a href="#home">
                  <HiOutlineHome style={{ marginRight: 10 }} /> Home
                </a>
                <a href="#about">
                  <BiUser style={{ marginRight: 10 }} /> About
                </a>
                <a href="#exp">
                  <CgFileDocument style={{ marginRight: 10 }} /> Experience
                </a>
                <a href="#skill">
                  <BiBrain style={{ marginRight: 10 }} /> Skill
                </a>
                <a href="#project">
                  <HiOutlineFolderOpen style={{ marginRight: 10 }} /> Project
                </a>
                <a href="#contact">
                  <HiOutlineMail style={{ marginRight: 10 }} /> Contact
                </a>
              </ul>
            </div>
          </Drawer>
        </div>
      </div>
      <span onClick={() => setTheme(!theme)} className={cx("btn-theme")}>
        {theme ? <RiSunFill /> : <RiMoonFill />}
      </span>
      <div className={cx("content")}>
        <div className={cx("wrapper-content")}>
          <Slide>
            <Home data={info?.data} />
          </Slide>
          <About  data={info?.data} />
          <Exp  data={info?.data} />
          <Skill data={info?.data} />
          <Fade>
            <Project data={info?.data} />
          </Fade>
          <Contact data={info?.data} />
        </div>
      </div>
    </div>
  );
}
