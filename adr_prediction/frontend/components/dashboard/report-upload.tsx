"use client";

import { useRef, useState } from "react";
import { analyzePrescription, ApiError, type AnalyzePrescriptionResponse } from "@/lib/api";

interface Props {
  onResult: (result: AnalyzePrescriptionResponse) => void;
  onError: (message: string) => void;
  onStart: () => void;
}

export default function ReportUpload({ onResult, onError, onStart }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      onError("Please upload a PDF file.");
      return;
    }
    setFileName(file.name);
    setLoading(true);
    onStart();
    try {
      const result = await analyzePrescription(file);
      onResult(result);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Unexpected error analyzing the PDF.";
      onError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="upload"
      className={`rounded-card-lg border p-16 text-center transition-colors ${
        dragOver ? "border-bioluminescent-lime bg-bioluminescent-lime/5" : "border-graphite bg-abyssal-ink"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) void handleFile(file);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      <p className="font-mono text-caption uppercase tracking-[-0.02em] text-lichen">Prescription intake</p>

      <p className="mt-4 text-heading-sm text-bone-white">
        Drop a prescription PDF, or
        <button
          type="button"
          className="ml-2 rounded-btn bg-bioluminescent-lime px-4 py-1.5 align-middle font-mono text-caption uppercase text-abyssal-ink disabled:opacity-50"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          browse files
        </button>
      </p>

      <p className="mt-4 text-caption text-lichen/60">
        PDF only, up to 15MB. Embedded text or scanned (OCR) documents supported.
      </p>

      {fileName && (
        <p className="mt-6 font-mono text-caption text-lichen">
          {loading ? "ANALYZING" : "LAST FILE"} — <span className="text-bone-white">{fileName}</span>
          {loading && <span className="ml-2 animate-pulse text-bioluminescent-lime">●</span>}
        </p>
      )}
    </div>
  );
}
