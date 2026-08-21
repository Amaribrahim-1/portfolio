import {
  appleIconSize,
  appIconContentType,
  renderAppIcon,
} from "@/lib/app-icon";

export const size = appleIconSize;
export const contentType = appIconContentType;

export default function AppleIcon() {
  return renderAppIcon(size);
}
