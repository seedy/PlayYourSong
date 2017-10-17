export class ResultItem {
  constructor(
    public etag: string,
    public id: {kind: string, videoId: string},
    public kind: string,
    public snippet: {
      channelId: string,
      channelTitle: string,
      description: string,
      liveBroadcastContent: string,
      publishedAt: Date,
      thumbnails: {
        default: {url: string}
      },
      title: string
    }
  ) {};
}
