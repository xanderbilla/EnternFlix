export type VideosData = {
  [key: number]: {
    id: number;
    title: string;
    duration: string;
    imageUrl: string;
  }[];
};

export const videosData: VideosData = {
  1: [
    {
      id: 1,
      title: "Video 1",
      duration: "1:26:56",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 2,
      title: "Video 2",
      duration: "1:15:34",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 3,
      title: "Video 3",
      duration: "1:05:12",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 4,
      title: "Video 4",
      duration: "1:45:23",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 5,
      title: "Video 5",
      duration: "1:30:45",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
  ],
  2: [
    {
      id: 1,
      title: "Video 1",
      duration: "1:26:56",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 2,
      title: "Video 2",
      duration: "1:15:34",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
    {
      id: 3,
      title: "Video 3",
      duration: "1:05:12",
      imageUrl:
        "https://image.tmdb.org/t/p/original/xuJ0F9RfKvVSJNDg2usurQ9WvY5.jpg",
    },
  ],
};
