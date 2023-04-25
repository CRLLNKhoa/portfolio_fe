import { BsYoutube } from "react-icons/bs";
import { FaFacebookF,FaGitAlt,FaJava,FaPython,FaPhp,FaLaravel } from "react-icons/fa";
import {
  AiOutlineGitlab,
  AiOutlineGithub,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiFillPhone,
  AiFillHtml5,
  AiOutlineAntDesign
} from "react-icons/ai";
import { SiZalo,SiTailwindcss,SiMui,SiCsharp,SiMysql } from "react-icons/si";
import {DiCss3,DiJavascript,DiReact,DiMongodb,DiSass,DiBootstrap} from "react-icons/di"
import {TbBrandRedux,TbBrandTypescript,TbBrandReactNative} from "react-icons/tb"
import {IoLogoNodejs } from "react-icons/io"
import {CgCPlusPlus} from "react-icons/cg"

export const socialConstant = {
  youtube: <BsYoutube />,
  facebook: <FaFacebookF size={18} />,
  gitlab: <AiOutlineGitlab />,
  github: <AiOutlineGithub />,
  linkedin: <AiFillLinkedin />,
  twitter: <AiOutlineTwitter />,
  phone: <AiFillPhone />,
  zalo: <SiZalo />,
};

export const socialConstantSetting = {
  Youtube: <BsYoutube size={24} />,
  Facebook: <FaFacebookF size={24} />,
  Gitlab: <AiOutlineGitlab size={24}/>,
  Github: <AiOutlineGithub size={24}/>,
  Linkedin: <AiFillLinkedin size={24}/>,
  Twitter: <AiOutlineTwitter size={24}/>,
  Phone: <AiFillPhone size={24}/>,
  Zalo: <SiZalo size={24}/>,
};

export const skillConstant = {
  html: <AiFillHtml5 color="#E44F26" />,
  css: <DiCss3 color="#33A9DC" />,
  js: <DiJavascript color="#F5DE19" />,
  reactjs: <DiReact color="#00D8FF" />,
  redux: <TbBrandRedux color="#764ABC"/>,
  nodejs: <IoLogoNodejs color="#539E43" />,
  mongdb: <DiMongodb color="#4FA94C" />,
  ts: <TbBrandTypescript color="#007ACC" />,
  tailwind: <SiTailwindcss color="#44A8B3" />,
  sass: <DiSass color="#CD6799" />,
  mui: <SiMui color="#007FFF" />,
  antd: <AiOutlineAntDesign color="#007FFF" />,
  git: <FaGitAlt color="#DD4C35" />,
  bootstrap:  <DiBootstrap color="#8831F0" />,
  cpluss: <CgCPlusPlus color="#6295CB" />,
  csharp: <SiCsharp size={45} color="#058E0C" />,
  java: <FaJava  size={45} color="#F8981D"/>,
  python: <FaPython color="#FCCD3D" />,
  sql: <SiMysql color="#D47131"/>,
  reactnav: <TbBrandReactNative size={45} color="#08DAF1" />,
  php: <FaPhp color="#7377AD" />,
  laravel: <FaLaravel  size={45} color="#F72719" />
};
