import React from "react";
import stylesCpn from "./styleCpn.module.scss";
import classNames from "classnames/bind";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import parse from "html-react-parser";

const cx = classNames.bind(stylesCpn);

export default function About(props) {
  const {data} = props
  return (
    <div id="about" className={cx("about")}>
      <Slide direction="right">
        <h2>About Me</h2>
      </Slide>
        <Slide direction="right">
          <img
            width={"100%"}
            alt="?"
            src={data?.avatar}
          />
        </Slide>
      <div className={cx("body")}>
        <Zoom>
          <div style={{ gap: 10 }} className={cx("body-col")}>
            <h3>{data?.full_name}</h3>
            <span>{data?.job_position}</span>
          </div>
        </Zoom>
       <Fade>
          <div
            style={{
              borderTop: "1px solid #ffffff1a",
              borderBottom: "1px solid #ffffff1a",
              gap: 20,
            }}
            className={cx("body-col")}
          >
           {data && parse(data?.about)}
          </div>
       </Fade>
        <div className={cx("body-row")}>
          <Fade cascade>
            <ul className={cx("left")}>
              <li>
                <span className={cx("label")}>Birthday</span>
                <span className={cx("data")}>{data?.birtday}</span>
              </li>
              <li>
                <span className={cx("label")}>Address</span>
                <span className={cx("data")}>
                {data?.address}
                </span>
              </li>
              <li>
                <span className={cx("label")}>Email</span>
                <span className={cx("data")}>{data?.email}</span>
              </li>
              <li>
                <span className={cx("label")}>Phone</span>
                <span className={cx("data")}>{data?.phone}</span>
              </li>
            </ul>
          </Fade>
          <Fade cascade>
            <ul className={cx("right")}>
              <li>
                <span className={cx("label")}>Study</span>
                <span className={cx("data")}>{data?.study}</span>
              </li>
              <li>
                <span className={cx("label")}>Degree</span>
                <span className={cx("data")}>
                {data?.degree}
                </span>
              </li>
              <li>
                <span className={cx("label")}>Classification </span>
                <span className={cx("data")}>{data?.classification}</span>
              </li>
              <li>
                <span className={cx("label")}>GPA</span>
                <span className={cx("data")}>{data?.gpa}</span>
              </li>
            </ul>
          </Fade>
        </div>
        <Slide>
          <div className={cx("body-col")}>
            <a href={data?.cv} target="_blank" rel="noopener noreferrer" >Download CV</a>
          </div>
        </Slide>
      </div>
    </div>
  );
}
