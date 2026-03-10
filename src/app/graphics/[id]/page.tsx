// src/app/graphics/[id]/page.tsx

import { notFound } from "next/navigation";
import TextureDetailPage from "@/components/TextureDetailPage";
import TEXTURE_ITEMS from "@/data/textureItems";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const item = TEXTURE_ITEMS.find((i) => i.id === id);
  if (!item) notFound();
  return <TextureDetailPage item={item!} />;
}
