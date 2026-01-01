"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CopyIcon,
  ExternalLinkIcon,
  AlertTriangleIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
  InfoIcon,
  Code2Icon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ParsedURL {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
}

interface EncoderParam {
  key: string;
  value: string;
}

interface URLAnalysis {
  isValidURL: boolean;
  hasHTTPS: boolean;
  containsSuspiciousPatterns: boolean;
  potentialSecurity: {
    openRedirects: boolean;
    sqlInjectionRisks: boolean;
    xssRisks: boolean;
  };
  recommendations: string[];
}

interface ParameterAnalysis {
  totalParams: number;
  sensitiveParams: string[];
  duplicateParams: string[];
  emptyParams: string[];
  encodingIssues: string[];
  parameterTypes: Record<string, string>;
  commonPatterns: string[];
  potentialDataTypes: Record<string, string[]>;
}

export function URLTool() {
  const [url, setUrl] = useState("");
  const [parsedURL, setParsedURL] = useState<ParsedURL | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Encoder states
  const [baseUrl, setBaseUrl] = useState("");
  const [params, setParams] = useState<EncoderParam[]>([
    { key: "", value: "" },
  ]);
  const [encodedUrl, setEncodedUrl] = useState("");

  const [urlAnalysis, setUrlAnalysis] = useState<URLAnalysis | null>(null);
  const [parameterAnalysis, setParameterAnalysis] =
    useState<ParameterAnalysis | null>(null);

  const parseURL = () => {
    try {
      setError(null);
      const decodedURL = decodeURIComponent(url);
      const urlObject = new URL(decodedURL);

      const params: Record<string, string> = {};
      urlObject.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      setParsedURL({
        protocol: urlObject.protocol,
        hostname: urlObject.hostname,
        port: urlObject.port,
        pathname: urlObject.pathname,
        search: urlObject.search,
        hash: urlObject.hash,
        params,
      });

      setUrlAnalysis(analyzeURL(decodedURL));
      setParameterAnalysis(analyzeParameters(decodedURL));
    } catch (err) {
      setError(
        "Invalid URL. Please enter a valid URL including the protocol (e.g., https://)"
      );
      setParsedURL(null);
      setUrlAnalysis(null);
      setParameterAnalysis(null);
    }
  };

  const addParam = () => {
    setParams([...params, { key: "", value: "" }]);
  };

  const removeParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const updateParam = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  const encodeURL = () => {
    try {
      const url = new URL(baseUrl);
      params.forEach((param) => {
        if (param.key && param.value) {
          url.searchParams.append(
            encodeURIComponent(param.key),
            encodeURIComponent(param.value)
          );
        }
      });
      setEncodedUrl(url.toString());
      setError(null);
    } catch (err) {
      setError(
        "Invalid base URL. Please include the protocol (e.g., https://)"
      );
      setEncodedUrl("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const analyzeURL = (url: string): URLAnalysis => {
    try {
      const urlObj = new URL(url);
      const analysis: URLAnalysis = {
        isValidURL: true,
        hasHTTPS: urlObj.protocol === "https:",
        containsSuspiciousPatterns: false,
        potentialSecurity: {
          openRedirects: false,
          sqlInjectionRisks: false,
          xssRisks: false,
        },
        recommendations: [],
      };

      // Check for open redirects
      const redirectParams = [
        "url",
        "redirect",
        "next",
        "return",
        "returnUrl",
        "returnTo",
        "goto",
        "link",
      ];
      analysis.potentialSecurity.openRedirects = redirectParams.some((param) =>
        urlObj.searchParams.has(param)
      );

      // Check for SQL injection risks
      const sqlPatterns = [
        "select",
        "union",
        "insert",
        "delete",
        "update",
        "drop",
        "--",
      ];
      analysis.potentialSecurity.sqlInjectionRisks = sqlPatterns.some(
        (pattern) => url.toLowerCase().includes(pattern)
      );

      // Check for XSS risks
      const xssPatterns = ["<script", "javascript:", "onerror=", "onload="];
      analysis.potentialSecurity.xssRisks = xssPatterns.some((pattern) =>
        url.toLowerCase().includes(pattern)
      );

      // Add recommendations
      if (!analysis.hasHTTPS) {
        analysis.recommendations.push(
          "Consider using HTTPS for secure communication"
        );
      }
      if (analysis.potentialSecurity.openRedirects) {
        analysis.recommendations.push(
          "URL contains potential open redirect parameters"
        );
      }
      if (analysis.potentialSecurity.sqlInjectionRisks) {
        analysis.recommendations.push(
          "URL contains patterns associated with SQL injection"
        );
      }
      if (analysis.potentialSecurity.xssRisks) {
        analysis.recommendations.push(
          "URL contains patterns associated with XSS attacks"
        );
      }

      return analysis;
    } catch (error) {
      return {
        isValidURL: false,
        hasHTTPS: false,
        containsSuspiciousPatterns: false,
        potentialSecurity: {
          openRedirects: false,
          sqlInjectionRisks: false,
          xssRisks: false,
        },
        recommendations: ["Invalid URL format"],
      };
    }
  };

  const analyzeParameters = (url: string): ParameterAnalysis => {
    try {
      const urlObj = new URL(url);
      const params = urlObj.searchParams;
      const analysis: ParameterAnalysis = {
        totalParams: 0,
        sensitiveParams: [],
        duplicateParams: [],
        emptyParams: [],
        encodingIssues: [],
        parameterTypes: {},
        commonPatterns: [],
        potentialDataTypes: {},
      };

      // Check for sensitive parameter names
      const sensitiveWords = [
        "token",
        "key",
        "auth",
        "password",
        "secret",
        "api",
      ];

      // Track parameter counts for duplicate detection
      const paramCounts = new Map<string, number>();

      params.forEach((value, key) => {
        analysis.totalParams++;

        // Check for sensitive parameters
        if (sensitiveWords.some((word) => key.toLowerCase().includes(word))) {
          analysis.sensitiveParams.push(key);
        }

        // Check for empty values
        if (!value) {
          analysis.emptyParams.push(key);
        }

        // Track duplicates
        const count = paramCounts.get(key) || 0;
        paramCounts.set(key, count + 1);

        // Check for encoding issues
        try {
          if (decodeURIComponent(value) !== value) {
            analysis.encodingIssues.push(key);
          }
        } catch {
          analysis.encodingIssues.push(key);
        }

        // Add parameter type detection
        analysis.parameterTypes[key] = detectParameterType(key, value);

        // Add data type detection
        analysis.potentialDataTypes[key] = detectDataType(value);

        // Check for common patterns
        const commonPatterns = [
          { pattern: /^utm_/, name: "Google UTM parameter" },
          { pattern: /^fb_/, name: "Facebook tracking parameter" },
          { pattern: /^gclid$/, name: "Google Click ID" },
          { pattern: /^msclkid$/, name: "Microsoft Click ID" },
          { pattern: /^ref$/, name: "Referrer parameter" },
        ];

        commonPatterns.forEach(({ pattern, name }) => {
          if (pattern.test(key) && !analysis.commonPatterns.includes(name)) {
            analysis.commonPatterns.push(name);
          }
        });
      });

      // Find duplicates
      paramCounts.forEach((count, key) => {
        if (count > 1) {
          analysis.duplicateParams.push(key);
        }
      });

      return analysis;
    } catch (error) {
      return {
        totalParams: 0,
        sensitiveParams: [],
        duplicateParams: [],
        emptyParams: [],
        encodingIssues: [],
        parameterTypes: {},
        commonPatterns: [],
        potentialDataTypes: {},
      };
    }
  };

  const beautifyURL = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const params = Array.from(urlObj.searchParams.entries())
        .map(([key, value]) => `${key}=${value}`)
        .join("\n  &");

      return `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname}${
        params ? "?\n  " + params : ""
      }${urlObj.hash}`;
    } catch (error) {
      return url;
    }
  };

  const detectParameterType = (key: string, value: string): string => {
    const patterns = {
      id: /^(id|uuid|guid)$/i,
      date: /^(date|time|timestamp)/i,
      auth: /^(token|auth|api[_-]?key)/i,
      search: /^(q|query|search|keyword)/i,
      page: /^(page|limit|offset|size)/i,
      sort: /^(sort|order|direction)/i,
      filter: /^(filter|category|type|status)/i,
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(key)) return type;
    }

    // Try to detect by value
    if (/^\d+$/.test(value)) return "number";
    if (/^true|false$/i.test(value)) return "boolean";
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) return "date";
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        value
      )
    )
      return "uuid";

    return "string";
  };

  const detectDataType = (value: string): string[] => {
    const types = [];

    // Check for common data patterns
    if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value))
      types.push("email");
    if (/^[0-9a-f]{40}$/i.test(value)) types.push("sha1");
    if (/^[0-9a-f]{64}$/i.test(value)) types.push("sha256");
    if (/^[0-9a-f]{32}$/i.test(value)) types.push("md5");
    if (/^[1-9][0-9]{3,}$/.test(value)) types.push("unix timestamp");
    if (/^(bearer|basic)\s+/i.test(value)) types.push("auth token");
    if (/^[\w-]+\.[\w-]+\.[\w-]+$/.test(value)) types.push("JWT");

    return types.length ? types : ["string"];
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="decoder" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="decoder">URL Decoder</TabsTrigger>
          <TabsTrigger value="encoder">URL Encoder</TabsTrigger>
          <TabsTrigger value="security">Security Analysis</TabsTrigger>
          <TabsTrigger value="beautifier">URL Beautifier</TabsTrigger>
        </TabsList>

        <TabsContent value="decoder">
          <Card>
            <CardHeader>
              <CardTitle>Enter URL</CardTitle>
              <CardDescription>
                Enter a URL to decode and analyze its components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter URL (e.g., https://example.com?param=value)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={parseURL}>Decode</Button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
          </Card>

          {parsedURL && (
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>URL Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Protocol</span>
                      <Badge variant="outline" className="font-mono">
                        {parsedURL.protocol}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Hostname</span>
                      <Badge variant="outline" className="font-mono">
                        {parsedURL.hostname}
                      </Badge>
                    </div>
                    {parsedURL.port && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Port</span>
                        <Badge variant="outline" className="font-mono">
                          {parsedURL.port}
                        </Badge>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Path</span>
                      <Badge variant="outline" className="font-mono">
                        {parsedURL.pathname}
                      </Badge>
                    </div>
                    {parsedURL.hash && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Hash</span>
                        <Badge variant="outline" className="font-mono">
                          {parsedURL.hash}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Query Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.keys(parsedURL.params).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(parsedURL.params).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary">{key}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(value)}
                            >
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <Textarea
                            readOnly
                            value={decodeURIComponent(value)}
                            className="font-mono text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No query parameters found
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Decoded URL</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Textarea
                      readOnly
                      value={decodeURIComponent(url)}
                      className="font-mono text-sm"
                    />
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(decodeURIComponent(url))}
                      >
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(url, "_blank")}
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="encoder">
          <Card>
            <CardHeader>
              <CardTitle>URL Encoder</CardTitle>
              <CardDescription>
                Build and encode a URL with parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Base URL</label>
                  <Input
                    placeholder="https://example.com"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Parameters</label>
                  {params.map((param, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Key"
                        value={param.key}
                        onChange={(e) =>
                          updateParam(index, "key", e.target.value)
                        }
                        className="flex-1"
                      />
                      <Input
                        placeholder="Value"
                        value={param.value}
                        onChange={(e) =>
                          updateParam(index, "value", e.target.value)
                        }
                        className="flex-1"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeParam(index)}
                        disabled={params.length === 1}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addParam}>
                    Add Parameter
                  </Button>
                </div>

                <Button onClick={encodeURL} className="w-full">
                  Encode URL
                </Button>

                {error && <p className="text-sm text-red-500">{error}</p>}

                {encodedUrl && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Encoded URL</label>
                    <div className="flex gap-2">
                      <Textarea
                        readOnly
                        value={encodedUrl}
                        className="font-mono text-sm"
                      />
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(encodedUrl)}
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(encodedUrl, "_blank")}
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          {urlAnalysis && parameterAnalysis ? (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-primary" />
                    <CardTitle>Security Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">HTTPS</span>
                      {urlAnalysis.hasHTTPS ? (
                        <Badge className="bg-green-500">Secure</Badge>
                      ) : (
                        <Badge variant="destructive">Not Secure</Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Open Redirects
                      </span>
                      {urlAnalysis.potentialSecurity.openRedirects ? (
                        <Badge variant="destructive">Risk Detected</Badge>
                      ) : (
                        <Badge className="bg-green-500">No Risk</Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">SQL Injection</span>
                      {urlAnalysis.potentialSecurity.sqlInjectionRisks ? (
                        <Badge variant="destructive">Risk Detected</Badge>
                      ) : (
                        <Badge className="bg-green-500">No Risk</Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">XSS</span>
                      {urlAnalysis.potentialSecurity.xssRisks ? (
                        <Badge variant="destructive">Risk Detected</Badge>
                      ) : (
                        <Badge className="bg-green-500">No Risk</Badge>
                      )}
                    </div>
                  </div>

                  {urlAnalysis.recommendations.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {urlAnalysis.recommendations.map((rec, index) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <AlertTriangleIcon className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircleIcon className="w-5 h-5 text-primary" />
                    <CardTitle>Parameter Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Total Parameters
                      </span>
                      <Badge variant="outline">
                        {parameterAnalysis.totalParams}
                      </Badge>
                    </div>

                    {parameterAnalysis.sensitiveParams.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">
                          Sensitive Parameters
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {parameterAnalysis.sensitiveParams.map((param) => (
                            <Badge key={param} variant="destructive">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {parameterAnalysis.duplicateParams.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">
                          Duplicate Parameters
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {parameterAnalysis.duplicateParams.map((param) => (
                            <Badge
                              key={param}
                              variant="warning"
                              className="bg-yellow-500"
                            >
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {parameterAnalysis.emptyParams.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">
                          Empty Parameters
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {parameterAnalysis.emptyParams.map((param) => (
                            <Badge key={param} variant="secondary">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {parameterAnalysis.encodingIssues.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">
                          Encoding Issues
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {parameterAnalysis.encodingIssues.map((param) => (
                            <Badge
                              key={param}
                              variant="warning"
                              className="bg-orange-500"
                            >
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  Enter a URL in the decoder tab to see security analysis
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="beautifier">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code2Icon className="w-5 h-5 text-primary" />
                <CardTitle>URL Beautifier</CardTitle>
              </div>
              <CardDescription>
                Format and beautify URLs for better readability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter URL to beautify"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="font-mono"
                />
                <Button
                  onClick={() => setUrl(beautifyURL(url))}
                  className="w-full"
                >
                  Beautify URL
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
