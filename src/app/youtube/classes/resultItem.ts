export class ResultItem {
  constructor(
    etag: string,
    id: {kind: string, videoId: string},
    kind: string,
    snippet: {
      channelId: string,
      channelTitle: string,
      description: string,
      liveBroadcastContent: string,
      publishedAt: Date,
      thumbnails: {},
      title: string
    }
  ) {};
}
