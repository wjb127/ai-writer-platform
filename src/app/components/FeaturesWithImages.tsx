"use client";

import Image from 'next/image';
import { ReactNode } from 'react';

interface Feature {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface FeaturesWithImagesProps {
  features: Feature[];
  title: string;
}

export default function FeaturesWithImages({ features, title }: FeaturesWithImagesProps) {
  return (
    <section className="w-full py-16 px-6 sm:px-10 lg:px-20 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
      <div className="max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center mb-16 last:mb-0`}
          >
            <div className="w-full md:w-1/2">
              <Image
                src={feature.imageSrc}
                alt={feature.imageAlt}
                width={600}
                height={400}
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 