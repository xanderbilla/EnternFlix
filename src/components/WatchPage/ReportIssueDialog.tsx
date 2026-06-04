"use client";

import { useState } from "react";
import BaseDialog from "@/components/UI/BaseDialog";
import ActionButton from "@/components/Button/ActionButton";

interface ReportIssueDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issueType: string) => void;
}

const ISSUE_OPTIONS = [
  {
    value: "Video Error",
    description: "The stream is broken, buffering, or not playing correctly.",
  },
  {
    value: "Video Not Found",
    description: "The selected title could not be loaded.",
  },
  {
    value: "UX issue",
    description: "Something in the player experience feels confusing or wrong.",
  },
  {
    value: "Any other",
    description: "Any other playback-related issue.",
  },
] as const;

export default function ReportIssueDialog({
  isOpen,
  onClose,
  onSubmit,
}: ReportIssueDialogProps) {
  const [selectedIssue, setSelectedIssue] = useState<string>("");

  const handleSubmit = () => {
    if (!selectedIssue) return;
    onSubmit(selectedIssue);
    setSelectedIssue("");
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={() => {
        setSelectedIssue("");
        onClose();
      }}
      zIndex={11000}
      ariaLabel="Report playback issue"
      className="w-[92vw] sm:w-[86vw] md:w-[70vw] lg:w-[520px] max-w-[520px]"
      contentAlignment="center"
    >
      {({ handleClose }) => (
        <div className="bg-zinc-800/95 text-white px-6 sm:px-8 py-6 sm:py-7">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              What&apos;s the issue?
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="text-zinc-400 hover:text-zinc-200"
              aria-label="Close report dialog"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            {ISSUE_OPTIONS.map((option) => {
              const isSelected = selectedIssue === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedIssue(option.value)}
                  className={`w-full text-left rounded-md px-3 py-3 transition-colors ${
                    isSelected
                      ? "bg-zinc-700 ring-1 ring-zinc-500"
                      : "bg-transparent hover:bg-zinc-700/40"
                  }`}
                >
                  <p className="text-lg sm:text-xl font-semibold">
                    {option.value}
                  </p>
                  <p className="text-zinc-300 text-sm sm:text-base mt-1">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          {selectedIssue && (
            <div className="mt-6 flex justify-end">
              <ActionButton
                variant="primary"
                label="Submit"
                ariaLabel="Submit selected issue"
                onClick={handleSubmit}
                className="!text-sm sm:!text-base"
              />
            </div>
          )}
        </div>
      )}
    </BaseDialog>
  );
}
