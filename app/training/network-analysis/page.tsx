import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  NetworkIcon,
  BookOpenIcon,
  ClockIcon,
  GraduationCapIcon,
  CheckCircleIcon,
} from "lucide-react";

export default function NetworkAnalysisCoursePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="bg-black py-12 md:py-24">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex items-center gap-2">
                <NetworkIcon className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Basic Network Analysis
                </h1>
              </div>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Master the fundamentals of network traffic analysis and security
                monitoring
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Course Info Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-muted-foreground" />
                      <span>4-6 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCapIcon className="w-5 h-5 text-muted-foreground" />
                      <span>Beginner Level</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpenIcon className="w-5 h-5 text-muted-foreground" />
                      <span>5 Modules</span>
                    </div>
                    <Link
                      href="/training/network-analysis/module-1"
                      className="inline-flex w-full h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      Start Course
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prerequisites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Basic understanding of TCP/IP</li>
                      <li>Familiarity with command line</li>
                      <li>Wireshark installed (optional)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Course Content */}
              <div className="md:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Course Overview</h2>
                  <p className="text-muted-foreground">
                    This course will teach you the essential skills needed for
                    network traffic analysis and security monitoring.
                    You&apos;ll learn how to use common tools, interpret network
                    protocols, and identify suspicious network behavior.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">What You&apos;ll Learn</h2>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 mt-1 text-primary" />
                      <div>
                        <h3 className="font-medium">
                          Network Protocol Analysis
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Understanding common protocols and their security
                          implications
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 mt-1 text-primary" />
                      <div>
                        <h3 className="font-medium">
                          Packet Analysis with Wireshark
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Using Wireshark to capture and analyze network traffic
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 mt-1 text-primary" />
                      <div>
                        <h3 className="font-medium">Security Monitoring</h3>
                        <p className="text-sm text-muted-foreground">
                          Identifying suspicious network behavior and common
                          attack patterns
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 mt-1 text-primary" />
                      <div>
                        <h3 className="font-medium">Network Security Tools</h3>
                        <p className="text-sm text-muted-foreground">
                          Introduction to common network security monitoring
                          tools
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Course Modules</h2>
                  <div className="grid gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          Module 1: Introduction to Network Analysis
                        </CardTitle>
                        <CardDescription>
                          Basic concepts, tools, and methodology overview
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          Module 2: Network Protocols Deep Dive
                        </CardTitle>
                        <CardDescription>
                          Understanding common protocols and their security
                          implications
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Module 3: Wireshark Fundamentals</CardTitle>
                        <CardDescription>
                          Getting started with Wireshark for packet analysis
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          Module 4: Security Monitoring Basics
                        </CardTitle>
                        <CardDescription>
                          Learning to identify suspicious network behavior
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Module 5: Practical Analysis</CardTitle>
                        <CardDescription>
                          Hands-on exercises and real-world scenarios
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
