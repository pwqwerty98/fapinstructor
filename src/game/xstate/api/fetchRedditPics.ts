import * as qs from "query-string";

import { MediaRequest, MediaResponse } from "@/common/types/Media";
import { Severity } from "@/common/store/notifications";
import { createNotification } from "@/game/engine/notification";
import api from "@/common/api/client";

const failedSubreddits: string[] = [];

export default async function fetchRedditPics(request: MediaRequest) {
  // Filter out any previously failed subreddits.
  const filteredSubreddits = request.subreddits.filter(
    (subreddit) => !failedSubreddits.includes(subreddit)
  );

  if (filteredSubreddits.length === 0) {
    createNotification({
      message: "Error fetching all subreddits!",
      duration: -1,
      severity: Severity.ERROR,
    });
    return;
  }

  const url = `/v1/reddit?${qs.stringify(
    { ...request, subreddits: filteredSubreddits },
    { arrayFormat: "comma" }
  )}`;

  const res = await api.get<MediaResponse>(url);

  // Append failed subreddits to the filter array.
  failedSubreddits.push(...res.data.failedSubreddits);

  // Notify user of failed subreddits
  res.data.failedSubreddits.forEach((subreddit) => {
    createNotification({
      message: `Error fetching subreddit: ${subreddit}`,
      duration: -1,
      severity: Severity.ERROR,
    });
  });

  return res.data.links.map((value) => {
    value.directLink = value.directLink.replace("preview", "i");
    return value;
  });
}
