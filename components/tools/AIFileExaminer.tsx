"use client";

import { useState } from "react";

interface FileAnalysisResult {
  analysis: string;
}

export default function FileSecurityAnalyzer() {
  const [apiKey, setApiKey] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] =
    useState<FileAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handleAnalyze = async () => {
    if (!file || !apiKey) {
      alert("Please provide both the OpenAI API key and a file.");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const fileContent = reader.result;
      const response = await analyzeFileWithGPT4(
        apiKey,
        file.name,
        fileContent as string
      );
      setAnalysisResult({ analysis: response });
      setLoading(false);
    };
    reader.readAsText(file);
  };

  const analyzeFileWithGPT4 = async (
    apiKey: string,
    fileName: string,
    fileContent: string
  ): Promise<string> => {
    const prompt = `You are a security expert. Analyze the following file for any security vulnerabilities or malicious content. Provide a detailed analysis and recommendations. \n\nFile Name: ${fileName}\n\nFile Content:\n${fileContent}`;
    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/gpt-4/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
            max_tokens: 1024,
          }),
        }
      );
      const data = await response.json();
      return data.choices[0].text;
    } catch (error) {
      console.error("Error querying OpenAI API:", error);
      return "Error querying OpenAI API. Please check your API key and try again.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">File Security Analyzer</h2>
        <div className="mb-4">
          <label
            htmlFor="apiKey"
            className="block text-gray-700 font-medium mb-2"
          >
            OpenAI API Key:
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={handleApiKeyChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fileInput"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload File:
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={handleAnalyze}
            className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
        {analysisResult && (
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-bold mb-2">Analysis Result</h3>
            <pre className="whitespace-pre-wrap">{analysisResult.analysis}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
