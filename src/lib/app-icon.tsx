import { ImageResponse } from "next/og";

export const appIconSize = { width: 32, height: 32 };
export const appleIconSize = { width: 180, height: 180 };
export const appIconContentType = "image/png";

const FOREST = "#0E2A26";
const MUSTARD = "#E4B52A";
const MARK = "A";

export function renderAppIcon(size: { width: number; height: number }) {
  const fontSize = Math.round(size.width * 0.62);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: FOREST,
          color: MUSTARD,
          fontSize,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {MARK}
      </div>
    ),
    { ...size },
  );
}
