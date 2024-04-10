import { PipelineStage } from "mongoose";

// @ts-ignore
import {
  AnalyticAggregationObject,
  TransformedAggregationObject,
  PageObject,
} from "@/../global";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import SectionBox from "@/components/layouts/SectionBox";
import PageAnalytic from "@/models/PageAnalytic.model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Page from "@/models/Page.model";
import Chart from "@/components/charts/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
      $sort: {
        createdAt: 1, // Sorting in ascending order by createdAt date, use -1 for descending order
      },
    },

    // Stage 3
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

  const sortByDate = (a: any, b: any) => {
    const dateA: any = new Date(a.date.split("-").reverse().join("-"));
    const dateB: any = new Date(b.date.split("-").reverse().join("-"));
    return dateA - dateB;
  };

  mergedAnalytics.sort(sortByDate);

  // Link Clicks Analytics
  const clicks = await PageAnalytic.find({ uri: page?.uri, type: "click" });

  return (
    <>
      <SectionBox classNames="min-h-[512px]">
        <h2 className="mb-6 text-center text-xl font-semibold">
          Page Analytics
        </h2>
        <Chart data={mergedAnalytics} combined />
      </SectionBox>

      <SectionBox classNames="-mt-6 min-h-[512px]">
        <h2 className="my-6 text-center text-xl font-semibold">Views</h2>
        <Chart data={mergedAnalytics} dataKey="views" />
      </SectionBox>

      <SectionBox classNames="-mt-6">
        <h2 className="mb-6 text-center text-xl font-semibold">Clicks</h2>

        {page?.links.map((link: PageLink) => (
          <div
            key={link._id}
            className="items-center gap-4 border-t border-gray-200 px-2 py-4 text-center md:flex md:text-left"
          >
            <div className="relative inline-flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-sm">
              {!link.icon ? (
                <FontAwesomeIcon
                  fixedWidth
                  icon={faLink}
                  size="xl"
                  className="text-blue-500"
                />
              ) : (
                <Image
                  fill
                  src={link.icon}
                  alt="link"
                  className="h-full w-full object-cover object-center"
                  sizes="33vw"
                />
              )}
            </div>

            <div className="flex-1">
              <h3>{link.title}</h3>
              <p className="line-clamp-2 text-sm text-gray-700">
                {link.description}
              </p>
              <Link
                className="text-sm text-blue-400"
                href={link.link}
                target="_blank"
              >
                {link.link}
              </Link>
            </div>

            <div className="rounded-md border p-2 text-center">
              <div className="text-3xl">
                {
                  clicks.filter(
                    (click) =>
                      click.url === link.link &&
                      new Date(click.createdAt).toDateString() ===
                        new Date().toDateString(),
                  ).length
                }
              </div>
              <div className="text-xs font-bold uppercase text-gray-400">
                Clicks Today
              </div>
            </div>

            <div className="mt-1 rounded-md border p-2 text-center md:mt-0">
              <div className="text-3xl">
                {clicks.filter((click) => click.url === link.link).length}
              </div>
              <div className="text-xs font-bold uppercase text-gray-400">
                Clicks Alltime
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
    </>
  );
}
