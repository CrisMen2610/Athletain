export interface CtaProps {
  title: string;
  text: string;
  bgImage?: string;
  overlay?: string;
  maxWidth?: number;
  center?: boolean;
  className?: string;
  children?: React.ReactNode;
}
