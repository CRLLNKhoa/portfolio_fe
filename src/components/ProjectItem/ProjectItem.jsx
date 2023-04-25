import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProjectItem.module.scss";
import { Button, Modal } from "antd";
import parse from "html-react-parser";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as userService from "../../services/userService"
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

export default function ProjectItem({data}) {
  const user = useSelector((state) => state.user)
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

  const mutation = useMutationHooks((data) =>
    userService.removeUserExp(data)
  );
  const {data: dataDel, isLoading, isSuccess } = mutation;

  return (
    <>
      <Modal
        style={{ top: 10 }}
        width={"90%"}
        title="Thông tin dự án"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={cx("modal")}>
          <div className={cx("block")}>
            <img
              alt="?"
              src="https://scontent.fvca2-1.fna.fbcdn.net/v/t39.30808-6/338369982_3124672207678157_4864454446766562158_n.jpg?stp=dst-jpg_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=cqwXvMD7BSkAX9MHoNW&_nc_ht=scontent.fvca2-1.fna&oh=00_AfAoGAPyEaJHtzMIBtCayFC9mD31T1AK6RFHOgFYgLHCpw&oe=64311896https://scontent.fvca2-1.fna.fbcdn.net/v/t39.30808-6/338369982_3124672207678157_4864454446766562158_n.jpg?stp=dst-jpg_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=cqwXvMD7BSkAX9MHoNW&_nc_ht=scontent.fvca2-1.fna&oh=00_AfAoGAPyEaJHtzMIBtCayFC9mD31T1AK6RFHOgFYgLHCpw&oe=64311896"
            />
            <div className={cx("info")}>
              <div className={cx("b")}>
                <span className={cx("title")}>{data?.name}</span>
                <span className={cx("sub")}>Title</span>
              </div>
              <div className={cx("technology")}>
              {data && parse(data?.responsibility)}
              </div>
            </div>
          </div>
          <div className={cx("image-paser")}>{data && parse(data?.website_functionality)}</div>
          <Button onClick={() => mutation.mutate({idUser: user.id, data: { project: {_id: data?._id} }})} style={{width: 120,marginLeft: "auto"}} type="primary" danger>Xóa dự án</Button>
        </div>
      </Modal>
      <div onClick={showModal} className={cx("wrapper")}>
        <div className={cx("show")}>
          <img
            alt="?"
            src={data?.image}
          />
          <div className={cx("info")}>
            <div className={cx("b")}>
              <span className={cx("title")}>{data?.name}</span>
              <span className={cx("sub")}>{data?.type}</span>
            </div>
            <div className={cx("technology")}>
              {data && parse(data?.responsibility)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
