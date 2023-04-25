import React, { useEffect, useState } from "react";
import stylesCpn from "./styleCpn.module.scss";
import classNames from "classnames/bind";
import { BsPhone } from "react-icons/bs";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as messageService from "../../services/messageService";
import * as message from "../../components/Message/Message";

const cx = classNames.bind(stylesCpn);

export default function Contact(props) {
  const { data } = props;
  const [form, setForm] = useState({
    name_sender: "Name",
    email_sender: "Email",
    message: "Message",
    user: "",
    time: 1,
  });
  const mutation = useMutationHooks((data) => messageService.send(data));

  const handleSend = (e) => {
    e.preventDefault();
    mutation.mutate({ ...form, user: data?._id });
  };

  const { data: isData, isLoading, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess) {
      setForm({
        name_sender: "",
        email_sender: "",
        message: "",
        user: "",
        time: 1,
      });
      message.success(isData?.message);
    }
  }, [isSuccess]);

  return (
    <div id="contact" className={cx("contact")}>
      <h2>Contact Me</h2>
      <div className={cx("content")}>
        <div className={cx("info")}>
          <p>
            <BsPhone size={20} /> {data?.phone}
          </p>
          <p>
            <AiOutlineHome size={20} /> {data?.address}
          </p>
          <p>
            <AiOutlineMail size={20} /> {data?.email}
          </p>
        </div>
        <form className={cx("form")}>
          <div className={cx("form-info")}>
            <input
            value={form.name_sender}
              onChange={(e) =>
                setForm({ ...form, name_sender: e.target.value })
              }
            />
            <input
            value={form.email_sender}
              onChange={(e) =>
                setForm({ ...form, email_sender: e.target.value })
              }
            />
          </div>
          <textarea
          value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={6}
          ></textarea>
          <button onClick={handleSend}>Send Message</button>
        </form>
      </div>
    </div>
  );
}
