import { PAGES } from "services/demo-content/constants";

export interface BannerProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  type?: PAGES;
}
