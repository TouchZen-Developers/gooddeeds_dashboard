'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Mock data
const districts = ['District A', 'District B', 'District C'];
const schools = ['School X', 'School Y', 'School Z'];
const products = ['Product Alpha', 'Product Beta', 'Product Gamma'];
const minMonths = ['6 Months', '12 Months', '24 Months'];

interface ProductForm {
  id: string;
  product: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  yearlyCost: string;
  proratedCost: string;
  minMonths: string;
  totalDevices: string;
}

export default function AddSchoolDistrictModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [accordionValue, setAccordionValue] = useState<string[]>(['item-1']);
  const [district, setDistrict] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [productsList, setProductsList] = useState<ProductForm[]>([
    {
      id: '1',
      product: '',
      startDate: undefined,
      endDate: undefined,
      yearlyCost: '',
      proratedCost: '',
      minMonths: '',
      totalDevices: '1',
    },
  ]);


  useEffect(() => {
    if (isOpen) {
      setAccordionValue(['item-1']);
    }
  }, [isOpen]);

  const handleAddProduct = () => {
    setProductsList([
      ...productsList,
      {
        id: Date.now().toString(),
        product: '',
        startDate: undefined,
        endDate: undefined,
        yearlyCost: '',
        proratedCost: '',
        minMonths: '',
        totalDevices: '1',
      },
    ]);
  };

  const handleRemoveProduct = (id: string) => {
    if (productsList.length > 1) {
      setProductsList(productsList.filter((p) => p.id !== id));
    }
  };

  const updateProduct = (id: string, field: keyof ProductForm, value: string | Date | undefined) => {
    setProductsList(
      productsList.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = () => {
    console.log({ district, school, products: productsList });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add School Districts</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* District & School */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Choose District</label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Choose School</label>
              <Select value={school} onValueChange={setSchool}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select School" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Accordion */}
          <Accordion
            type="multiple"
            className="space-y-3"
            value={accordionValue}
            onValueChange={setAccordionValue}>
            {productsList.map((product, index) => (
              <AccordionItem
                key={product.id}
                value={`item-${product.id}`}
                className="border rounded-lg overflow-hidden bg-gray-50"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">
                      Product {index + 1} - {product.product || 'Products'}
                    </span>
                    {productsList.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveProduct(product.id);
                        }}
                        className="text-red-500 hover:text-red-700 h-8 w-8 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-4 bg-white">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Product</label>
                    <Select
                      value={product.product}
                      onValueChange={(value) => updateProduct(product.id, 'product', value)}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Select Product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !product.startDate && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {product.startDate
                              ? format(product.startDate, 'PPP')
                              : 'Select Date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={product.startDate}
                            onSelect={(date) =>
                              updateProduct(product.id, 'startDate', date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !product.endDate && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {product.endDate
                              ? format(product.endDate, 'PPP')
                              : 'Select Date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={product.endDate}
                            onSelect={(date) =>
                              updateProduct(product.id, 'endDate', date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Yearly Coverage Cost
                      </label>
                      <Input
                        placeholder="$"
                        value={product.yearlyCost}
                        onChange={(e) =>
                          updateProduct(product.id, 'yearlyCost', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Minimal Prorated Cost
                      </label>
                      <Select
                        value={product.proratedCost}
                        onValueChange={(value) =>
                          updateProduct(product.id, 'proratedCost', value)
                        }
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="$" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$50">$50</SelectItem>
                          <SelectItem value="$100">$100</SelectItem>
                          <SelectItem value="$150">$150</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Minimum Months</label>
                      <Select
                        value={product.minMonths}
                        onValueChange={(value) =>
                          updateProduct(product.id, 'minMonths', value)
                        }
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Minimum Months" />
                        </SelectTrigger>
                        <SelectContent>
                          {minMonths.map((m) => (
                            <SelectItem key={m} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Total Number of Devices
                      </label>
                      <Input
                        type="number"
                        value={product.totalDevices}
                        onChange={(e) =>
                          updateProduct(product.id, 'totalDevices', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button
            variant="outline"
            className="bg-red-100 text-red-700 hover:bg-red-200"
            onClick={handleAddProduct}
          >
            Add Additional School
          </Button>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save School District</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}