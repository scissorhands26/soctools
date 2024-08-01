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
import { ShieldIcon, BarChartIcon, UsersIcon } from "lucide-react";
import { HomeChart } from "@/components/HomeChart";
import Image from "next/image";

export default function SOCPulsePage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-black text-white">
      <main className="flex-1">
        <section
          id="hero"
          className="bg-gradient-to-b from-black to-blue-900 py-12 md:py-24 lg:py-32"
        >
          <div className="container grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                SOC Pulse: Streamline Your Incident Response
              </h1>
              <p className="text-muted-foreground md:text-xl">
                SOC Pulse is a powerful Incident Response Ticketing Framework
                designed to integrate seamlessly with Wazuh, helping your SOC
                operate more efficiently.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/get-started"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <Image
                className="border border-white rounded-md"
                alt="SOC Pulse"
                src={"/app_images/socpulse.png"}
                height={1000}
                width={1000}
              ></Image>
            </div>
          </div>
        </section>
        <section id="features" className="py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Key Features of SOC Pulse
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SOC Pulse offers a robust set of features designed to enhance
                  and streamline your security operations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-7xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Incident Response</h3>
                <p className="text-sm text-muted-foreground">
                  Utilize a comprehensive suite of tools for rapid incident
                  response, including incident management, threat intelligence,
                  and forensic analysis.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Threat Hunting</h3>
                <p className="text-sm text-muted-foreground">
                  Employ advanced threat hunting capabilities to proactively
                  detect and neutralize potential security threats.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Automation</h3>
                <p className="text-sm text-muted-foreground">
                  Enhance efficiency and reduce manual effort with support for
                  AI features. Deploy your own local AI, or use cloud compute.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Reporting & Dashboards</h3>
                <p className="text-sm text-muted-foreground">
                  Generate comprehensive reports and dashboards to track your
                  security posture, identify trends, and communicate with
                  stakeholders.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Case Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage and assign incident response tickets with ease,
                  ensuring efficient handling and resolution of security events.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Chat with Analysts</h3>
                <p className="text-sm text-muted-foreground">
                  Communicate with your team in real-time to collaborate on
                  incidents and streamline the response process.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="integration"
          className="bg-slate-900 py-12 md:py-24 lg:py-32"
        >
          <div className="container space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Seamless Integration with Wazuh
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SOC Pulse integrates out of the box with Wazuh, providing an
                  effortless setup and immediate access to powerful incident
                  response tools.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Alerts</CardTitle>
                  <CardDescription>
                    Get real-time alerts from Wazuh and manage them efficiently
                    with SOC Pulse&apos;s incident response features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <ShieldIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">
                      Real-time Alerts
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Comprehensive Dashboards</CardTitle>
                  <CardDescription>
                    Utilize comprehensive dashboards to gain insights into your
                    security posture and incident response metrics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BarChartIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">Dashboards</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Collaborative Tools</CardTitle>
                  <CardDescription>
                    Collaborate with your team using built-in chat and case
                    management tools, ensuring smooth and efficient incident
                    handling.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium">Collaboration</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started with SOC Pulse?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contact us to learn more about how SOC Pulse can enhance your
                  security operations center and streamline your incident
                  response.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
