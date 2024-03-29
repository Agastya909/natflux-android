export type StackNavigatorType = {
  Login: undefined;
  Signup: undefined;
  Tabs: undefined;
  Player: VideoDetails;
};

export type VideoDetails = {
  id: string;
  title: string;
  summary: string;
  genre: string;
  path: string;
  length: number;
  size: number;
  release_date: string;
  thumbnail_path: string;
  uploader_id: string;
};
