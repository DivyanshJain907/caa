"use client";

import { useState } from "react";

type Service = {
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
};

type ServiceModalProps = {
  children: React.ReactNode;
  service: Service;
};

export default function ServiceModal({ children, service }: ServiceModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full cursor-pointer text-left transition hover:opacity-75"
      >
        {children}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 transition hover:bg-slate-200"
            >
              ✕
            </button>

            <div className="flex flex-col gap-6">
              {service.imageUrl && (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="h-56 w-full rounded-2xl object-cover"
                />
              )}

              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
                  {service.category}
                </div>
                <h2 className="text-2xl font-bold text-navy-900">
                  {service.title}
                </h2>
              </div>

              <p className="leading-relaxed text-slate-600">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
