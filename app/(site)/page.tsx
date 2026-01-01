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
  BookOpenIcon,
  FileTextIcon,
  ShieldIcon,
  VideoIcon,
  FileSearchIcon,
  FileCheckIcon,
  BarChart3Icon,
  ArrowRightIcon,
  PresentationIcon,
  FileIcon,
  FileCodeIcon,
} from "lucide-react";
import { HomeChart } from "@/components/HomeChart";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-black py-16 md:py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container mx-auto relative grid gap-12 md:grid-cols-2 items-center px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
                <ShieldIcon className="w-4 h-4" />
                <span>Security Operations Tools</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Work Smarter, Not Harder with SOC Tools
              </h1>
              <p className="text-lg text-gray-400 md:text-xl max-w-xl leading-relaxed">
                A collection of web-based tools designed to help security
                analysts investigate files, analyze data, and streamline their
                daily operations.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row pt-2">
                <Link
                  href="/tools"
                  className="group inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  prefetch={false}
                >
                  Browse Tools
                  <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/training"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-700 bg-transparent px-8 text-sm font-semibold text-gray-300 transition-all hover:border-gray-600 hover:bg-gray-800/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  prefetch={false}
                >
                  View Training
                </Link>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-3xl"></div>
              <div className="relative">
                <div className="[&>div]:border-slate-800 [&>div]:bg-slate-900/50 [&>div]:backdrop-blur-sm">
                  <HomeChart />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-slate-950">
          <div className="container mx-auto space-y-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Tool Categories
                </h2>
                <p className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed">
                  Our tools are designed to help security analysts with various
                  aspects of their work.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <div className="group relative grid gap-4 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-xl border border-slate-800/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <FileSearchIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">File Analysis</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Tools for examining files, extracting metadata, and analyzing
                    content for security concerns.
                  </p>
                </div>
              </div>
              <div className="group relative grid gap-4 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-xl border border-slate-800/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <FileCheckIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Document Inspection</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Specialized tools for analyzing documents like PDFs and
                    PowerPoint files for sensitive information.
                  </p>
                </div>
              </div>
              <div className="group relative grid gap-4 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-xl border border-slate-800/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <BarChart3Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Data Analysis</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Tools to help analyze and visualize security-related data and
                    metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apps Section */}
        <section id="apps" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
          <div className="container mx-auto space-y-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Top Tools
                </h2>
                <p className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed">
                  Start using our collection of security analysis tools right
                  away.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="group relative overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <PresentationIcon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">PowerPoint Scanner</CardTitle>
                  <CardDescription className="text-gray-400">
                    Scan PowerPoint files for classified markings, sensitive
                    information, or a custom wordlist.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="relative">
                  <Link
                    href="/tools/powerpointscanner"
                    className="group/btn inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 w-full"
                    prefetch={false}
                  >
                    Launch App
                    <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="group relative overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <FileIcon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">File Examiner</CardTitle>
                  <CardDescription className="text-gray-400">
                    Examine files for metadata, hashes, and other information.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="relative">
                  <Link
                    href="/tools/fileexaminer"
                    className="group/btn inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 w-full"
                    prefetch={false}
                  >
                    Launch App
                    <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="group relative overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <FileCodeIcon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">PDF Extractor</CardTitle>
                  <CardDescription className="text-gray-400">
                    Extract metadata from PDF files, examine links, and extract
                    text and images.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="relative">
                  <Link
                    href="/tools/pdfextractor"
                    className="group/btn inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 w-full"
                    prefetch={false}
                  >
                    Launch App
                    <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="flex justify-center pt-4">
              <Button
                asChild
                variant="outline"
                className="group h-11 border-slate-700 bg-slate-900/50 text-gray-300 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 hover:text-white hover:shadow-lg hover:shadow-primary/10"
              >
                <Link href="/tools" prefetch={false}>
                  View All Tools
                  <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-slate-950">
          <div className="container mx-auto space-y-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Helpful Resources
                </h2>
                <p className="max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed">
                  Explore our collection of security resources to enhance your
                  knowledge and skills.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="group relative overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <BookOpenIcon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Security Playbooks</CardTitle>
                  <CardDescription className="text-gray-400">
                    A library of security playbooks covering various incident
                    response and threat hunting scenarios.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="relative">
                  <Button
                    disabled
                    className="w-full h-10 rounded-lg bg-slate-800 text-gray-400 border border-slate-700 cursor-not-allowed"
                  >
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
              <Card className="group relative overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <VideoIcon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Security Tutorials</CardTitle>
                  <CardDescription className="text-gray-400">
                    A collection of step-by-step tutorials covering various
                    security topics and best practices.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="relative">
                  <Button
                    disabled
                    className="w-full h-10 rounded-lg bg-slate-800 text-gray-400 border border-slate-700 cursor-not-allowed"
                  >
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
              <Card className="group relative overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <FileTextIcon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Security Research</CardTitle>
                  <CardDescription className="text-gray-400">
                    Explore the latest security research, whitepapers, and
                    industry insights.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="relative">
                  <Button
                    disabled
                    className="w-full h-10 rounded-lg bg-slate-800 text-gray-400 border border-slate-700 cursor-not-allowed"
                  >
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
