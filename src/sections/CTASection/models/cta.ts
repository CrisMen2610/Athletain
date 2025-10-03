export interface CtaProps {
  title: string;
  text?: string;
  bgImage?: string;
  overlay?: string;
  maxWidth?: number;
  type?: string;
  subItems?: subItem[];
  center?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface subItem {
  title: string;
  text: string;
}
