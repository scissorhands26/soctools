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
import { NetworkIcon, CpuIcon, ShieldAlertIcon } from "lucide-react";

export default function TrainingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="bg-black py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Security Training
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Level up your security analysis skills with our hands-on
                training courses.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Available Course */}
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <NetworkIcon className="w-6 h-6 text-primary" />
                    <CardTitle>Basic Network Analysis</CardTitle>
                  </div>
                  <CardDescription>
                    Learn the fundamentals of network traffic analysis, packet
                    inspection, and network security monitoring.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                    <li>Understanding network protocols</li>
                    <li>Packet analysis with Wireshark</li>
                    <li>Network security fundamentals</li>
                    <li>Traffic analysis techniques</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/training/network-analysis"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Start Course
                  </Link>
                </CardFooter>
              </Card>

              {/* Coming Soon - Process Analysis */}
              <Card className="border-muted">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CpuIcon className="w-6 h-6 text-muted-foreground" />
                    <CardTitle>Process Analysis</CardTitle>
                  </div>
                  <CardDescription>
                    Master the art of analyzing system processes, memory
                    forensics, and malware behavior analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                    <li>Process monitoring techniques</li>
                    <li>Memory analysis fundamentals</li>
                    <li>Malware behavior patterns</li>
                    <li>System forensics basics</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button disabled>Coming Soon</Button>
                </CardFooter>
              </Card>

              {/* Coming Soon - Threat Hunting Fundamentals */}
              <Card className="border-muted">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ShieldAlertIcon className="w-6 h-6 text-muted-foreground" />
                    <CardTitle>Threat Hunting Fundamentals</CardTitle>
                  </div>
                  <CardDescription>
                    Learn proactive threat detection techniques, IOC analysis,
                    and threat intelligence utilization.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                    <li>Threat hunting methodologies</li>
                    <li>IOC analysis and creation</li>
                    <li>Threat intelligence platforms</li>
                    <li>Detection engineering basics</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button disabled>Coming Soon</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
