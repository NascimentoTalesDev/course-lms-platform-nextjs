import React from "react";
import { UploadButton } from "../utils/uploadthing";
import toast from "react-hot-toast";
import { ourFileRouter } from "../server/uploadthing";

interface UploadFilesProps {
  onChange: (url? : string) => void;
  endpoint: keyof typeof ourFileRouter
}

export default function UploadFiles({ onChange, endpoint}) {
  return (
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0]?.url)
        }}
        onUploadError={(error: Error) => {
          toast.error("Error ao fazer upload");
        }}
      />
  );
}