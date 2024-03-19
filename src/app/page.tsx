"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import TutorialSection from "@/components/TutorialSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";

export default function Home() {
  return (
    <main className="space-y-40 mb-40">
      <HeroSection />
      <TutorialSection />
      <TestimonialsSection />
      <CallToActionSection />
    </main>
  );
}
