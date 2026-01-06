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

const tabContent = [
  {
    value: "green",
    title: "Green",
    content: (
      <div>
        <div>
          <img
            src={`https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200`}
            alt="img"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    ),
  },
  {
    value: "yellow",
    title: `Yellow`,
    content: (
      <div>
        <div>
          <img
            src={`https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200`}
            alt="blue"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    value: "blue",
    title: "Blue",
    content: (
      <div>
        <div>
          <img
            src={`https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200`}
            alt="certificate img"
            className="w-full h-full rounded-lg object-cover"
          />
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

export function AnimatedTabsWithArrowDemo() {
  return (
    <section className="w-full bg-background py-6 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <AnimatedTabs
          tabs={tabContent}
          showArrows
          activeTabClassName="bg-primary text-primary-foreground shadow-md"
        />
      </div>
    </section>
  );
}
