"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShieldIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useMemo } from "react";

const apps = [
  {
    name: "PowerPoint Scanner",
    description:
      "Scan PowerPoint files for classified markings, sensitive information, or a custom wordlist.",
    href: "apps/powerpointscanner",
    tags: [
      "PowerPoint",
      "Scanner",
      "Analysis",
      "Classification",
      "Client-Side",
    ],
    icon: ShieldIcon,
  },
  {
    name: "File Examiner",
    description: "Examine files for metadata, hashes, and other information.",
    href: "apps/fileexaminer",
    tags: ["File", "Metadata", "Hash", "Client-Side"],
    icon: ShieldIcon,
  },
  {
    name: "PDF Extractor",
    description: "Extract text and images from PDF files.",
    href: "apps/pdfextractor",
    tags: ["PDF", "Extractor", "Text", "Image", "Client-Side"],
    icon: ShieldIcon,
  },
  {
    name: "AI File Examiner",
    description:
      "Analyze files for security issues using OpenAI's GPT-4-mini engine.",
    href: "apps/aifileexaminer",
    tags: ["AI", "File", "Analysis", "Security", "Server-Side"],
    icon: ShieldIcon,
  },
  {
    name: "URL Tool",
    description:
      "Encode and decode URLs. Analyze URL structure, query parameters, and encoded values.",
    href: "apps/urltool",
    tags: [
      "URL",
      "Encoder",
      "Decoder",
      "Analysis",
      "Parameters",
      "Client-Side",
    ],
    icon: LinkIcon,
  },
];

export default function AppsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredAndSortedApps = useMemo(() => {
    return apps
      .filter((app) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          app.name.toLowerCase().includes(searchLower) ||
          app.description.toLowerCase().includes(searchLower) ||
          app.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "tags":
            return a.tags.length - b.tags.length;
          case "tags-desc":
            return b.tags.length - a.tags.length;
          default:
            return 0;
        }
      });
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Security Tools</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="tags">Tags (Least)</SelectItem>
              <SelectItem value="tags-desc">Tags (Most)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedApps.length > 0 ? (
            filteredAndSortedApps.map((app) => (
              <Card key={app.href} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{app.name}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-2">
                    {React.createElement(app.icon)}
                    <span className="text-sm font-medium">{app.name}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {app.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                        onClick={() => setSearchQuery(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={app.href}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Launch App
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No tools found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
