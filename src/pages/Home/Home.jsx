import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Col, Modal, Row, Tabs } from "antd";
import SideBar from "../../components/Sidebar/SideBar";
import Profile from "../../components/Profile/Profile";
import { AiOutlineMail } from "react-icons/ai";
import Setting from "../../components/Setting/Setting";
import { useDispatch, useSelector } from "react-redux";
import * as messageService from "../../services/messageService";
import { notSeenUpdate, seenUpdate } from "../../redux/slides/messageSlide";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const badge = {
  width: 16,
  height: 16,
  backgroundColor: "red",
  padding: "1px 5px",
  fontSize: 10,
  borderRadius: 999,
  color: "white",
  marginLeft: 5,
};

export default function Home() {
  const user = useSelector((state) => state.user);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const [tab, setTab] = useState(1);
  const handleTab = (t) => {
    setTab(t);
  };

  const items = [
    {
      key: "1",
      label: (
        <span>
          Tin chưa xem
          <span style={badge}>{message?.notSeen?.total}</span>
        </span>
      ),
      children: <NotSeen />,
    },
    {
      key: "2",
      label: (
        <span>
          Tin đã xem
          <span style={badge}>{message?.seen?.total}</span>
        </span>
      ),
      children: <Seen />,
    },
  ];

  const hanleProgress = (myobj) => {
    let count = 0;
    for (let key in myobj) {
      if (myobj.hasOwnProperty(key)) {
        if (myobj[`${key}`] === "") {
          ++count;
        }
      }
    }
    return count;
  };

  const getNotSeenMessage = async () => {
    const res = await messageService.getMessage({
      id: user?.id,
      filter: false,
    });
    dispatch(notSeenUpdate(res));
  };

  const getSeenMessage = async () => {
    const res = await messageService.getMessage({
      id: user?.id,
      filter: true,
    });
    dispatch(seenUpdate(res));
  };

  const [process, setProcess] = useState(0);

  useEffect(() => {
    setProcess(hanleProgress(user));
    getNotSeenMessage();
    getSeenMessage();
  }, [user]);

  const navigate = useNavigate()
  useEffect(() => {
    if(user.id === ""){
      navigate("/login")
    }
  }, []);

  return (
    <>
      <div className={cx("wrapper")}>
        <h1>Account Setting</h1>
        <Row>
          <Col span={5} lg={5} sm={0} xs={0} xl={5}>
            <SideBar
              totalMessage={message?.notSeen?.total}
              tab={tab}
              onChange={handleTab}
            />
          </Col>
          <Col span={19} sm={24} xs={24} xl={19}>
            <div className={cx("content")}>
              {tab === 1 && <Setting data={user} process={process} />}
              {tab === 2 && <Profile data={user} />}
              {tab === 3 && (
                <Tabs
                  className={cx("tabs")}
                  defaultActiveKey="1"
                  items={items}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

const Seen = () => {
  const message = useSelector((state) => state.message);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {message?.seen?.data?.length < 1 ? (
        <span
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Chưa có tin nhắn
        </span>
      ) : (
        message?.seen?.data?.map((item) => (
          <Message
            id={item._id}
            name_sender={item.name_sender}
            email_sender={item.email_sender}
            message={item.message}
            time={item.createdAt}
            seen={item.seen}
          />
        ))
      )}
    </div>
  );
};

const NotSeen = () => {
  const message = useSelector((state) => state.message);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {message?.notSeen?.data?.length < 1 ? (
        <span
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Chưa có tin nhắn
        </span>
      ) : (
        message?.notSeen?.data?.map((item,index) => (
            <Message
              id={item._id}
              name_sender={item.name_sender}
              email_sender={item.email_sender}
              message={item.message}
              time={item.createdAt}
              seen={item.seen}
            />  
        ))
      )}
    </div>
  );
};

const Message = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getNotSeenMessage = async () => {
    const res = await messageService.getMessage({
      id: user?.id,
      filter: false,
    });
    dispatch(notSeenUpdate(res));
  };

  const getSeenMessage = async () => {
    const res = await messageService.getMessage({
      id: user?.id,
      filter: true,
    });
    dispatch(seenUpdate(res));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    props.seen === false && seenMessage();
    getNotSeenMessage();
    getSeenMessage();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const seenMessage = async () => {
    await messageService.updateMessage({ id: props.id, data: { seen: true } });
  };

  return (
    <div key={props.id}>
      <div
        onClick={showModal}
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(177, 172, 172, 0.402)",
          padding: 10,
          borderRadius: 16,
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "bold" }}>
            <span style={{ fontSize: 12 }}>from:</span> {props.name_sender}
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <AiOutlineMail />
              {props.email_sender}
            </span>
            <span>{`${props.time.slice(11, 16)} - ${props.time.slice(
              8,
              10
            )}/${props.time.slice(4, 8)}/${props.time.slice(0, 4)}`}</span>
          </div>
        </div>
      </div>
      <Modal
        closable={false}
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={cx("message")}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>
              <span style={{ fontSize: 12 }}>from:</span> {props.name_sender}
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <AiOutlineMail />
                {props.email_sender}
              </span>
              <span>{`${props.time.slice(11, 16)} - ${props.time.slice(
                8,
                10
              )}/${props.time.slice(4, 8)}/${props.time.slice(0, 4)}`}</span>
            </div>
          </div>
          <p
            style={{
              borderTop: "1px solid rgba(177, 172, 172, 0.402)",
              marginTop: 10,
              padding: "10px 0",
            }}
          >
            {props.message}
          </p>
        </div>
      </Modal>
    </div>
  );
};
