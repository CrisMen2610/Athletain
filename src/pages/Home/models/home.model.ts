import { CtaProps } from "sections/CTASection/models/cta";
import { HeroProps } from "sections/hero/models/hero";
import { Service } from "sections/ServicesSection/models/services";
import { Testimonial } from "sections/TestimonialSlider/TestimonialSlider";

export interface homeContent {
  Home: {
    banner: {
      title: string;
      subtitle: string;
      description: string;
      buttonText: string;
    };
    services: Service[];
    cta: CtaProps;
    hero?: HeroProps;
    // testimonials: Testimonial[];
  };
}
