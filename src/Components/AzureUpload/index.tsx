import { Button, Upload, UploadProps, message } from "antd";
import { RcFile } from "antd/es/upload";
import { UploadFile } from "antd/lib";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import "./index.less";

interface AzureUploadProps extends Omit<UploadProps, "onChange"> {
  account?: string;
  containerName?: string;
  sasToken?: string;
  accept?: string;
  value?: string;
  containerStyle?: React.CSSProperties;
  onChange?: (url?: string) => void;
}

const AzureUpload = ({
  account = "youlify",
  containerName = "user-profile-pics",
  sasToken = "se=2028-06-01T07:00:00Z&si=provider-portal-frontend&sv=2022-11-02&sr=c&sig=PG8ZwQo5Xa7w1s4dS9ZtOMzGbX7zRYpInCLXNN65UuM%3D",
  accept,
  value,
  containerStyle,
  onChange,
  ...props
}: AzureUploadProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const uploadRef = useRef<any>(null);

  const handleUpload = async (options: any) => {
    const { file, onProgress, onSuccess, onError } = options;
    setLoading(true);
    try {
      const extName = file.name.split(".").pop();
      const blobName = `${Date.now()}.${extName}`;
      const uploadUrl = `https://${account}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
      await axios.put(uploadUrl, file, {
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type || "application/octet-stream",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress({ percent }, file);
          }
        },
      });
      const fileUrl = uploadUrl.split("?")[0];
      onChange?.(fileUrl);
      onSuccess(null, file);
    } catch (error) {
      messageApi.error("Upload failed");
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileList([]);
    onChange?.(undefined);
  };

  const beforeUpload = (file: RcFile) => {
    const isFileTypeAllowed = accept
      ? accept?.includes(file.type || "") ||
        accept?.includes(file.type?.split("/")?.[1])
      : true;
    const isFileSizeAllowed = file.size / 1024 / 1024 <= 5;
    if (!isFileTypeAllowed) messageApi.error(`Only upload ${accept}`);
    if (!isFileSizeAllowed) messageApi.error("File must be smaller than 5MB");
    return isFileTypeAllowed || Upload.LIST_IGNORE;
  };

  useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: "-1",
          name: value.split("/").pop() || "file",
          status: "done",
          url: value,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [value]);

  return (
    <Upload
      ref={uploadRef}
      accept={accept}
      fileList={fileList}
      showUploadList={false}
      customRequest={handleUpload}
      beforeUpload={beforeUpload}
      style={containerStyle}
      {...props}
    >
      {contextHolder}
      {fileList.length > 0 ? (
        <div
          style={{ position: "relative", width: 249, height: 249 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={fileList[0].url}
            alt="preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {hovered && (
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                padding: 4,
                borderRadius: "50%",
                cursor: "pointer",
                background: "rgba(0, 0, 0, 0.5)",
              }}
              onClick={handleDelete}
            >
              <DeleteOutlined style={{ color: "white", fontSize: 24 }} />
            </div>
          )}
        </div>
      ) : (
        <div className="upload-no-file">
          <Button type="primary" icon={<UploadOutlined />} loading={loading}>
            Select File to Upload
          </Button>
        </div>
      )}
    </Upload>
  );
};

export default AzureUpload;
