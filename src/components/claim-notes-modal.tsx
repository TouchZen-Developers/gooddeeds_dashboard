"use client";
import React from 'react';
import { CloudUploadIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone";


interface ClaimNotesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  modalType: string;
  notes: string;
  onNotesChange: (notes: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  claimNumber?: string;
  policyNumber?: string;
}

export function ClaimNotesModal({
  isOpen,
  onOpenChange,
  modalType,
  notes,
  onNotesChange,
  onSubmit,
  onCancel,
  claimNumber = "GC201293",
  policyNumber = "GC203433"
}: ClaimNotesModalProps) {

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 10,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Claim Review Notes
          </DialogTitle>
          <div className="text-sm text-gray-600 mt-2">
            <p>Claim Number: {claimNumber}</p>
            <p>Policy Number: {policyNumber}</p>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text area
          </label>
          <Textarea
            placeholder={modalType === 'reject'
              ? "Explain why you are rejecting this claim or what additional information is needed..."
              : "Add any notes about approving this claim..."
            }
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        <div className="mt-4">
          <div className="not-prose flex flex-col gap-4">
            <Dropzone {...dropzone}>
              <div>
                <div className="flex justify-between">
                  <DropzoneDescription>
                    Please select up to 10 images
                  </DropzoneDescription>
                  <DropzoneMessage />
                </div>
                <DropZoneArea>
                  <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
                    <CloudUploadIcon className="size-8" />
                    <div>
                      <p className="font-semibold">Upload listing images</p>
                      <p className="text-sm text-muted-foreground">
                        Click here or drag and drop to upload
                      </p>
                    </div>
                  </DropzoneTrigger>
                </DropZoneArea>
              </div>

              <DropzoneFileList className="grid grid-cols-3 gap-3 p-0">
                {dropzone.fileStatuses.map((file) => (
                  <DropzoneFileListItem
                    className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
                    key={file.id}
                    file={file}
                  >
                    {file.status === "pending" && (
                      <div className="aspect-video animate-pulse bg-black/20" />
                    )}
                    {file.status === "success" && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={file.result}
                        alt={`uploaded-${file.fileName}`}
                        className="aspect-video object-cover"
                      />
                    )}
                    <div className="flex items-center justify-between p-2 pl-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm">{file.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <DropzoneRemoveFile
                        variant="ghost"
                        className="shrink-0 hover:outline"
                      >
                        <Trash2Icon className="size-4" />
                      </DropzoneRemoveFile>
                    </div>
                  </DropzoneFileListItem>
                ))}
              </DropzoneFileList>
            </Dropzone>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={onSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit Note
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}