"use client";

import { UploadIcon } from "lucide-react";
import { useState, ChangeEvent, DragEvent } from "react";

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

export default function FileExaminer() {
  const [file, setFile] = useState<File | null>(null);
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    calculateFileMetadata(droppedFile);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      calculateFileMetadata(selectedFile);
    }
  };

  const calculateFileMetadata = async (file: File) => {
    const metadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleString(),
      sha1: await calculateHash(file, "SHA-1"),
      sha256: await calculateHash(file, "SHA-256"),
      sha512: await calculateHash(file, "SHA-512"),
    };
    setFileMetadata(metadata);
  };

  const calculateHash = async (
    file: File,
    algorithm: string
  ): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hash = await crypto.subtle.digest(algorithm, buffer);
    return toHexString(hash);
  };

  const toHexString = (buffer: ArrayBuffer): string => {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className="w-full max-w-md p-8 bg-slate-950 rounded-lg shadow-md border border-slate-900 flex flex-col items-center justify-center"
      >
        <input
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
              <h2 className="text-2xl font-bold mb-4">File Metadata</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-300 font-medium">Name:</p>
                  <p className="text-white">{fileMetadata?.name}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Size:</p>
                  <p className="text-white">
                    {/* @ts-ignore */}
                    {(fileMetadata?.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Type:</p>
                  <p className="text-white">
                    {fileMetadata?.type ? fileMetadata?.type : "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">Last Modified:</p>
                  <p className="text-white">{fileMetadata?.lastModified}</p>
                </div>
              </div>
              <div>
                <div>
                  <p className="text-gray-300 font-medium">SHA1:</p>
                  <p className="text-white break-all">{fileMetadata?.sha1}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">SHA256:</p>
                  <p className="text-white break-all">{fileMetadata?.sha256}</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">SHA512:</p>
                  <p className="text-white break-all">{fileMetadata?.sha512}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <UploadIcon className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-300 font-medium">
                Drag and drop a file here or click to browse
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
