"use client";

import { useState, ChangeEvent } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.js";

interface PDFMetadata {
  PDFFormatVersion?: string;
  Language?: string;
  Author?: string;
  Creator?: string;
  CreationDate?: string;
  ModDate?: string;
  Producer?: string;
}

export default function PDFMetadataExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfMetadata, setPDFMetadata] = useState<PDFMetadata | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    if (selectedFile) {
      setFile(selectedFile);
      extractPDFMetadata(selectedFile);
    }
  };

  const extractPDFMetadata = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      try {
        const loadingTask = getDocument({ data: typedArray });
        const pdf = await loadingTask.promise;
        const { info } = await pdf.getMetadata();
        setPDFMetadata({
          PDFFormatVersion: info.PDFFormatVersion,
          Language: info.Language,
          Author: info.Author,
          Creator: info.Creator,
          CreationDate: info.CreationDate,
          ModDate: info.ModDate,
          Producer: info.Producer,
        });
      } catch (error) {
        console.error("Error extracting PDF metadata:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full bg-slate-950 rounded-lg p-4 shadow-md border border-slate-900 flex flex-col items-center justify-center">
        <input
          accept=".pdf"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
        >
          {file ? (
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4 text-white">
                PDF Metadata
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-300 font-medium">
                    PDF Format Version:
                  </p>
                  <p className="text-white">{pdfMetadata?.PDFFormatVersion}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Language:</p>
                  <p className="text-white">{pdfMetadata?.Language}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Author:</p>
                  <p className="text-white">{pdfMetadata?.Author}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Creator:</p>
                  <p className="text-white">{pdfMetadata?.Creator}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Creation Date:</p>
                  <p className="text-white">{pdfMetadata?.CreationDate}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">
                    Modification Date:
                  </p>
                  <p className="text-white">{pdfMetadata?.ModDate}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Producer:</p>
                  <p className="text-white">{pdfMetadata?.Producer}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-300 font-medium text-center">
                Click to select a PDF file
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
