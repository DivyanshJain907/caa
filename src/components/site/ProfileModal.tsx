"use client";

import { useState } from "react";

type Profile = {
  name: string;
  role: string;
  specialization: string;
  about?: string;
  imageUrl?: string;
};

type ProfileModalProps = {
  children: React.ReactNode;
  profile: Profile;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfileModal({ children, profile }: ProfileModalProps) {
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
              {profile.imageUrl ? (
                <img
                  src={profile.imageUrl}
                  alt={profile.name}
                  className="h-56 w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-56 w-full items-center justify-center rounded-2xl bg-navy-900 text-4xl font-semibold text-ivory">
                  {initials(profile.name)}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-navy-900">
                  {profile.name}
                </h2>
                <div className="mt-1 text-sm uppercase tracking-widest text-gold font-semibold">
                  {profile.role}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                    Specialization
                  </div>
                  <p className="text-sm text-slate-600">
                    {profile.specialization}
                  </p>
                </div>

                {profile.about && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                      About
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {profile.about}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
