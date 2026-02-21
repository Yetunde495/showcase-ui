"use client";

import Image from "next/image";
import Bucket from "./bucket";
import Link from "next/link";
import { Button } from "./ui/button";
import Header from "./header";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
} from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { CenterCarousel } from "./center-carousel";

import { CarouselItem } from "@/components/center-carousel";

export const mockCarouselItems: CarouselItem[] = [
  {
    id: "madrid",
    image:
      "https://cdn.pixabay.com/photo/2020/09/18/13/07/smoothie-5581794_1280.jpg",
    title: "Madrid, Spain",
  },
  {
    id: "tokyo",
    image:
      "https://cdn.pixabay.com/photo/2020/09/18/13/07/smoothie-5581794_1280.jpg",
    title: "Tokyo, Japan",
  },
  {
    id: "monaco",
    image:
      "https://cdn.pixabay.com/photo/2020/09/18/13/07/smoothie-5581794_1280.jpg",
    title: "Monte Carlo, Monaco",
    subtitle: "$1200 / day",
  },
  {
    id: "belgium",
    image:
      "https://cdn.pixabay.com/photo/2020/09/18/13/07/smoothie-5581794_1280.jpg",
    title: "Wallonia, Belgium",
  },
  {
    id: "rome",
    image:
      "https://cdn.pixabay.com/photo/2020/09/18/13/07/smoothie-5581794_1280.jpg",
    title: "Rome, Italy",
  },
];

const Hero = () => {
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();

  const insetVal = useTransform(scrollY, [0, 300], isMobile ? [8, 0] : [14, 0]);
  const bottomInsetVal = useTransform(
    scrollY,
    [0, 300],
    isMobile ? [0, 0] : [16, 0],
  );
  const radius = useTransform(scrollY, [0, 300], isMobile ? [24, 0] : [32, 0]);

  const clipPathSpec = useMotionTemplate`inset(0px ${insetVal}px ${bottomInsetVal}px ${insetVal}px round ${radius}px)`;

  return (
    <>
      <Header />
      <motion.section className="relative min-h-[calc(100svh-4rem)] bg-background overflow-hidden  py-[7%] flex flex-col ">
        <div className="relative z-10 w-full px-[4%] flex-1 flex flex-col justify-center">
          <div className="flex flex-col gap-auto flex-1 lg:gap-12 max-sm:gap-12">
            <div className="flex-1 flex flex-col gap-4 max-lg:w-full  max-sm:justify-end ">
              <div className="lg:max-w-2xl">
                <h1 className=" tracking-tight font-bold text-balance text-4xl md:text-5xl lg:text-6xl text-foreground ">
                  A micro-interaction UI library for professionals.
                </h1>
                <p className="mt-3 text-pretty text-lg max-md:text-md leading-tight text-shadow-2xs text-foreground/50 max-sm:px-2">
                  People don’t fall in love with components. They fall in love
                  with how something feels.
                </p>
              </div>

              <div className="mt-4 flex  items-center justify-center gap-2  lg:justify-start">
                <Button size="lg" className="px-5 text-base rounded-full">
                  <Link href="/docs/introduction">
                    <span className="text-nowrap">Get Started</span>
                  </Link>
                </Button>
                <Button
                  key={2}
                  size="lg"
                  variant="secondary"
                  className="px-5 text-base rounded-full "
                >
                  <Link
                    href="https://github.com/iurvish/uselayouts"
                    className="flex items-center gap-2"
                  >
                    <HugeiconsIcon icon={GithubIcon} />
                    <span className="text-nowrap">Github</span>
                  </Link>
                </Button>
              </div>
            </div>

            <motion.div
              //      style={{
              //   clipPath: clipPathSpec,
              //   transform: "translateZ(0)",
              // }}
              // className="w-full will-change-transform squircle p-[2%] bg-slate-200"
              className="w-full p-[2%]"
            >
              {/* <CenterCarousel
                items={mockCarouselItems}
                cardWidth={340}
                spacing={280}
              /> */}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Hero;
