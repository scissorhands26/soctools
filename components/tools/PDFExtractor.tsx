"use client";

import { UploadIcon } from "lucide-react";
import { useState, ChangeEvent, DragEvent } from "react";
// @ts-ignore
import * as pdfjsLib from "pdfjs-dist/webpack";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.js";

interface PDFMetadata {
  PDFFormatVersion?: string;
  Language?: string;
  EncryptFilterName?: string;
  IsLinearized?: string;
  IsAcroFormPresent?: string;
  IsXFAPresent?: string;
  IsCollectionPresent?: string;
  IsSignaturesPresent?: string;
  Author?: string;
  Creator?: string;
  CreationDate?: string;
  ModDate?: string;
  Producer?: string;
}

export default function PDFMetadataExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfMetadata, setPDFMetadata] = useState<PDFMetadata | null>(null);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      extractPDFMetadata(droppedFile);
    }
  };

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

  const convertTimestamp = (timestamp: string | undefined): string => {
    if (!timestamp) {
      return "";
    }
    const year = timestamp.substring(2, 6);
    const month = timestamp.substring(6, 8);
    const day = timestamp.substring(8, 10);
    const hours = timestamp.substring(10, 12);
    const minutes = timestamp.substring(12, 14);
    const seconds = timestamp.substring(14, 16);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const extractPDFMetadata = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      try {
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        const { info } = await pdf.getMetadata();
        setPDFMetadata({
          PDFFormatVersion: info.PDFFormatVersion,
          Language: info.Language,
          EncryptFilterName: info.EncryptFilterName,
          IsLinearized: info.IsLinearized,
          IsAcroFormPresent: info.IsAcroFormPresent,
          IsXFAPresent: info.IsXFAPresent,
          IsCollectionPresent: info.IsCollectionPresent,
          IsSignaturesPresent: info.IsSignaturesPresent,
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
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className="w-full bg-slate-950 rounded-lg p-4 shadow-md border border-slate-900 flex flex-col items-center justify-center"
      >
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
                  <p className="text-gray-300 font-medium">
                    Encrypt Filter Name:
                  </p>
                  <p className="text-white">{pdfMetadata?.EncryptFilterName}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Is Linearized:</p>
                  <p className="text-white">{pdfMetadata?.IsLinearized}</p>
                </div>

                <div>
                  <p className="text-gray-300 font-medium">
                    Is AcroForm Present:
                  </p>
                  <p className="text-white">{pdfMetadata?.IsAcroFormPresent}</p>
                </div>

                <div>
                  <p className="text-gray-300 font-medium">Is XFA Present:</p>
                  <p className="text-white">{pdfMetadata?.IsXFAPresent}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">
                    Is Collection Present:
                  </p>
                  <p className="text-white">
                    {pdfMetadata?.IsCollectionPresent}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">
                    Is Signatures Present:
                  </p>
                  <p className="text-white">
                    {pdfMetadata?.IsSignaturesPresent}
                  </p>
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
                  <p className="text-white">
                    {convertTimestamp(pdfMetadata?.CreationDate)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">
                    Modification Date:
                  </p>
                  <p className="text-white">
                    {convertTimestamp(pdfMetadata?.ModDate)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Producer:</p>
                  <p className="text-white">{pdfMetadata?.Producer}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <UploadIcon className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-300 font-medium text-center">
                Drag and drop a file here or click to browse
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
