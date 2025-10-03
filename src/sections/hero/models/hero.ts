export interface HeroProps {
  title: string;
  strongTitle?: string;
  text: string;
  multipleTexts?: { text: string; strongText?: string }[];
  bgImage?: string;
  type?: string;
}
