"use client";

import { URLTool } from "@/components/tools/URLTool";

export default function URLToolPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-black py-8 md:py-12 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container mx-auto relative px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-2 text-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                URL Tool
              </h1>
              <p className="max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed">
                Encode and decode URLs. Analyze URL structure, query parameters, and encoded values.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-gradient-to-b from-black to-slate-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <URLTool />
          </div>
        </section>
      </main>
    </div>
  );
}
