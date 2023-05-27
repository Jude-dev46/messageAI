import React, { memo } from "react";
import { Detector } from "react-detect-offline";
import { message } from "antd";

const OfflineDetector = memo(() => {
  return (
    <Detector
      render={({ online }) => (
        <div>
          {online
            ? `${message.success("Connected!")}`
            : `${message.error("Please connect to the internet")}`}
        </div>
      )}
    />
  );
});

export default OfflineDetector;
