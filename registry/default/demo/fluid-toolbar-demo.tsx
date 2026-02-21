"use client";
import FluidToolbar from "../example/fluid-toolbar";

const submissions: any[] = [
     {
      status: "pending",
      studentName: 'Alice Johnson',
      studentEmail: 'alice.johnson@example.com',
      submissionDate: "2025-12-15",
      score: 20,
      avatar: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200',
      assessment: 'Testing Program Course Assessment',
     },
      {
      status: "active",
      studentName: 'Michael Faraday',
      studentEmail: 'michael.faraday@example.com',
      submissionDate: "2026-2-15",
      score: 30,
      avatar: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200',
      assessment: 'Course Assessment',
     }
    ]

export default function FluidToolbarDemo() {
  return (
    <section className="w-full">
        <FluidToolbar
          submissions={submissions}
        />
    </section>
  );
}

export function FluidToolbarWithTable() {
  return (
    <section className="w-full bg-background py-6 px-4">
      <div className="w-full">
       <FluidToolbar
          submissions={submissions}
        />
      </div>
    </section>
  );
}