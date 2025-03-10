import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import React from "react";

const NoFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => navigate("/home", { replace: true })}
        >
          Back home
        </Button>
      }
    />
  );
};

export default NoFound;
