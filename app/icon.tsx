import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#161616",
          color: "#c2a3a3",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "Georgia, serif",
          borderRadius: 10,
        }}
      >
        MM
      </div>
    ),
    size,
  );
}
