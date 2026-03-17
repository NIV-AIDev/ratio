import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const galleryRoot = path.join(
  process.cwd(),
  "public",
  "images",
  "placeholders",
  "services",
  "interior-design",
  "Gal-ID",
);

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const isImageFile = (fileName: string) => {
  const extension = path.extname(fileName).toLowerCase();
  return imageExtensions.has(extension);
};

const getLastNumericToken = (fileName: string) => {
  const numericTokens = fileName.match(/\d+/g);

  if (!numericTokens || numericTokens.length === 0) {
    return Number.POSITIVE_INFINITY;
  }

  return Number.parseInt(numericTokens[numericTokens.length - 1], 10);
};

const compareGalleryFileNames = (left: string, right: string) => {
  const leftNumericToken = getLastNumericToken(left);
  const rightNumericToken = getLastNumericToken(right);

  if (leftNumericToken !== rightNumericToken) {
    return leftNumericToken - rightNumericToken;
  }

  return left.localeCompare(right, undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

export async function GET() {
  try {
    const directoryEntries = await readdir(galleryRoot, { withFileTypes: true });
    const images = directoryEntries
      .filter((entry) => entry.isFile() && isImageFile(entry.name))
      .map((entry) => entry.name)
      .sort(compareGalleryFileNames)
      .map(
        (fileName) =>
          `/images/placeholders/services/interior-design/Gal-ID/${encodeURIComponent(fileName)}`,
      );

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
