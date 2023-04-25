import { message } from "antd";

  const success = (mess = "Thành công!") => {
        message.success(mess)
  };
  const error = (mess = "Thất bại!") => {
        message.error(mess)
  };
  const warning = (mess = "Cảnh báo!") => {
        message.warning(mess)
  };


  export { success, error , warning}