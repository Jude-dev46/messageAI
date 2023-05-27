import { message } from "antd";

const Notification = ({ status, title, content }) => {
  return <div>{message.success(`${content}`)}</div>;
};

export default Notification;
