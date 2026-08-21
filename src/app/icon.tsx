import { appIconContentType, appIconSize, renderAppIcon } from "@/lib/app-icon";

export const size = appIconSize;
export const contentType = appIconContentType;

export default function Icon() {
  return renderAppIcon(size);
}
