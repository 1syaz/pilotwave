"use client";

import Image from "next/image";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  DragEvent,
} from "react";

interface FileUploadComponentProps {
  maxSizeMB?: number;
  onFileChange?: (file: File | null) => void;
  acceptedFileTypes?: string;
  existingFileUrl?: string;
  existingFileName?: string;
  existingFileType?: "image" | "video";
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  maxSizeMB = 10,
  onFileChange,
  acceptedFileTypes = "image/*,video/*",
  existingFileUrl = "",
  existingFileName = "",
  existingFileType = "image",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize with existing file if provided
  useEffect(() => {
    if (existingFileUrl) {
      setPreview(existingFileUrl);
    }
  }, [existingFileUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setFile(selectedFile);

    // Create preview URL
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreview(fileUrl);

    // Call the callback if provided
    if (onFileChange) {
      onFileChange(selectedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);

    if (onFileChange) {
      onFileChange(null);
    }

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderFilePreview = () => {
    if (!preview) return null;

    // Check if we have a new file or using the existing one
    const fileType = file ? file.type.split("/")[0] : existingFileType;

    if (fileType === "image") {
      return (
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="w-full h-full object-contain"
          />
        </div>
      );
    } else if (fileType === "video") {
      return (
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <video
            src={preview}
            controls
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    return (
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No preview available</p>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <h4 className="text-foreground/80 font-medium text-sm">Media</h4>
        <div className="relative w-full">
          {preview ? (
            <div className="mb-4">
              <div className="relative">
                {renderFilePreview()}

                {/* Cancel Icon */}
                <button
                  onClick={clearFile}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                  aria-label="Remove file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {file ? file.name : existingFileName || "Current file"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file
                        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                        : "Existing file"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
                ${
                  isDragging
                    ? "border-primary bg-background-secondary"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={acceptedFileTypes}
                className="hidden"
              />

              <div className="space-y-2">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-primary hover:underline">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </div>
                <p className="text-xs text-gray-500">
                  Images or videos up to {maxSizeMB}MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;
