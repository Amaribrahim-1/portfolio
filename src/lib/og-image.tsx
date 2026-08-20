import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const ogImageSize = { width: 1200, height: 630 };

type OgImageCopy = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function renderOgImage({
  eyebrow = profile.role,
  title = profile.name,
  description = profile.tagline,
}: OgImageCopy = {}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0E2A26",
          color: "#F3EEE4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#E4B52A",
            marginBottom: 28,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700 }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#9BB3A0",
            marginTop: 32,
            maxWidth: 980,
          }}
        >
          {description}
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
