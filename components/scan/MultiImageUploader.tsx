"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/Button";

export function MultiImageUploader({
  onSubmit,
  loading = false,
}: {
  onSubmit: (files: File[]) => Promise<void> | void;
  loading?: boolean;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf,application/pdf"
        multiple
        className="hidden"
        onChange={(e) => {
          const next = Array.from(e.target.files || []);
          setFiles((p) => [...p, ...next]);
          e.target.value = "";
        }}
      />
      <Button variant="outline" onClick={() => inputRef.current?.click()}>
        Add OMR files
      </Button>
      <ul className="text-sm text-slate-600 list-disc pl-5">
        {files.map((f, idx) => (
          <li key={`${f.name}-${idx}`}>{f.name}</li>
        ))}
      </ul>
      <Button onClick={() => onSubmit(files)} isLoading={loading} disabled={files.length === 0}>
        Upload and Create Jobs
      </Button>
    </div>
  );
}
