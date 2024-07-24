import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  BoltIcon,
  BookOpenIcon,
  FileTextIcon,
  MenuIcon,
  ShieldIcon,
  TargetIcon,
  VideoIcon,
} from "lucide-react";
import { HomeChart } from "@/components/HomeChart";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section id="hero" className="bg-black py-12 md:py-24 lg:py-32">
          <div className="container grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Empower Your SOC with Our Tools and Links
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Discover a curated collection of web applications and resources
                designed to streamline your security operations center
                workflows.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="apps"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Explore Apps
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div>
              <HomeChart />
            </div>
          </div>
        </section>
        {/* <section id="features" className="py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our toolkit provides a comprehensive set of tools and
                  resources to streamline your security operations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-7xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Incident Response</h3>
                <p className="text-sm text-muted-foreground">
                  Access a suite of tools to quickly respond to security
                  incidents, including incident management, threat intelligence,
                  and forensic analysis.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Threat Hunting</h3>
                <p className="text-sm text-muted-foreground">
                  Leverage advanced threat hunting capabilities to proactively
                  identify and mitigate potential security threats.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Automation</h3>
                <p className="text-sm text-muted-foreground">
                  Streamline your security operations with automated workflows,
                  reducing manual effort and improving efficiency.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure your organization's security practices align with
                  industry standards and regulations with our compliance tools
                  and resources.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Reporting</h3>
                <p className="text-sm text-muted-foreground">
                  Generate comprehensive reports and dashboards to track your
                  security posture, identify trends, and communicate with
                  stakeholders.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Knowledge Base</h3>
                <p className="text-sm text-muted-foreground">
                  Access a curated knowledge base of security best practices,
                  tutorials, and industry insights to continuously improve your
                  security operations.
                </p>
              </div>
            </div>
          </div>
        </section> */}
        <section id="apps" className="bg-slate-900 py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Web Apps
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our collection of web applications designed to
                  streamline your security operations.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>PowerPoint Scanner</CardTitle>
                  <CardDescription>
                    Scan PowerPoint files for classified markings, sensitive
                    information, or a custom wordlist.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <ShieldIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">
                      PowerPoint Scanner
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="apps/powerpointscanner"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Launch App
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>File Examiner</CardTitle>
                  <CardDescription>
                    Examine files for metadata, hashes, and other information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <ShieldIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">File Examiner</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="apps/fileexaminer"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Launch App
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>PDF Extractor</CardTitle>
                  <CardDescription>
                    Extract metadata from PDF files, examine links, and extract
                    text and images.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <ShieldIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">PDF Extractor</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="apps/pdfextractor"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Launch App
                  </Link>
                </CardFooter>
              </Card>
              {/* <Card>
                <CardHeader>
                  <CardTitle>Threat Intelligence Hub</CardTitle>
                  <CardDescription>
                    A centralized platform for aggregating and analyzing threat
                    intelligence data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TargetIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">Threat Hunting</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Launch App
                  </Link>
                </CardFooter>
              </Card> */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Security Automation Toolkit</CardTitle>
                  <CardDescription>
                    A suite of tools to automate security workflows and
                    streamline your operations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BoltIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">Automation</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Launch App
                  </Link>
                </CardFooter>
              </Card> */}
            </div>
          </div>
        </section>
        <section id="resources" className="py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Helpful Resources
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our collection of security resources to enhance your
                  knowledge and skills.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Playbooks</CardTitle>
                  <CardDescription>
                    A library of security playbooks covering various incident
                    response and threat hunting scenarios.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">
                      Incident Response
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Explore Playbooks
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Security Tutorials</CardTitle>
                  <CardDescription>
                    A collection of step-by-step tutorials covering various
                    security topics and best practices.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <VideoIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">Training</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Watch Tutorials
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Security Research</CardTitle>
                  <CardDescription>
                    Explore the latest security research, whitepapers, and
                    industry insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">Research</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Read Research
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
