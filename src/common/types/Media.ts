export enum MediaType {
  Picture = "PICTURE",
  Gif = "GIF",
  Video = "VIDEO",
}

export default interface MediaLink {
  sourceLink: string;
  directLink: string;
  mediaType: MediaType;
}

export interface MediaRequest {
  subreddits: string[];
  limit: number;
  mediaTypes: MediaType[];
}

export interface MediaResponse {
  failedSubreddits: [string];
  links: [MediaLink];
}
