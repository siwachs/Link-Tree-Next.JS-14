import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/Page.model.";
import { connect } from "mongoose";
import { getServerSession } from "next-auth";
import uniqid from "uniqid";
import User from "@/models/User.model";

const awsBucketUpload = async (file: File) => {
  try {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
      },
    });

    const newFileName = `${uniqid()}.${file.name.split(".").pop()}`;
    const bucketName = process.env.AWS_S3_BUCKET_NAME!;
    const chunks = [];

    // @ts-ignore
    for await (const chunk of file.stream()) {
      // Process File without load whole file in memory at once.
      chunks.push(chunk);
    }

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: Buffer.concat(chunks), // Buffer is temporary storage for binary
        ACL: "public-read", // Data Ownership
        ContentType: file.type,
      }),
    );

    return `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
  } catch (error: any) {
    return false;
  }
};

async function uploadFile(req: Request, res: Response) {
  try {
    // @ts-ignore
    const session = await getServerSession(authOption);
    if (!session) {
      return Response.json(
        {
          error: true,
          message: "401 unauthorized User.",
        },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    if (!name) {
      return Response.json(
        {
          error: true,
          message: "Input name is not set.",
        },
        { status: 400 },
      );
    }

    const file = formData.get(name) as File;
    if (!file) {
      return Response.json(
        {
          error: true,
          message: "404 File not found.",
        },
        { status: 404 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        {
          error: true,
          message: "Uploaded file is not an image.",
        },
        { status: 400 },
      );
    }

    let url;
    await connect(process.env.MONGODB_URI!);

    switch (name) {
      case "bgImage":
        url = await awsBucketUpload(file);
        await Page.updateOne(
          { owner: session?.user?.email },
          {
            bgImage: url,
          },
        );
        break;
      case "profileImage":
        url = await awsBucketUpload(file);
        await User.updateOne(
          {
            email: session?.user?.email,
          },
          {
            image: url,
          },
        );
        break;
      case "linkIcon":
        url = await awsBucketUpload(file);
    }

    if (!url) {
      throw new Error("Error in aws bucket upload.");
    }

    return Response.json(
      {
        error: false,
        message: "File uploaded",
        url,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json(
      { error: true, message: error.message },
      {
        status: 500,
      },
    );
  }
}

export { uploadFile as POST };
