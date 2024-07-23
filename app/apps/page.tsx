import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AppsPage() {
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
  ];

  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-4xl font-bold text-center mb-4">Apps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => (
          <Card key={app.href}>
            <CardHeader>
              <CardTitle>{app.name}</CardTitle>
              <CardDescription>{app.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {React.createElement(app.icon)}
                <span className="text-sm font-medium">{app.name}</span>
              </div>
              <div className="mt-2">
                {app.tags.map((tag) => (
                  <Badge className="mx-1" key={tag}>
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
        ))}
      </div>
    </div>
  );
}
