import React from "react";
import { Button, Dropdown } from "antd";
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const items = [
    {
      key: "1",
      label: <a href="https://www.antgroup.com">Home</a>,
    },
    {
      key: "2",
      label: <a href="https://www.antgroup.com">Bookings</a>,
    },
    {
      key: "3",
      label: <a href="https://www.aliyun.com">Profile</a>,
    },
    {
      key: "4",
      label: <li>Logout</li>,
    },
  ];
  return (
    <div>
      <div className="header">
        <div className="d-flex justify-content-between bs1">
          <h1>FlexCar</h1>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow
          >
            <Button>{user.username}</Button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
