"use client";

import { URLTool } from "@/components/tools/URLTool";

export default function URLToolPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold">URL Tool</h1>
        <p className="text-muted-foreground max-w-[700px]">
          Encode and decode URLs. Analyze URL structure, query parameters, and
          encoded values.
        </p>
      </div>
      <div className="mt-8">
        <URLTool />
      </div>
    </div>
  );
}
