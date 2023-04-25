import React from "react";
import stylesCpn from "./styleCpn.module.scss";
import classNames from "classnames/bind";
import { Fade } from "react-awesome-reveal";
import parse from "html-react-parser";

const cx = classNames.bind(stylesCpn);

export default function Exp(props) {
  const { data } = props;
  return (
    <div id="exp" className={cx("exp")}>
      <h2>Experience</h2>
      <div className={cx("body")}>
        <div className={cx("body-box")}>
          <h3>Education</h3>
          <Fade cascade>
            <ul className={cx("ul")}>
              {data?.education.map((item, index) => (
                <li key={index}>
                  <div className={cx("item")}>
                    <div className={cx("time")}>{item.time}</div>
                    <div className={cx("content")}>
                      <h4>{item.title}</h4>
                      <div className={cx("sub")}>{data && parse(item.sub)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        <div className={cx("body-box")}>
          <h3>Experience</h3>
          <Fade cascade>
            <ul className={cx("ul")}>
            {data?.experience.map((item, index) => (
                <li key={index}>
                  <div className={cx("item")}>
                    <div className={cx("time")}>{item.time}</div>
                    <div className={cx("content")}>
                      <h4>{item.title}</h4>
                      <div className={cx("sub")}>{data && parse(item.sub)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </div>
    </div>
  );
}
