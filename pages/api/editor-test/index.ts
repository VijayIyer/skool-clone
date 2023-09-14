const data = [
  {
    type: "text",
    content: "Hello there,",
  },
  {
    type: "paragraph",
    children: [{ type: "breakline" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        content:
          " I wanted to recommend a few resources for you to check out. Firstly, there's a great article on web development that you can read at:",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "link",
        content: "https://www.webdevelopmentexample.com/articles/101",
        href: "https://www.webdevelopmentexample.com/articles/101",
      },
    ],
  },
  {
    type: "paragraph",
    children: [{ type: "breakline" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        content:
          " If you're into science, there's an interesting piece on recent discoveries:",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "link",
        content: "https://www.scienceexample.com/news/recent-discoveries",
        href: "https://www.scienceexample.com/news/recent-discoveries",
      },
    ],
  },
  {
    type: "paragraph",
    children: [{ type: "breakline" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        content:
          " For those looking to unwind with some music, I always suggest:",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "link",
        content: "https://www.musicexample.com/playlists/relaxing-tunes",
        href: "https://www.musicexample.com/playlists/relaxing-tunes",
      },
    ],
  },
  {
    type: "paragraph",
    children: [{ type: "breakline" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        content: " Hope you find these useful!",
      },
    ],
  },
  {
    type: "paragraph",
    children: [{ type: "breakline" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        content: " Cheers,",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "text",
        content: " John",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "link",
        content: "https://www.musicexample.com/playlists/relaxing-tunes",
        href: "https://www.musicexample.com/playlists/relaxing-tunes",
      },
    ],
  },
];

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(data);
}
