"use client"
import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import { useAllCategories } from '@/hooks/use-categories';
import { useParams, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateItem, useDeleteItem } from '@/hooks/use-items';

interface Category {
  id: number;
  name: string;
  product_count: number;
  icon_url?: string;
}

interface CategoriesResponse {
  data: {
    categories: Category[];
  };
}
export default function AddItems() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const isEditing = !isNaN(id);
  const { data: categoriesData } = useAllCategories();
  const createItem = useCreateItem();
  const deleteItem = useDeleteItem();
  const isLoading = createItem.isPending;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemUrls, setItemUrls] = useState<string[]>(['']);

  const handleAddItem = () => {
    setItemUrls([...itemUrls, '']);
  };

  const handleRemoveItem = (index: number) => {
    const newUrls = itemUrls.filter((_, i) => i !== index);
    setItemUrls(newUrls);
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...itemUrls];
    newUrls[index] = value;
    setItemUrls(newUrls);
  };

  const handlePublish = async () => {
    if (!selectedCategory) {
      toast.error('Please select a category');
      return;
    }

    const validUrls = itemUrls.filter(url => url.trim() !== '');
    if (validUrls.length === 0) {
      toast.error('Please add at least one item URL');
      return;
    }

    try {
      const data = {
        category_id: parseInt(selectedCategory),
        urls: validUrls,
      };
      console.log('Submitting data:', data);
      await createItem.mutateAsync(data);
      toast.success('Items added successfully');
      router.push('/dashboard/items');
    } catch (error) {
      toast.error('Failed to add items');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem.mutateAsync(id);
      toast.success('Items deleted successfully');
      router.push('/dashboard/items');
    } catch (error) {
      toast.error('Failed to delete items');
      console.error(error);
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
        <h1 className="text-3xl font-bold text-gray-100">{isEditing ? 'Edit Amazon Items' : 'Add Amazon Items'}</h1>
      </div>

      <div className="mb-6 bg-white p-10 rounded-xl">
        {/* Category Dropdown */}
        <div className="mb-8">
          <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2 block">
            Category
          </Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full h-12 ">
              <SelectValue placeholder="Choose Category" />
            </SelectTrigger>
            <SelectContent>
              {(categoriesData as CategoriesResponse)?.data?.categories?.map((category: Category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Add Items Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add Items</h2>

          {itemUrls.map((url, index) => (
            <div key={index} className="mb-4 flex items-center gap-2">
              <div className="flex-1">
                <Label htmlFor={`itemUrl-${index}`} className="text-sm font-medium text-gray-700 mb-2 block">
                  Item URL
                </Label>
                <Input
                  id={`itemUrl-${index}`}
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  className=""
                />
              </div>
              {itemUrls.length > 1 && (
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="mt-8 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}

          <Button
            variant="outlined"
            onClick={handleAddItem}
            className="text-orange-500 border-orange-500 hover:bg-orange-50 mt-2"
          >
            Add Another Item
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            onClick={handleDelete}
            disabled={deleteItem.isPending}
          >
            {deleteItem.isPending ? 'Deleting...' : 'Delete'}
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            onClick={handlePublish}
            disabled={isLoading}
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>
    </div>
  );
}