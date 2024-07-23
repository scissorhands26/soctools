"use client";

import React, { useState } from "react";

export default function FileUpload() {
  const [fileInfo, setFileInfo] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    // Calculate hashes using Web Crypto API
    const md5Hash = await hashFile(arrayBuffer, "MD5");
    const sha1Hash = await hashFile(arrayBuffer, "SHA-1");
    const sha256Hash = await hashFile(arrayBuffer, "SHA-256");

    // Get file metadata
    const metadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate.toString(),
      md5Hash,
      sha1Hash,
      sha256Hash,
    };

    setFileInfo(metadata);
  };

  const hashFile = async (arrayBuffer, algorithm) => {
    const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {fileInfo && (
        <div>
          <h3>File Information:</h3>
          <p>
            <strong>Name:</strong> {fileInfo.name}
          </p>
          <p>
            <strong>Size:</strong> {fileInfo.size} bytes
          </p>
          <p>
            <strong>Type:</strong> {fileInfo.type}
          </p>
          <p>
            <strong>Last Modified:</strong> {fileInfo.lastModifiedDate}
          </p>
          <p>
            <strong>MD5 Hash:</strong> {fileInfo.md5Hash}
          </p>
          <p>
            <strong>SHA-1 Hash:</strong> {fileInfo.sha1Hash}
          </p>
          <p>
            <strong>SHA-256 Hash:</strong> {fileInfo.sha256Hash}
          </p>
        </div>
      )}
    </div>
  );
}
