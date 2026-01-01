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
import {
  ShieldIcon,
  LinkIcon,
  PresentationIcon,
  FileIcon,
  FileCodeIcon,
  SearchIcon,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useMemo } from "react";

const apps = [
  {
    name: "PowerPoint Scanner",
    description:
      "Scan PowerPoint files for classified markings, sensitive information, or a custom wordlist.",
    href: "/tools/powerpointscanner",
    tags: [
      "PowerPoint",
      "Scanner",
      "Analysis",
      "Classification",
      "Client-Side",
    ],
    icon: PresentationIcon,
  },
  {
    name: "File Examiner",
    description: "Examine files for metadata, hashes, and other information.",
    href: "/tools/fileexaminer",
    tags: ["File", "Metadata", "Hash", "Client-Side"],
    icon: FileIcon,
  },
  {
    name: "PDF Extractor",
    description: "Extract text and images from PDF files.",
    href: "/tools/pdfextractor",
    tags: ["PDF", "Extractor", "Text", "Image", "Client-Side"],
    icon: FileCodeIcon,
  },
  {
    name: "AI File Examiner",
    description:
      "Analyze files for security issues using OpenAI's GPT-4-mini engine.",
    href: "/tools/aifileexaminer",
    tags: ["AI", "File", "Analysis", "Security", "Server-Side"],
    icon: ShieldIcon,
  },
  {
    name: "URL Tool",
    description:
      "Encode and decode URLs. Analyze URL structure, query parameters, and encoded values.",
    href: "/tools/urltool",
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
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-black py-16 md:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container mx-auto relative px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Security Tools
                </h1>
                <p className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed">
                  A comprehensive collection of security analysis tools to help you investigate files, analyze data, and streamline your operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-slate-950">
          <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-800 text-white placeholder:text-gray-500 focus:border-primary/50"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px] bg-slate-900/50 border-slate-800 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="tags">Tags (Least)</SelectItem>
                  <SelectItem value="tags-desc">Tags (Most)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedApps.length > 0 ? (
                filteredAndSortedApps.map((app) => {
                  const IconComponent = app.icon;
                  return (
                    <Card
                      key={app.href}
                      className="group relative overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <CardHeader className="relative">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{app.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {app.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative">
                        <div className="flex flex-wrap gap-2">
                          {app.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors bg-slate-800/50 border-slate-700 text-gray-300"
                              onClick={() => setSearchQuery(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="relative">
                        <Link
                          href={app.href}
                          className="group/btn inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 w-full"
                          prefetch={false}
                        >
                          Launch App
                          <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900/50 border border-slate-800 mb-4">
                    <SearchIcon className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 text-lg">No tools found matching your search.</p>
                  <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms or filters.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
