"use client";
import React, { useEffect, useRef, useMemo, memo } from "react";
import { gsap } from "gsap";

// Define proper types for the rules data
type Rule = {
  id: string;
  text: string;
  icon: string;
};

// Convert hard-coded rule arrays into a single data structure
const RULES_DATA: Record<string, Rule[]> = {
  general: [
    {
      id: "g1",
      text: "Only for BCA, BSC [Computer Science] and BVOC [Software] students.",
      icon: "⚓",
    },
    { id: "g2", text: "Maximum of 18 Students per team.", icon: "⚓" },
    { id: "g3", text: "Maximum 2 full teams per college.", icon: "⚓" },
    { id: "g4", text: "Individuals can join for any event.", icon: "⚓" },
    { id: "g4", text: "There will be no registration fees.", icon: "⚓" },
  ],
  additional: [
    {
      id: "a1",
      text: "Teams must register through our website.",
      icon: "🏴‍☠️",
    },
    {
      id: "a2",
      text: "Participants must present before 9.00 AM.",
      icon: "🏴‍☠️",
    },
    {
      id: "a3",
      text: "Teams must confirm their registration on the day of the event with the registration committee.",
      icon: "🏴‍☠️",
    },
    { id: "a4", text: "Participants are advised to carry their college ID card and permission letter on the day of the event.", icon: "🏴‍☠️" },
    { id: "a5", text: "For the overall championship, a team must participate in all events.", icon: "🏴‍☠️" },
    { id: "a6", text: "Breakfast and lunch will be provided.", icon: "🏴‍☠️" },
  ],
};

// Memoized rule list component to prevent unnecessary re-renders
const RulesList = memo(({ rules }: { rules: Rule[] }) => (
  <ul className="space-y-2 font-mono text-blue-900">
    {rules.map((rule) => (
      <li key={rule.id} className="flex items-start">
        <span className="mr-3 text-blue-600">{rule.icon}</span>
        <span className="text-xs sm:text-sm">{rule.text}</span>
      </li>
    ))}
  </ul>
));
RulesList.displayName = "RulesList";

// Memoized wave animation component
const WaveAnimation = memo(() => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    // Initial wave path
    // const initialPath = "M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,42.7C672,32,768,32,864,58.7C960,85,1056,139,1152,154.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

    // Final wave path
    const finalPath =
      "M0,64L48,85.3C96,107,192,149,288,154.7C384,160,480,128,576,106.7C672,85,768,75,864,90.7C960,107,1056,149,1152,160C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

    // Animate wave
    tl.to(pathRef.current, {
      duration: 4,
      attr: { d: finalPath },
      ease: "power1.inOut",
    });

    // Cleanup function to prevent memory leaks
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative flex h-[100vh] flex-col">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="z-10"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0099ff" stopOpacity="0" />
            <stop offset="80%" stopColor="#0099ff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          
          fill="url(#waveGradient)"
          d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,42.7C672,32,768,32,864,58.7C960,85,1056,139,1152,154.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L0,320Z"
        ></path>
      </svg> */}

      {/* Smooth transition using a gradient in the div itself */}
      <div className="-mt-[2px] flex-grow bg-gradient-to-b from-transparent via-[#0099ff4c] to-[#000000]"></div>
    </div>
  );
});
WaveAnimation.displayName = "WaveAnimation";

export const RulesSection: React.FC = () => {
  // Use useMemo to prevent unnecessary recreations of rules data

  const generalRules = useMemo(() => RULES_DATA.general ?? [], []);
  const additionalRules = useMemo(() => RULES_DATA.additional ?? [], []);

  return (
    <section
      id="rules"
      className="bg-[#030712] px-2"
      aria-labelledby="rules-heading"
    >
      {/* Oceanic Wave Background */}
      <div className="flex-center w-full">
        {/* <div className="pointer-events-none absolute inset-0">
          <div className="bg-wave-1 animate-wave-1 absolute -bottom-10 left-0 right-0 h-1 opacity-30"></div>
          <div className="bg-wave-2 animate-wave-2 absolute -bottom-10 left-0 right-0 h-1 opacity-50"></div>
        </div> */}

        {/* Rules Content */}
        <div className="relative z-10 mx-auto flex items-center justify-center px-2">
          <div className="w-full max-w-lg rounded-xl bg-white/10 md:p-16 p-3 shadow-lg backdrop-blur-sm">
            <header className="mb-3 text-center">
              <h1
                id="rules-heading"
                className="text-xl font-medium tracking-wide text-white drop-shadow sm:text-2xl"
              >
                PIRATE CODE
              </h1>
              <h2 className="text-sm font-medium text-white/70">
                General Rules
              </h2>
            </header>

            <div className="flex flex-col gap-3 overflow-hidden">
              <div className="border border-blue-300 bg-blue-100 p-2 py-3 rounded-xl">
                <RulesList rules={generalRules} />
              </div>

              <div className="border border-blue-300 bg-blue-100 p-2 py-3 rounded-xl">
                <RulesList rules={additionalRules} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Wave */}
      {/* <WaveAnimation /> */}
    </section>
  );
};
