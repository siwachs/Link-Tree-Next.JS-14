import { PipelineStage } from "mongoose";
import {
  AnalyticAggregationObject,
  TransformedAggregationObject,
} from "@/../global";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import SectionBox from "@/components/layouts/SectionBox";
import PageAnalytic from "@/models/PageAnalytic.model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PageObject } from "@/../global";
import Page from "@/models/Page.model.";
import Chart from "@/components/charts/Chart";

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

  const viewCountsresult: AnalyticAggregationObject[] =
    await PageAnalytic.aggregate(aggregatePipeline(page?.uri, "view"));
  const clickCountsresult: AnalyticAggregationObject[] =
    await PageAnalytic.aggregate(aggregatePipeline(page?.uri, "click"));

  const transformPipelineResult = (
    data: AnalyticAggregationObject[],
    type: "click" | "view",
  ) => {
    return data.flatMap((entry: AnalyticAggregationObject, index) => {
      const currentDateString = entry._id;
      const nextDateString =
        type === "view"
          ? viewCountsresult[index + 1]?._id
          : clickCountsresult[index + 1]?._id;
      const resultArray = [];

      resultArray.push(
        type === "view"
          ? {
              date: entry._id,
              views: entry.count,
              clicks: 0,
            }
          : {
              date: entry._id,
              views: 0,
              clicks: entry.count,
            },
      );

      if (nextDateString) {
        const currentDateParts = currentDateString.split("-");
        const currentDay = parseInt(currentDateParts[0], 10);
        const currentMonth = parseInt(currentDateParts[1], 10) - 1;
        const currentYear = parseInt(currentDateParts[2], 10);
        const currentDate = new Date(currentYear, currentMonth, currentDay);

        const nextDateParts = nextDateString.split("-");
        const nextDay = parseInt(nextDateParts[0], 10);
        const nextMonth = parseInt(nextDateParts[1], 10) - 1;
        const nextYear = parseInt(nextDateParts[2], 10);
        const nextDate = new Date(nextYear, nextMonth, nextDay);

        const timeDiff = nextDate.getTime() - currentDate.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (dayDiff > 1) {
          const missingDates = [];
          for (let i = 1; i < dayDiff; i++) {
            const missingDate = new Date(currentDate);
            missingDate.setDate(currentDate.getDate() + i);

            // slice take last two digit of String.
            const formattedMissingDate = `${("0" + missingDate.getDate()).slice(-2)}-${("0" + (missingDate.getMonth() + 1)).slice(-2)}-${missingDate.getFullYear()}`;

            missingDates.push({
              date: formattedMissingDate,
              views: 0,
              clicks: 0,
            });
          }

          resultArray.push(...missingDates);
        }
      }

      return resultArray;
    });
  };

  const transformedAnalyticsViews: TransformedAggregationObject[] =
    transformPipelineResult(viewCountsresult, "view");
  const transformedAnalyticsClicks: TransformedAggregationObject[] =
    transformPipelineResult(clickCountsresult, "click");

  const mergedAnalytics: TransformedAggregationObject[] = [];

  let viewsIndex = 0;
  let clicksIndex = 0;

  while (
    viewsIndex < transformedAnalyticsViews.length ||
    clicksIndex < transformedAnalyticsClicks.length
  ) {
    const viewsDate =
      viewsIndex < transformedAnalyticsViews.length
        ? transformedAnalyticsViews[viewsIndex].date
        : null;
    const clicksDate =
      clicksIndex < transformedAnalyticsClicks.length
        ? transformedAnalyticsClicks[clicksIndex].date
        : null;

    if (viewsDate && clicksDate) {
      if (viewsDate === clicksDate) {
        mergedAnalytics.push({
          date: viewsDate,
          views: transformedAnalyticsViews[viewsIndex].views,
          clicks: transformedAnalyticsClicks[clicksIndex].clicks,
        });
        viewsIndex++;
        clicksIndex++;
      } else if (viewsDate < clicksDate) {
        mergedAnalytics.push({
          date: viewsDate,
          views: transformedAnalyticsViews[viewsIndex].views,
          clicks: 0,
        });
        viewsIndex++;
      } else {
        mergedAnalytics.push({
          date: clicksDate,
          views: 0,
          clicks: transformedAnalyticsClicks[clicksIndex].clicks,
        });
        clicksIndex++;
      }
    } else if (viewsDate) {
      mergedAnalytics.push({
        date: viewsDate,
        views: transformedAnalyticsViews[viewsIndex].views,
        clicks: 0,
      });
      viewsIndex++;
    } else if (clicksDate) {
      mergedAnalytics.push({
        date: clicksDate,
        views: 0,
        clicks: transformedAnalyticsClicks[clicksIndex].clicks,
      });
      clicksIndex++;
    }
  }

  return (
    <SectionBox>
      <h2 className="mb-6 text-center text-xl font-semibold">Page Analytics</h2>
      <Chart data={mergedAnalytics} combined />

      <h2 className="my-6 text-center text-xl font-semibold">Views</h2>
      <Chart data={mergedAnalytics} dataKey="views" />

      <h2 className="my-6 text-center text-xl font-semibold">Clicks</h2>
    </SectionBox>
  );
}
