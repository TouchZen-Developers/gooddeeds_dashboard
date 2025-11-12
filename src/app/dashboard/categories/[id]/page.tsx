"use client"
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog, DialogContent, DialogDescription, DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from "sonner";
import { useParams } from 'next/navigation';
import { useAllCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/hooks/use-categories';
import { useRouter } from 'next/navigation'
export default function FamilyProfile() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const icons = [
    { icon: '/open-book 2.png', id: 'heart' },
    { icon: '/bowl-food-solid-full 1.png', id: 'sandwich' },
    { icon: '/Group.png', id: 'book' },
    { icon: '/map-solid-full 1.png', id: 'map' },
    { icon: '/carrot-solid-full 1.png', id: 'rocket' },
    { icon: '/toolbox-solid-full 1.png', id: 'car' },
    { icon: '/hand-solid-full 1.png', id: 'smile' },
    { icon: '/face-laugh-solid-full 1.png', id: 'plane' },
    { icon: '/helicopter-solid-full 1.png', id: 'hand' },
    { icon: '/bandage-solid-full 1.png', id: 'wallet' },
    { icon: '/computer-solid-full 1.png', id: 'briefcase' },
    { icon: '/apple-whole-solid-full 1.png', id: 'apple' }
  ];
  const { data: categoriesData, isLoading: isLoadingEvents } = useAllCategories();
  const deleteCategory = useDeleteCategory();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const [category, setCategory] = useState({ name: '', id: 0, icon: '' });
  useEffect(() => {
    if (categoriesData) {
      const categoryData = categoriesData?.data?.categories?.find((cat) => cat.id === id);
      console.log('categoryData', categoryData);
      setCategory({ name: categoryData?.name || '', id: categoryData?.id || 0, icon: categoryData?.icon_url || '' });
    }
  }, [id, categoriesData]);

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<{ icon: string; id: string } | null>(null);
  const [open, setOpen] = useState(false);

  const handleIconSelect = (icon: { icon: string; id: string }) => {
    setSelectedIcon(icon);
    setOpen(false);
  };

  const handleSave = async () => {
    const categoryData = new FormData();
    categoryData.append('name', category?.name);

    if (selectedIcon?.icon) {
      const response = await fetch(selectedIcon.icon);
      const blob = await response.blob();
      const file = new File([blob], `icon-${selectedIcon.id}.png`, { type: 'image/png' });
      categoryData.append('icon', file);
    }

    try {
      if (!isNaN(id) && typeof id === 'number') {
        categoryData.append('_method', 'PUT');
        await updateCategory.mutateAsync({ id: id, category: categoryData });
        toast.success('Product updated');
      } else {
        await createCategory.mutateAsync(categoryData)
        toast.success('Product added')
      }
      router.push('/dashboard/categories');
    } catch (error) {
      throw error
    }
  };

  const handleRemove = async () => {
    try {
      await deleteCategory.mutateAsync(id);
      setShowRemoveDialog(false);
      toast.success('Product removed');
      // navigate back to categories list or another appropriate page
      router.push('/dashboard/categories');
    } catch (error) {
      throw error;
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-100">
          {id ? "Edit category" : "Add category"}
        </h1>
      </div>

      <div className="mb-6 bg-white p-10 rounded-xl">

        <div className="flex items-start gap-8 mb-8">
          <div className="flex flex-col items-center gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  className="w-28 h-28 rounded-full border-2 border-dashed border-orange-300 flex items-center justify-center bg-white hover:bg-gray-10 transition-colors"
                >
                  {(selectedIcon?.icon || category?.icon) ? (
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center`}>
                      <img src={selectedIcon?.icon || category?.icon} className="w-20 h-20" />
                    </div>
                  ) : (
                    <div className='flex flex-col items-center gap-1'>
                      <Plus className="text-orange-500" size={32} />
                      <span className="text-sm text-orange-500 font-medium">Icon</span>
                    </div>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-6" align="start" side='right'>
                <div className="grid grid-cols-6 gap-4">
                  {icons.map((icon) => (
                    <button
                      key={icon.id}
                      onClick={() => handleIconSelect(icon)}
                      className={`transition-all hover:scale-110 ${selectedIcon?.id === icon.id ? 'ring-4 ring-orange-400 ring-offset-2' : ''
                        }`}
                    >
                      <img src={icon.icon} alt={icon.id} className="w-12 h-12" />
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <Label htmlFor="contactName" className="text-sm font-medium text-gray-700 mb-2 block">
              Category name
            </Label>
            <Input id="contactName" defaultValue={category?.name} onChange={e => setCategory(prev => ({ ...prev, name: e.target.value }))} className="bg-gray-10" />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outlined" className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => setShowRemoveDialog(true)}>
              Remove
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleSave}>
              {id ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>


      {/* Remove Confirmation Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center text-center py-6">
            <DialogTitle className="text-2xl font-semibold mb-2">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="text-gray-600 mb-6">
              Are you sure you want to remove this category?
            </DialogDescription>
            <div className="flex gap-4 w-full">
              <Button
                variant="outlined"
                className="flex-1 text-orange-500 border-orange-500 hover:bg-orange-50"
                onClick={handleRemove}
              >
                Yes
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

export const runtime = 'edge';