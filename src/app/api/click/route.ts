import connectToDatabase from "@/app/libs/mongoosedb";
import PageAnalytic from "@/models/PageAnalytic.model";

const click = async (req: Request, res: Response) => {
  try {
    // req.url.searchParams.get('url')
    await connectToDatabase();
    const { url, type, uri } = await req.json();

    await PageAnalytic.create({
      url: url ? decodeURI(atob(url)) : null,
      type,
      uri,
    });
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
