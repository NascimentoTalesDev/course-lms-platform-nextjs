import type { NextApiRequest, NextApiResponse } from "next";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
  const user = {
    name: "Tales",
    id: "123",
  };
  if (!user) throw new UploadThingError("Usuário não autorizado");
  return {
    userId: user.id
  };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  courseAttachment: f(["text", "image", "audio", "video", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  courseVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;