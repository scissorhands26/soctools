"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon, Rainbow } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import ReactMarkdown from "react-markdown";

export default function HomePage() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [refreshingTickets, setRefreshingTickets] = useState(true);
  const [refreshingInterval, setRefreshingInterval] = useState(3000);
  const [refreshingProgress, setRefreshingProgress] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [tickets, setTickets] = useState<any>([]);
  const [markdownResponse, setMarkdownResponse] = useState("");

  async function fetchTickets() {
    try {
      const response = {
        ok: true,
        json: async () => [
          {
            id: 36151,
            alert_id: "1822543000.50765432",
            source: "wuzah",
            created_timestamp: "2024-08-01T15:00:00.000Z",
            last_updated_timestamp: "2024-08-01T15:00:00.000Z",
            event_timestamp: "2024-08-01T14:59:59.000Z",
            name: "wuzah - 1822543000.50765432",
            description: "Suspicious PowerShell execution detected.",
            status: "open",
            raw_event:
              '{"alert_id":"1822543000.50765432","timestamp":"2024-08-01T14:59:59.000+0000","mitre":{"id":["T1059.001"],"tactic":["Execution"],"technique":["PowerShell"]},"alert_level":5,"rule_id":"70312","description":"Suspicious PowerShell execution detected.","agent_id":"001","agent":{"id":"001","name":"server01","ip":"10.0.10.20"},"tool":"wuzah","path":"","raw_event":{"powershell":{"command":"Get-Process | Out-File C:\\\\Temp\\\\processes.txt"}}}',
            alert_level: 5,
            rule_id: "70312",
            agent_id: "001",
            agent: "server01",
            tool: "wuzah",
            path: "",
            mitre:
              '{"id":["T1059.001"],"tactic":["Execution"],"technique":["PowerShell"]}',
            priority: "High",
            details: {
              id: 36151,
              source_ip: "10.0.10.20",
              destination_ip: "Unknown",
              activity: "PowerShell execution",
              protocol: "Unknown",
              port: 0,
              related_tickets: "[]",
              ticketId: 36151,
            },
            resolution: {
              id: 36151,
              resolved_by: "",
              resolution_timestamp: null,
              resolution_summary: "",
              root_cause: "",
              actions_taken: "[]",
              ticketId: 36151,
            },
            meta: {
              id: 36151,
              created_by: "system",
              created_timestamp: "2024-08-01T15:00:00.000Z",
              updated_by: "system",
              updated_timestamp: "2024-08-01T15:00:00.000Z",
              ticketId: 36151,
            },
            investigation: {
              id: 36151,
              assignee: "unassigned",
              started: null,
              ticketId: 36151,
            },
            comments: [],
          },
          {
            id: 36152,
            alert_id: "1923567891.40598745",
            source: "wuzah",
            created_timestamp: "2024-08-01T15:05:00.000Z",
            last_updated_timestamp: "2024-08-01T15:05:00.000Z",
            event_timestamp: "2024-08-01T15:04:59.000Z",
            name: "wuzah - 1923567891.40598745",
            description: "Multiple failed login attempts detected.",
            status: "open",
            raw_event:
              '{"alert_id":"1923567891.40598745","timestamp":"2024-08-01T15:04:59.000+0000","mitre":{"id":["T1110"],"tactic":["Credential Access"],"technique":["Brute Force"]},"alert_level":4,"rule_id":"80321","description":"Multiple failed login attempts detected.","agent_id":"002","agent":{"id":"002","name":"web-server","ip":"10.0.10.30"},"tool":"wuzah","path":"","raw_event":{"login":{"attempts":5,"source_ip":"192.168.1.100"}}}',
            alert_level: 4,
            rule_id: "80321",
            agent_id: "002",
            agent: "web-server",
            tool: "wuzah",
            path: "",
            mitre:
              '{"id":["T1110"],"tactic":["Credential Access"],"technique":["Brute Force"]}',
            priority: "Medium",
            details: {
              id: 36152,
              source_ip: "192.168.1.100",
              destination_ip: "10.0.10.30",
              activity: "Failed login attempts",
              protocol: "TCP",
              port: 22,
              related_tickets: "[]",
              ticketId: 36152,
            },
            resolution: {
              id: 36152,
              resolved_by: "",
              resolution_timestamp: null,
              resolution_summary: "",
              root_cause: "",
              actions_taken: "[]",
              ticketId: 36152,
            },
            meta: {
              id: 36152,
              created_by: "system",
              created_timestamp: "2024-08-01T15:05:00.000Z",
              updated_by: "system",
              updated_timestamp: "2024-08-01T15:05:00.000Z",
              ticketId: 36152,
            },
            investigation: {
              id: 36152,
              assignee: "unassigned",
              started: null,
              ticketId: 36152,
            },
            comments: [],
          },
          {
            id: 36153,
            alert_id: "2023589021.50456789",
            source: "wuzah",
            created_timestamp: "2024-08-01T15:10:00.000Z",
            last_updated_timestamp: "2024-08-01T15:10:00.000Z",
            event_timestamp: "2024-08-01T15:09:59.000Z",
            name: "wuzah - 2023589021.50456789",
            description: "Unusual network activity detected.",
            status: "open",
            raw_event:
              '{"alert_id":"2023589021.50456789","timestamp":"2024-08-01T15:09:59.000+0000","mitre":{"id":["T1040"],"tactic":["Credential Access"],"technique":["Network Sniffing"]},"alert_level":3,"rule_id":"90211","description":"Unusual network activity detected.","agent_id":"003","agent":{"id":"003","name":"laptop01","ip":"10.0.10.40"},"tool":"wuzah","path":"","raw_event":{"network":{"source_ip":"10.0.10.40","destination_ip":"10.0.10.255","protocol":"ICMP","activity":"Ping sweep"}}}',
            alert_level: 3,
            rule_id: "90211",
            agent_id: "003",
            agent: "laptop01",
            tool: "wuzah",
            path: "",
            mitre:
              '{"id":["T1040"],"tactic":["Credential Access"],"technique":["Network Sniffing"]}',
            priority: "Low",
            details: {
              id: 36153,
              source_ip: "10.0.10.40",
              destination_ip: "10.0.10.255",
              activity: "Ping sweep",
              protocol: "ICMP",
              port: 0,
              related_tickets: "[]",
              ticketId: 36153,
            },
            resolution: {
              id: 36153,
              resolved_by: "",
              resolution_timestamp: null,
              resolution_summary: "",
              root_cause: "",
              actions_taken: "[]",
              ticketId: 36153,
            },
            meta: {
              id: 36153,
              created_by: "system",
              created_timestamp: "2024-08-01T15:10:00.000Z",
              updated_by: "system",
              updated_timestamp: "2024-08-01T15:10:00.000Z",
              ticketId: 36153,
            },
            investigation: {
              id: 36153,
              assignee: "unassigned",
              started: null,
              ticketId: 36153,
            },
            comments: [],
          },
        ],
      };
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (refreshingTickets) {
      const interval = setInterval(() => {
        setRefreshingProgress((progress) => {
          if (progress >= 89) {
            fetchTickets();
            return 0;
          }
          return progress + 10;
        });
      }, refreshingInterval);

      return () => clearInterval(interval);
    }
  }, [refreshingTickets]);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const updatedComments: any = [
        ...comments,
        {
          author: "John S.", // Replace with the actual user
          timestamp: new Date().toISOString(),
          comment: newComment,
        },
      ];
      setComments(updatedComments);
      setNewComment("");
    }
  };

  async function assignToMe() {
    if (!selectedTicket) {
      return;
    }

    console.log("Assigning to me");
    setSelectedTicket((selectedTicket: any) => ({
      ...selectedTicket,
      investigation: {
        ...selectedTicket.investigation,
        assignee: "John S.",
      },
    }));
  }

  async function handleRainbowClick() {
    if (!selectedTicket || !selectedTicket.raw_event) {
      return;
    }

    const message = `Parse the following raw event and return it in a clean Markdown format. Return ONLY THE MARKDOWN:\n\n${JSON.stringify(
      selectedTicket.raw_event,
      null,
      2
    )}`;

    try {
      const aiURL = "http://10.0.10.112:11434/api/chat";
      const response = await fetch(aiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.1:latest", // replace with your model name
          messages: [{ role: "user", content: message }],
          stream: false,
        }),
      });

      const data = await response.json();
      const aiMessage =
        typeof data.message === "string"
          ? data.message
          : JSON.stringify(data.message);

      setMarkdownResponse(aiMessage);
    } catch (error) {
      console.error("Error sending message to AI:", error);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Security Tickets</h1>
          <p className="text-sm">You have {tickets.length} current tickets</p>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <span className="text-sm">John S.</span>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle Ticket Drawer</span>
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4">
          <Progress value={refreshingProgress} />
        </div>
        <div className="space-y-4">
          {tickets.map((ticket: any) => (
            <Card key={ticket.id} className="relative">
              <Sheet>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          ticket.priority === "High"
                            ? "destructive"
                            : ticket.priority === "Medium"
                            ? "warning"
                            : "default"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                      <span className="font-medium">
                        {ticket.source} - {ticket.id}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(ticket.event_timestamp).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base">{ticket.description}</p>
                </CardContent>
                <CardFooter>
                  <SheetTrigger onClick={() => setSelectedTicket(ticket)}>
                    Open
                  </SheetTrigger>
                  <SheetContent className="w-full">
                    {selectedTicket && (
                      <SheetHeader className="px-6 mb-2">
                        <SheetTitle>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h2 className="font-bold text-2xl">
                                {selectedTicket.name}
                              </h2>
                            </div>
                            <Badge
                              variant={
                                selectedTicket.priority === "High"
                                  ? "destructive"
                                  : selectedTicket.priority === "Medium"
                                  ? "warning"
                                  : "default"
                              }
                            >
                              {selectedTicket.priority}
                            </Badge>
                          </div>
                        </SheetTitle>
                        <SheetDescription>
                          <div className="flex flex-row justify-between">
                            <span className="font-medium">
                              {selectedTicket.agent}
                            </span>
                            <p>
                              <strong>Status:</strong> {selectedTicket.status}
                            </p>
                            <span className="text-sm text-muted-foreground">
                              {new Date(
                                selectedTicket.created_timestamp
                              ).toLocaleString()}
                            </span>
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    )}
                    <ScrollArea className="h-full">
                      {selectedTicket && (
                        <div className="space-y-4 p-4 mb-10">
                          <Card key={selectedTicket.id} className="relative">
                            <CardHeader className="grid grid-cols-5">
                              <h4 className="text-xl col-span-4">
                                {selectedTicket.description}
                              </h4>
                              <div className="col-span-1 flex flex-col items-end rounded-xl">
                                <div className="flex flex-col items-center">
                                  {selectedTicket.investigation?.assignee !=
                                  "unassigned" ? (
                                    <Avatar className="w-8 h-8 border">
                                      <AvatarImage src="/placeholder-user.jpg" />
                                      <AvatarFallback>
                                        {selectedTicket.investigation?.assignee.split(
                                          " "
                                        )[0][0] +
                                          "" +
                                          selectedTicket.investigation?.assignee.split(
                                            " "
                                          )[1][0]}
                                      </AvatarFallback>
                                    </Avatar>
                                  ) : (
                                    <Button onClick={assignToMe}>
                                      Assign to Me
                                    </Button>
                                  )}
                                  <p>
                                    {selectedTicket.investigation?.assignee !=
                                    "unassigned"
                                      ? selectedTicket.investigation?.assignee
                                      : null}
                                  </p>
                                </div>
                              </div>
                            </CardHeader>
                            <div className="border-b mx-6 mb-2 border-white" />
                            <div className="flex flex-row justify-between mx-6">
                              <Button>Blocked</Button>
                              <SheetClose asChild>
                                <Button>NSTR</Button>
                              </SheetClose>
                              <Button>Mitigated</Button>
                              <Button>False Positive</Button>
                              <Button>Open Case</Button>{" "}
                              <Button variant="link" className="text-blue-500">
                                View in SIEM
                              </Button>
                            </div>
                            <div className="border-b mx-6 my-2 border-white" />
                            <CardContent>
                              <div className="space-y-2">
                                <p>
                                  <strong>Last Updated:</strong>{" "}
                                  {new Date(
                                    selectedTicket.last_updated_timestamp
                                  ).toLocaleString()}
                                </p>
                                <p>
                                  <strong>Event:</strong>{" "}
                                  {new Date(
                                    selectedTicket.event_timestamp
                                  ).toLocaleString()}
                                </p>
                              </div>

                              <div className="mt-4 space-y-2">
                                {/* Resolution */}
                                {selectedTicket.resolution
                                  .resolution_timestamp != null && (
                                  <div>
                                    <p>
                                      <strong>Resolved By:</strong>{" "}
                                      {selectedTicket.resolution.resolved_by}
                                    </p>
                                    <p>
                                      <strong>Resolution Timestamp:</strong>{" "}
                                      {
                                        selectedTicket.resolution
                                          .resolution_timestamp
                                      }
                                    </p>
                                    <p>
                                      <strong>Resolution Summary:</strong>{" "}
                                      {
                                        selectedTicket.resolution
                                          .resolution_summary
                                      }
                                    </p>
                                    <p>
                                      <strong>Root Cause:</strong>{" "}
                                      {selectedTicket.resolution.root_cause}
                                    </p>
                                    <p>
                                      <strong>Actions Taken:</strong>
                                      <ul className="list-disc list-inside">
                                        {selectedTicket.resolution
                                          ?.actions_taken.length != 0 &&
                                          JSON.parse(
                                            selectedTicket.resolution
                                              .actions_taken
                                          ).map(
                                            (action: any, index: number) => (
                                              <li key={index}>{action}</li>
                                            )
                                          )}
                                      </ul>
                                    </p>
                                    {selectedTicket.resolution
                                      .follow_up_tasks && (
                                      <div>
                                        <strong>Follow-up Tasks:</strong>
                                        <ul className="list-disc list-inside">
                                          {selectedTicket.resolution.follow_up_tasks.map(
                                            (task: any, index: number) => (
                                              <li key={index}>
                                                {task.task} (Due:{" "}
                                                {new Date(
                                                  task.due_date
                                                ).toLocaleDateString()}
                                                )
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                )}

                                <div className="mt-4 space-y-2">
                                  <h3 className="font-semibold">Details</h3>
                                  <pre className="bg-muted p-4 rounded-md text-sm">
                                    {JSON.stringify(
                                      selectedTicket.details,
                                      null,
                                      2
                                    )}
                                  </pre>
                                </div>
                                <div className="mt-4 space-y-2">
                                  <div className="flex flex-row justify-between">
                                    <h3 className="font-semibold">Raw Event</h3>
                                    <button onClick={handleRainbowClick}>
                                      <Rainbow />
                                    </button>
                                  </div>
                                  <pre className="bg-muted p-4 rounded-md text-sm text-wrap">
                                    {JSON.stringify(
                                      typeof selectedTicket.raw_event ===
                                        "string"
                                        ? JSON.parse(selectedTicket.raw_event)
                                        : selectedTicket.raw_event,
                                      null,
                                      2
                                    )}
                                  </pre>
                                </div>
                                {markdownResponse && (
                                  <div className="mt-4 space-y-2">
                                    <h3 className="font-semibold">
                                      Parsed Markdown
                                    </h3>
                                    <div className="bg-muted p-4 rounded-md text-sm text-wrap">
                                      <ReactMarkdown>
                                        {JSON.parse(markdownResponse).content}
                                      </ReactMarkdown>
                                    </div>
                                  </div>
                                )}
                                <div className="mt-4 space-y-2">
                                  <h3 className="font-semibold">Raw Ticket</h3>
                                  <pre className="bg-muted p-4 rounded-md text-sm text-wrap">
                                    {JSON.stringify(selectedTicket, null, 2)}
                                  </pre>
                                </div>
                                <div>
                                  <strong>Comments</strong>
                                  <div className="list-disc list-inside space-y-2">
                                    {selectedTicket?.comments && (
                                      <div>
                                        <ul className="space-y-4">
                                          {selectedTicket.comments.map(
                                            (comment: any, index: number) => (
                                              <li
                                                className="border rounded-md p-4 shadow-sm"
                                                key={index}
                                              >
                                                <div className="flex items-start justify-between">
                                                  <div className="flex-1">
                                                    <p className="mb-2">
                                                      {comment.content}
                                                    </p>
                                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                      <span>
                                                        {new Date(
                                                          comment.timestamp
                                                        ).toLocaleString()}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-col items-center">
                                                    <Avatar className="w-8 h-8 border">
                                                      <AvatarImage src="/placeholder-user.jpg" />
                                                      <AvatarFallback>
                                                        {comment.author
                                                          .split(" ")
                                                          .map(
                                                            (name: string) =>
                                                              name[0]
                                                          )
                                                          .join("")}
                                                      </AvatarFallback>
                                                    </Avatar>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                      {comment.author ||
                                                        "Unassigned"}
                                                    </p>
                                                  </div>
                                                </div>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                  <div className="mt-4 flex flex-row">
                                    <Textarea
                                      value={newComment}
                                      onChange={(e) =>
                                        setNewComment(e.target.value)
                                      }
                                      className="border p-2 rounded-md w-full mr-2"
                                      placeholder="Add a comment"
                                    />
                                    <Button onClick={handleAddComment}>
                                      {">>"}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </ScrollArea>
                  </SheetContent>
                </CardFooter>
              </Sheet>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
