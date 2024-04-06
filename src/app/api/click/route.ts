import PageAnalytic from "@/models/PageAnalytic.model";
import { connect } from "mongoose";

const click = async (req: Request, res: Response) => {
  try {
    // req.url.searchParams.get('url')
    await connect(process.env.MONGODB_URI!);
    const { url, type, uri } = await req.json();

    await PageAnalytic.create({ url, type, uri });
    return Response.json(
      { error: false, massage: "Click logged." },
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
};

export { click as POST };
