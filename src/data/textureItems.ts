// src/data/textureItems.ts

export interface TextureItem {
  id: string;
  title: string;
  images: string[];
  description: string[];
  link?: { label: string; href: string };
}

const TEXTURE_ITEMS: TextureItem[] = [
  {
    id: "desert-eagle-cd",
    title: "DESERT EAGLE | CD",
    images: [
      "/images/textures/deagle-cd-2.jpg",
      "/images/textures/deagle-cd-1.jpg",
    ],
    description: ["Created for Counter-Strike 2", "Commissioned by NadeKing"],
    link: {
      label:
        "https://steamcommunity.com/sharedfiles/filedetails/?id=3031874084",
      href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3031874084",
    },
  },
  {
    id: "zeus-strafe-tech",
    title: "Zeus x27 | Strafe Tech",
    images: ["/images/textures/zeus-strafe-tech.gif"],
    description: [
      "Created for Counter-Strike 2",
      `Personal project Got inspired by the chaotic style of public bathroom graffiti, so why not apply it to a gun? Its full of made-up stickers, some relating to the game and others just existing for style, finished with splashed paint and black marker! The idea was to recreate the different combination of ideas that a restroom may have from its many visitors

Be wary that it might have a peculiar smell...

This is my favourite variation of the skin! It features more colours + colour changing effect!`,
    ],
  },
];

export default TEXTURE_ITEMS;
