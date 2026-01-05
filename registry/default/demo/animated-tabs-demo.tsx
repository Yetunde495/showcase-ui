"use client";
import { AnimatedTabs } from "../example/animated-tabs";

const whatWeOfferTabContent = [
  {
    value: "course",
    title: "Course Creation",
    content: (
      <div>
        <div className="grid place-items-center grid-cols-1 gap-6 w-full h-full">
          <div>
            <img
              src={`https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200`}
              alt="course creation img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "learner",
    title: `Learner's Dashboard`,
    content: (
      <div>
        <div className="grid place-items-center grid-cols-1 gap-6 w-full h-full">
          <div>
            <img
              src={`https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200`}
              alt="course creation img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "certificate",
    title: "Certificate",
    content: (
      <div>
        <div className="grid grid-cols-1 gap-6 w-full h-full">
          <div>
            <img
              src={`https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200`}
              alt="certificate img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "liveclass",
    title: "Live Classes",
    content: (
      <div>
        <div className="grid  place-items-center grid-cols-1 gap-6 w-full h-full">
          <div>
            <img
              src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200`}
              alt="live-class img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "assessments",
    title: "Assessments",
    content: (
      <div>
        <div className="grid place-items-center grid-cols-1 gap-6 w-full h-full">
          <div>
            <img
              src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200`}
              alt="certificate img"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    ),
  },
];

export default function AnimatedTabsDemo() {
  return (
    <section className="w-full bg-background py-6 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <AnimatedTabs
          tabs={whatWeOfferTabContent}
          activeTabClassName="bg-primary text-primary-foreground shadow-md"
        />
      </div>
    </section>
  );
}
