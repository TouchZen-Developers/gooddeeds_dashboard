"use client"

import React, { useEffect, useState, useMemo } from "react"
import { z } from "zod"
import { IconLoader } from "@tabler/icons-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { toast } from "sonner"

import { Switch } from '@/components/ui/switch';

import { useAllCoverageDurations } from '@/hooks/use-warranty-pricing'
import { WarrantyPricingItem } from "@/models/warrantyPricing"
// Base schema that can be extended
export const baseRecordSchema = z.object({
  id: z.number(),
  category_id: z.number(),
  retail_min: z.string(),
  retail_max: z.string(),
  coverage_duration: z.number(),
  yearly_standard: z.string(),
  yearly_premium: z.string(),
  monthly_standard: z.string(),
  monthly_premium: z.string(),
  service_fee: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    photo_url: z.string().nullable(),
  }),
})

export type BaseRecord = z.infer<typeof baseRecordSchema>

interface RecordModalProps {
  isOpen: boolean
  activeCategory: Record<string, number | string | undefined>
  onOpenChange: (open: boolean) => void
  editingRecord: BaseRecord | WarrantyPricingItem
  onSubmit: (data: WarrantyPriceFormData) => Promise<void>
  className?: string
}

type WarrantyPriceFormData = {
  "category_id": number | string,
  "retail_min": number | string,
  "retail_max": number | string,
  "coverage_duration": number | string,
  "yearly_standard": number | string,
  "yearly_premium": number | string,
  "monthly_standard": number | string,
  "monthly_premium": number | string,
  "service_fee": number | string,
  "is_active": boolean
}

export function PricingModal({
  isOpen,
  activeCategory,
  onOpenChange,
  editingRecord,
  onSubmit,
  className,
}: RecordModalProps) {
  const { data: coverageDurations } = useAllCoverageDurations();

  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const isEditing = !!editingRecord
  const initialValue = useMemo(() => ({
    category_id: '',
    retail_min: '',
    retail_max: '',
    coverage_duration: 12,
    yearly_standard: '',
    yearly_premium: '',
    monthly_standard: '',
    monthly_premium: '',
    service_fee: '',
    is_active: true,
  }), [])
  const [formData, setFormData] = useState<WarrantyPriceFormData>(initialValue);

  // Reset form when modal opens/closes or editing record changes
  useEffect(() => {
    if (isOpen) {
      if (editingRecord) {
        console.log('Editing record:', editingRecord);
        setFormData({
          category_id: editingRecord.category_id || '',
          retail_min: editingRecord.retail_min || '',
          retail_max: editingRecord.retail_max || '',
          coverage_duration: editingRecord.coverage_duration,
          yearly_standard: editingRecord.yearly_standard || '',
          yearly_premium: editingRecord.yearly_premium || '',
          monthly_standard: editingRecord.monthly_standard || '',
          monthly_premium: editingRecord.monthly_premium || '',
          service_fee: editingRecord.service_fee || '',
          is_active: editingRecord.is_active || false,
        })
      } else {
        setFormData(initialValue)
      }
    }
  }, [isOpen, editingRecord, initialValue])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData)
      toast.success(
        editingRecord ? 'Record updated successfully' : 'Record added successfully'
      );
      onOpenChange(false);
    } catch (error) {
      console.log('Form submission error:', error);
      if (typeof error === 'object' && error !== null) {
        const maybeAxios = error as { response?: { data?: { message?: string } } };
        const message = maybeAxios.response?.data?.message;
        toast.error(message || 'Submission failed');
      } else {
        toast.error('Submission failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof WarrantyPriceFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-2xl ${className || ''}`}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? `Edit ${activeCategory.name} pricing` : `Add ${activeCategory.name} pricing`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="">
            <div className="space-y-4">
              <h3 className="font-medium">Price Range</h3>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="retailMin">
                      Retail Min
                    </Label>
                    <Input
                      id="retailMin"
                      type="number"
                      value={formData.retail_min}
                      onChange={(e) => handleInputChange('retail_min', e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retailMax">
                      Retail Max
                    </Label>
                    <Input
                      id="retailMax"
                      type="number"
                      value={formData.retail_max}
                      onChange={(e) => handleInputChange('retail_max', e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-medium text-gray-900">Coverage Pricing</h3>

              <div className="flex flex-wrap gap-2">
                {coverageDurations?.data?.map((option: { value: number; label: string }) => (
                  <button
                    key={option.value}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setFormData(prev => ({
                        ...prev,
                        coverage_duration: option.value
                      }));
                      handleInputChange('coverage_duration', option.value);
                    }}
                    className={`px-3 py-1.5 text-xs rounded border transition-colors ${Number(formData.coverage_duration) === option.value
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearlyStandard">
                    Yearly Standard
                  </Label>
                  <Input
                    id="yearlyStandard"
                    type="number"
                    value={formData.yearly_standard}
                    onChange={(e) => handleInputChange('yearly_standard', e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearlyPremium">
                    Yearly Premium
                  </Label>
                  <Input
                    id="yearlyPremium"
                    type="number"
                    value={formData.yearly_premium}
                    onChange={(e) => handleInputChange('yearly_premium', e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              {/* Monthly Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyStandard">
                    Monthly Standard
                  </Label>
                  <Input
                    id="monthlyStandard"
                    type="number"
                    value={formData.monthly_standard}
                    onChange={(e) => handleInputChange('monthly_standard', e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyPremium">
                    Monthly Premium
                  </Label>
                  <Input
                    id="monthlyPremium"
                    type="number"
                    value={formData.monthly_premium}
                    onChange={(e) => handleInputChange('monthly_premium', e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              {/* Service Fee */}
              <div className="space-y-2">
                <Label htmlFor="serviceFee">
                  Service Fee
                </Label>
                <Input
                  id="serviceFee"
                  type="number"
                  value={formData.service_fee}
                  onChange={(e) => handleInputChange('service_fee', e.target.value)}
                  className="h-10 max-w-xs"
                />
              </div>
              {/* Active Toggle */}
              <div className="flex items-center gap-2">
                <Label htmlFor="active-toggle" className="text-sm text-gray-900">
                  Active
                </Label>
                <Switch
                  id="active-toggle"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <IconLoader className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Publishing..."}
                </>
              ) : (
                isEditing ? "Update" : "Publish"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PricingModal;
