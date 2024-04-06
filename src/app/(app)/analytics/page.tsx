import { PipelineStage } from "mongoose";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import SectionBox from "@/components/layouts/SectionBox";
import PageAnalytic from "@/models/PageAnalytic.model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PageObject } from "@/../global";
import Page from "@/models/Page.model.";
import Chart from "@/components/Chart";

export default async function AnalyticsPage() {
  // @ts-ignore
  const session = await getServerSession(authOption);
  if (!session) redirect("/");

  const page: PageObject | null = await Page.findOne({
    owner: session.user?.email,
  });

  const aggregatePipeline = (
    uri: string | undefined,
    type: string,
  ): PipelineStage[] => [
    // Stage 1
    {
      $match: {
        type: type,
        uri: uri,
      },
    },

    // Stage 2
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%d-%m-%Y",
          },
        },
        count: { $sum: 1 },
      },
    },

    // Stage 3
    {
      $sort: {
        _id: 1, // 1 for ascending order, -1 for descending order
      },
    },
  ];

  const viewCountsresult = await PageAnalytic.aggregate(
    aggregatePipeline(page?.uri, "view"),
  );

  const clickCountsresult = await PageAnalytic.aggregate(
    aggregatePipeline(page?.uri, "click"),
  );

  const viewCounts = viewCountsresult.map((entry) => ({
    date: entry._id,
    count: entry.count,
  }));
  const clickCounts = clickCountsresult.map((entry) => ({
    date: entry._id,
    count: entry.count,
  }));

  return (
    <SectionBox>
      <Chart data={viewCounts} />
    </SectionBox>
  );
}
