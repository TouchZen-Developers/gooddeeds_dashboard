"use client"
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ShoppingBag, Utensils, GraduationCap, ChevronDown, Trash2Icon } from 'lucide-react';
import Button from '@/components/Button/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useParams } from 'next/navigation';
import { useBeneficiary } from '@/hooks/use-beneficiaries';
import { useAllAffectedEvents } from '@/hooks/use-affected-events';
import { Checkbox } from '@/components/ui/checkbox';
export default function FamilyProfile() {
  const params = useParams();
  const [affectedEvent, setAffectedEvent] = useState({});
  const { data: affectedEventsData, isLoading: isLoadingEvents } = useAllAffectedEvents();
  const id = params.id;
  const [beneficiary, setBeneficiary] = useState();
   useEffect(() => {
    if (affectedEventsData) {
      setBeneficiary(beneficiariesData.data.beneficiary);
    }
  }, [id, affectedEventsData]);
  useEffect(() => {
    if (beneficiariesData) {
      setBeneficiary(beneficiariesData.data.beneficiary);
    }
  }, [beneficiariesData]);
  const [expandedList, setExpandedList] = useState('food');
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const foodItems = [
    { name: '30-Day Emergency Food Supply', url: 'amazon.com/item1', quantity: 1, price: 120.00 },
    { name: '299-Piece First Aid Kit', url: 'amazon.com/item2', quantity: 2, price: 18.00 },
    { name: 'Emergency Weather Radio (Solar/Hand Crank)', url: 'amazon.com/item3', quantity: 1, price: 30.00 },
    { name: 'Solar Power Bank (20000mAh)', url: 'amazon.com/item4', quantity: 3, price: 25.00 },
    { name: 'Mylar Thermal Blankets (4-Pack)', url: 'amazon.com/item5', quantity: 1, price: 8.00 },
  ];


  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      // Simulate async upload delay; replace with real API call returning URL
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        status: "success",
        // Use an object URL for immediate preview; real impl should return server URL
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      // Category has a single photo_url so restrict to one image
      maxFiles: 1,
    },
  });

  // Only update formData.photo_url when a new file successfully uploads; do not clear existing value on removal unless it was a newly added file
  useEffect(() => {
    const successFile = dropzone.fileStatuses.find((f) => f.status === "success");
    if (successFile) {
      // We deliberately DO NOT store the blob: URL in formData; keep real URL only
      // So no handleFieldChange here – preview handled via dropzone result directly
    } else {
      // If there was an existing editingRecord photo_url we keep it; if we were creating new and removed the temp file we also keep empty
      // Nothing to do
    }
  }, [dropzone.fileStatuses]);

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_1171_10311)">
            <path d="M17.17 24C17.0384 24.0007 16.9079 23.9755 16.7861 23.9257C16.6642 23.876 16.5534 23.8027 16.46 23.71L8.28998 15.54C7.82435 15.0755 7.45492 14.5238 7.20286 13.9163C6.95079 13.3089 6.82104 12.6577 6.82104 12C6.82104 11.3423 6.95079 10.6911 7.20286 10.0837C7.45492 9.4762 7.82435 8.92445 8.28998 8.45999L16.46 0.290002C16.5532 0.196764 16.6639 0.122803 16.7857 0.0723425C16.9076 0.0218822 17.0381 -0.00408935 17.17 -0.00408936C17.3018 -0.00408936 17.4324 0.0218822 17.5542 0.0723425C17.6761 0.122803 17.7867 0.196764 17.88 0.290002C17.9732 0.38324 18.0472 0.49393 18.0976 0.615752C18.1481 0.737574 18.1741 0.868142 18.1741 1C18.1741 1.13186 18.1481 1.26243 18.0976 1.38425C18.0472 1.50607 17.9732 1.61676 17.88 1.71L9.70998 9.87999C9.14818 10.4425 8.83262 11.205 8.83262 12C8.83262 12.795 9.14818 13.5575 9.70998 14.12L17.88 22.29C17.9737 22.3829 18.0481 22.4935 18.0989 22.6154C18.1496 22.7373 18.1758 22.868 18.1758 23C18.1758 23.132 18.1496 23.2627 18.0989 23.3846C18.0481 23.5064 17.9737 23.617 17.88 23.71C17.7865 23.8027 17.6757 23.876 17.5539 23.9257C17.4321 23.9755 17.3016 24.0007 17.17 24Z" fill="#0E0A24" />
          </g>
          <defs>
            <clipPath id="clip0_1171_10311">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h1 className="text-3xl font-bold text-gray-100">Add New Event</h1>
      </div>

      {/* Family Profile Section */}
      <div className="mb-6 bg-white p-10 rounded-xl">

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="">
            <Dropzone {...dropzone}>
              <div>
                <div className="flex justify-between">
                  <DropzoneDescription>
                    Please select 1 image (PNG / JPG, max 10MB)
                  </DropzoneDescription>
                  <DropzoneMessage />
                </div>
                <DropZoneArea className="bg-buffer-50 border-2 border-dashed border-buffer-200 rounded-lg">
                  <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 w-full text-center text-sm ">
                    <div>
                      <span className="font-semibold bg-primary-buffer text-black rounded-full mb-3 py-3 px-5 inline-block">Choose files to Upload</span>
                      <p className="text-sm text-muted-foreground">
                        or drag and drop them here
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
                        className="shrink-0 hover:outline"
                        aria-label="Remove file"
                      >
                        <Trash2Icon className="size-4" />
                      </DropzoneRemoveFile>
                    </div>
                  </DropzoneFileListItem>
                ))}
              </DropzoneFileList>
            </Dropzone>
            <img
              src={beneficiary?.family_photo_url}
              alt="Family"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div>
            <div className="mb-4">
              <Label htmlFor="contactName" className="text-sm font-medium text-gray-700 mb-2 block">
                Event Name
              </Label>
              <Input id="contactName" defaultValue={beneficiary?.user?.first_name} className="bg-gray-10" />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Feature Event</Label>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outlined" className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => setShowRemoveDialog(true)}>
                Remove
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Update
              </Button>
            </div>
          </div>
        </div>


      </div>


      {/* Remove Confirmation Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center text-center py-6">
            <div className="mb-6">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=200&h=200&fit=crop"
                alt="Family"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <DialogTitle className="text-2xl font-semibold mb-2">
              Remove Family
            </DialogTitle>
            <DialogDescription className="text-gray-600 mb-6">
              Are you sure you want to remove this family?
            </DialogDescription>
            <div className="flex gap-4 w-full">
              <Button
                variant="outlined"
                className="flex-1 text-orange-500 border-orange-500 hover:bg-orange-50"
                onClick={() => setShowRemoveDialog(false)}
              >
                Remove
              </Button>
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setShowRemoveDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>



    </div>
  );
}