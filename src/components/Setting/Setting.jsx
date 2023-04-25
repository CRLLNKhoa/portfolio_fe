import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Setting.module.scss";
import { Modal, Progress } from "antd";
import Theme1 from "../../themes/Theme_1/Theme1";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export default function Setting({process=0,data}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: 20 }}>
          <Theme1 />
        </div>
      </Modal>
      <div>
        <h3 style={{ marginBottom: 20 }}>
          Giao diện portfolio (đang xây dựng thêm)
        </h3>
        <div className={cx("list")}>
          <span>
            <input readOnly checked type="radio" id="gd1" />
            <label htmlFor="dg1">Giao diện 1</label>
            <span style={{ color: "blue" }} >
              <a href="https://vhporfolio.netlify.app" target="_blank" rel={'noreferrer'}>(Xem giao diện)</a>
            </span>
          </span>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 20 }}>
          Đường dẫn
        </h3>
        <span>Đường dẫn đến portfolio của bạn: <Link style={{color: "red"}} to={data?.slug}>/{data?.slug}</Link></span>
      </div>
      <div>
        <h3 style={{ marginBottom: 20 }}>
          Tiến trình cập nhật thông tin
        </h3>
        <Progress strokeColor={"#0aefd8"} type="circle" percent={100-Math.floor(((process)/27)*100)} />
      </div>
    </div>
  );
}
