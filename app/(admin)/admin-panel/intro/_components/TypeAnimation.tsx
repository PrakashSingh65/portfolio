'use client';

import Typewriter from 'typewriter-effect';

export default function TypeAnimation() {
  return (
    <div className="text-xl md:text-2xl font-semibold text-[#00FF88]">
      <Typewriter
        options={{
          strings: [
            'Building Scalable Solutions for the Modern Web.',
            'Full Stack Developer',
            'Next.js Specialist',
            'UI/UX Enthusiast'
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
}