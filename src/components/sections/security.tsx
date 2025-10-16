import { mainTitle, description, securityFeaturesContent } from './Security.content';
import React from 'react';

export default function Security() {
  return (
    <section id="security" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
            {mainTitle}
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            {description}
          </p>
        </div>
        {/* --- MODIFIED GRID BEHAVIOR --- */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {securityFeaturesContent.map((feature, index) => (
            // --- MODIFIED CARD STYLING ---
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-primary/5 border border-primary/20 shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
                {/* Render the icon directly from the content */}
                {feature.icon && React.createElement(feature.icon, { className: "h-7 w-7" })}
              </div>
              <h3 className="text-xl font-semibold text-white/90 mb-3">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}