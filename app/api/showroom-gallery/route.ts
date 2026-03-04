import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const showroomRoot = path.join(process.cwd(), "public", "images", "showroom");

const categoryFolders = [
  "Material Wall",
  "kitchen-suite",
  "Private Lounge",
  "Bathroom Atelier",
  "Consultation Corner",
] as const;

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const isImageFile = (fileName: string) => {
  const extension = path.extname(fileName).toLowerCase();
  return imageExtensions.has(extension);
};

export async function GET() {
  const folders: Record<string, string[]> = {};

  await Promise.all(
    categoryFolders.map(async (folder) => {
      try {
        const absoluteFolderPath = path.join(showroomRoot, folder);
        const directoryEntries = await readdir(absoluteFolderPath, { withFileTypes: true });

        const sortedImages = directoryEntries
          .filter((entry) => entry.isFile() && isImageFile(entry.name))
          .map((entry) => entry.name)
          .sort((left, right) =>
            left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }),
          );

        folders[folder] = sortedImages.map(
          (fileName) =>
            `/images/showroom/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`,
        );
      } catch {
        folders[folder] = [];
      }
    }),
  );

  return NextResponse.json({ folders });
}
