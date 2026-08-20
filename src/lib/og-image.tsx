import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const ogImageSize = { width: 1200, height: 630 };

export function renderOgImage() {
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
          background: "#0a0a0b",
          color: "#ededec",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#00e6a0",
            marginBottom: 28,
          }}
        >
          {profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#9a9aa2",
            marginTop: 32,
            maxWidth: 980,
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
