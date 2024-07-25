"use client";

import { useState, useReducer, useEffect } from "react";
import OpenAI from "openai";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import ReactMarkdown from "react-markdown";

// Define types for different output components
interface MarkdownOutputProps {
  content: string;
}

// MarkdownOutput component
const MarkdownOutput: React.FC<MarkdownOutputProps> = ({ content }) => {
  return <ReactMarkdown className="markdown-body">{content}</ReactMarkdown>;
};

// Define the output type
type OutputType = { type: "markdown"; content: string };

async function analyzeFileWithPython(
  file: File,
  apiKey: string,
  dispatch: React.Dispatch<{ type: string; payload: OutputType }>
): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("purpose", "assistants");

  try {
    // Upload the file to OpenAI
    const fileResponse = await fetch("https://api.openai.com/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!fileResponse.ok) {
      const errorText = await fileResponse.text();
      throw new Error(
        `File upload failed: ${fileResponse.status} - ${errorText}`
      );
    }

    const fileData = await fileResponse.json();
    console.log("File uploaded successfully:", fileData);

    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    // Create an assistant
    const assistant = await openai.beta.assistants.create({
      name: "Security Analyzer",
      instructions: `Analyze this file for security issues. Please follow these steps:
          1. Calculate and display the following hashes for the file: MD5, SHA-1, and SHA-256.
          2. Extract and display the file metadata, including file size, type, and extension.
          3. If the file is a document or archive, list its contents.
          4. Perform a thorough analysis using Python to check for any security vulnerabilities or malicious content.
          5. Summarize your findings, including any detected vulnerabilities or malicious content. Do not repeat any step unless necessary.
          6. Provide suggested next steps for the analyst to perform manually.
          Note: Provide only your findings and results, not your thought process or the steps you took.`,
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4o-mini",
    });

    console.log("Assistant created:", assistant);

    // Create a thread
    const thread = await openai.beta.threads.create();
    console.log("Thread created:", thread);

    // Add a message to the thread with the file
    const message = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "Analyze this file.",
      attachments: [
        {
          file_id: fileData.id,
          tools: [{ type: "code_interpreter" }],
        },
      ],
    });
    console.log("Message added to thread:", message);

    let currentMarkdown = "";
    let buffer = "";
    let bufferTimeout: NodeJS.Timeout | null = null;

    const flushBuffer = () => {
      if (buffer) {
        currentMarkdown += buffer;
        dispatch({
          type: "ADD_OUTPUT",
          payload: { type: "markdown", content: currentMarkdown },
        });
        buffer = "";
      }
    };

    const run = openai.beta.threads.runs
      .stream(thread.id, {
        assistant_id: assistant.id,
      })
      .on("textCreated", (text) => {
        console.log(text);
        // Don't add "code_interpreter" to the buffer
      })
      .on("textDelta", (textDelta, snapshot) => {
        console.log(textDelta.value);
        buffer += textDelta.value;
        if (bufferTimeout) clearTimeout(bufferTimeout);
        bufferTimeout = setTimeout(flushBuffer, 500);
      })
      .on("toolCallCreated", (toolCall) => {
        console.log(toolCall.type);
        // Don't add "code_interpreter" to the buffer
      })
      .on("toolCallDelta", (toolCallDelta, snapshot) => {
        if (toolCallDelta.type === "code_interpreter") {
          // @ts-ignore
          if (toolCallDelta.code_interpreter.input) {
            // @ts-ignore
            console.log(toolCallDelta.code_interpreter.input);
            // Do not add code interpreter input to buffer
          }
          // @ts-ignore
          if (toolCallDelta.code_interpreter.outputs) {
            console.log("\noutput >\n");
            // Do not add code interpreter outputs to buffer
          }
          if (bufferTimeout) clearTimeout(bufferTimeout);
          bufferTimeout = setTimeout(flushBuffer, 500);
        }
      });

    // Listen for completion
    run.on("end", async () => {
      flushBuffer();
      dispatch({
        type: "ADD_OUTPUT",
        payload: { type: "markdown", content: currentMarkdown.trim() },
      });
    });
  } catch (error) {
    console.error("Error during file analysis:", error);
    throw error;
  }
}

function analysisReducer(
  state: OutputType[],
  action: { type: string; payload: OutputType }
) {
  switch (action.type) {
    case "ADD_OUTPUT":
      return [...state, action.payload];
    default:
      return state;
  }
}

export default function FileSecurityAnalyzer() {
  const [apiKey, setApiKey] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, dispatch] = useReducer(analysisReducer, []);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveApiKey, setSaveApiKey] = useState<boolean>(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setSaveApiKey(true);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleAnalyze = async () => {
    if (!file || !apiKey) {
      alert("Please provide both the API key and a file to analyze.");
      return;
    }

    if (saveApiKey) {
      localStorage.setItem("apiKey", apiKey);
    } else {
      localStorage.removeItem("apiKey");
    }

    setLoading(true);

    try {
      await analyzeFileWithPython(file, apiKey, dispatch);
    } catch (error) {
      console.error("An error occurred while analyzing the file:", error);
      // @ts-ignore
      alert(`An error occurred while analyzing the file: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-4 bg-black text-gray-200">
      <div className="w-full max-w-3xl rounded-lg p-4 shadow-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">File Security Analyzer</h2>
        <div className="mb-4">
          <Label
            htmlFor="apiKey"
            className="block text-gray-400 font-medium mb-2"
          >
            OpenAI API Key:
          </Label>
          <div className="flex items-center">
            <Input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border rounded text-gray-200 border-gray-600 mr-2"
            />
            <input
              type="checkbox"
              id="saveApiKey"
              checked={saveApiKey}
              onChange={(e) => setSaveApiKey(e.target.checked)}
              className="mr-2"
            />
            <Label htmlFor="saveApiKey" className="text-gray-400">
              Save API Key
            </Label>
          </div>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="fileInput"
            className="block text-gray-400 font-medium mb-2"
          >
            Upload File:
          </Label>
          <Input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded text-gray-200 border-gray-600"
          />
        </div>
        <div className="mb-4">
          <Button
            onClick={handleAnalyze}
            className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
        {analysisResult.length > 0 && (
          <div
            className="p-4 rounded-lg mt-4 border border-gray-700 overflow-y-auto"
            style={{ height: "75vh" }}
          >
            <h3 className="text-xl font-bold mb-2">Analysis Result</h3>
            {analysisResult.map((result, index) => (
              <MarkdownOutput key={index} content={result.content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
