export type StackNavigatorType = {
  Login: undefined;
  Signup: undefined;
  Tabs: {
    screen: "Home" | "Search" | "AddVideo";
  };
  Player: VideoDetails;
  Profile: undefined;
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
