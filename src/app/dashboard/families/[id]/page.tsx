"use client"
import React, { useState } from 'react';
import { ChevronLeft, ShoppingBag, Utensils, GraduationCap, ChevronDown } from 'lucide-react';
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
export default function FamilyProfile() {
  const [expandedList, setExpandedList] = useState('food');
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const foodItems = [
    { name: '30-Day Emergency Food Supply', url: 'amazon.com/item1', quantity: 1, price: 120.00 },
    { name: '299-Piece First Aid Kit', url: 'amazon.com/item2', quantity: 2, price: 18.00 },
    { name: 'Emergency Weather Radio (Solar/Hand Crank)', url: 'amazon.com/item3', quantity: 1, price: 30.00 },
    { name: 'Solar Power Bank (20000mAh)', url: 'amazon.com/item4', quantity: 3, price: 25.00 },
    { name: 'Mylar Thermal Blankets (4-Pack)', url: 'amazon.com/item5', quantity: 1, price: 8.00 },
  ];

  const toggleList = (listName) => {
    setExpandedList(expandedList === listName ? null : listName);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clip-path="url(#clip0_1171_10311)">
            <path d="M17.17 24C17.0384 24.0007 16.9079 23.9755 16.7861 23.9257C16.6642 23.876 16.5534 23.8027 16.46 23.71L8.28998 15.54C7.82435 15.0755 7.45492 14.5238 7.20286 13.9163C6.95079 13.3089 6.82104 12.6577 6.82104 12C6.82104 11.3423 6.95079 10.6911 7.20286 10.0837C7.45492 9.4762 7.82435 8.92445 8.28998 8.45999L16.46 0.290002C16.5532 0.196764 16.6639 0.122803 16.7857 0.0723425C16.9076 0.0218822 17.0381 -0.00408935 17.17 -0.00408936C17.3018 -0.00408936 17.4324 0.0218822 17.5542 0.0723425C17.6761 0.122803 17.7867 0.196764 17.88 0.290002C17.9732 0.38324 18.0472 0.49393 18.0976 0.615752C18.1481 0.737574 18.1741 0.868142 18.1741 1C18.1741 1.13186 18.1481 1.26243 18.0976 1.38425C18.0472 1.50607 17.9732 1.61676 17.88 1.71L9.70998 9.87999C9.14818 10.4425 8.83262 11.205 8.83262 12C8.83262 12.795 9.14818 13.5575 9.70998 14.12L17.88 22.29C17.9737 22.3829 18.0481 22.4935 18.0989 22.6154C18.1496 22.7373 18.1758 22.868 18.1758 23C18.1758 23.132 18.1496 23.2627 18.0989 23.3846C18.0481 23.5064 17.9737 23.617 17.88 23.71C17.7865 23.8027 17.6757 23.876 17.5539 23.9257C17.4321 23.9755 17.3016 24.0007 17.17 24Z" fill="#0E0A24" />
          </g>
          <defs>
            <clipPath id="clip0_1171_10311">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h1 className="text-3xl font-bold text-gray-100">Smith Family</h1>
      </div>

      {/* Family Profile Section */}
      <div className="mb-6 bg-white p-10 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">Family Profile</h2>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div>
            <Label htmlFor="contactName" className="text-sm font-medium text-gray-700 mb-2 block">
              Contact Name
            </Label>
            <Input id="contactName" defaultValue="Emily Smith" className="bg-gray-10" />
          </div>

          <div>
            <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700 mb-2 block">
              Contact Email
            </Label>
            <Input id="contactEmail" defaultValue="emily.smith@email.com" className="bg-gray-10" />
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
              Address
            </Label>
            <Input id="address" defaultValue="123 Main Street" className="bg-gray-10" />
          </div>

          <div>
            <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">
              City
            </Label>
            <Input id="city" defaultValue="Chicago" className="bg-gray-10" />
          </div>

          <div>
            <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-2 block">
              State
            </Label>
            <Input id="state" defaultValue="Illinois" className="bg-gray-10" />
          </div>

          <div>
            <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700 mb-2 block">
              Zip Code
            </Label>
            <Input id="zipCode" defaultValue="60101" className="bg-gray-10" />
          </div>

          <div>
            <Label htmlFor="familySize" className="text-sm font-medium text-gray-700 mb-2 block">
              Family Size
            </Label>
            <Input id="familySize" defaultValue="3" className="bg-gray-10" />
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 mb-2 block">
              Phone Number
            </Label>
            <Input id="phoneNumber" defaultValue="818-222-9191" className="bg-gray-10" />
          </div>

          <div>
            <Label htmlFor="recentEvent" className="text-sm font-medium text-gray-700 mb-2 block">
              Recent Event
            </Label>
            <Select defaultValue="california">
              <SelectTrigger className="bg-gray-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="california">California Wildfires</SelectItem>
                <SelectItem value="hurricane">Hurricane</SelectItem>
                <SelectItem value="flood">Flood</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='bg-gray-20 h-[1px] mb-10'></div>
        {/* Family Photo and Statement */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="">
            <h2 className="text-xl font-semibold mb-6 text-gray-100">Family Photo</h2>
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop"
              alt="Family"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="">
            <h2 className="text-xl font-semibold mb-6 text-gray-100">Statement</h2>
            <Textarea defaultValue="As a family navigating through unforeseen challenges, we find ourselves in a position where school and emergency supplies have become essential for our well-being and the education of our children, creating a heartfelt wish for support and assistance during these trying times" className="bg-gray-10" />
          </div>
        </div>

        {/* Amazon Lists */}
        <div className="">
          <h2 className="text-xl font-semibold mb-6">Amazon List</h2>

          {/* Medical Supplies */}
          <div className="mb-4">
            <button
              onClick={() => toggleList('medical')}
              className="w-full flex items-center justify-between p-4 rounded-lg  transition-colors border border-red-200"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-red-600" />
                <span className="font-medium">Medical Supplies</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Total Cost $221.50</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedList === 'medical' ? 'rotate-180' : ''}`} />
              </div>
            </button>
          </div>

          {/* Food List */}
          <div className="mb-4">
            <div

              className="w-full rounded-lg px-5 transition-colors border border-gray-200"
            >
              <div
                className="w-full flex items-center justify-between py-5 cursor-pointer"
                onClick={() => toggleList('food')}>
                <div className="flex items-center gap-3">
                  <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-1/10'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M0 6.24377C0 5.00276 1.00898 3.99377 2.25 3.99377C2.26758 3.99377 2.28867 3.99377 2.30625 3.99377C2.56641 2.71057 3.70195 1.74377 5.0625 1.74377C5.58984 1.74377 6.08203 1.88791 6.50039 2.13752C6.96797 1.23401 7.91016 0.618774 9 0.618774C10.0898 0.618774 11.032 1.23752 11.4996 2.13752C11.9215 1.88791 12.4137 1.74377 12.9375 1.74377C14.298 1.74377 15.4336 2.71057 15.6937 3.99377C15.7113 3.99377 15.7324 3.99377 15.75 3.99377C16.991 3.99377 18 5.00276 18 6.24377C18 6.6551 17.891 7.03831 17.6977 7.36877H0.302344C0.108984 7.03831 0 6.6551 0 6.24377ZM0 10.0196C0 9.4887 0.432422 9.05627 0.963281 9.05627H17.0332C17.5641 9.05627 17.9965 9.4887 17.9965 10.0196C17.9965 12.4981 16.4355 14.6145 14.2453 15.4371L14.1855 15.9469C14.1152 16.5094 13.6371 16.9313 13.0676 16.9313H4.92891C4.36289 16.9313 3.88125 16.5094 3.81094 15.9469L3.74766 15.4406C1.56094 14.6145 0 12.4981 0 10.0196Z" fill="#2F80ED" />
                    </svg>
                  </div>
                  <span className="font-semibold text-lg text-gray-100">Food List</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-100">Total Cost $220.75</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedList === 'food' ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedList === 'food' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="py-4 border-t border-gray-200">
                  <table className="w-full">
                    <thead className="">
                      <tr className="bg-purple-1/10">
                        <th className="p-4 rounded-tl-md rounded-bl-md text-left text-sm font-semibold text-purple-600">Item Name</th>
                        <th className="p-4 text-left text-sm font-semibold text-purple-600">Item URL</th>
                        <th className="p-4 text-center text-sm font-semibold text-purple-600">Quantity</th>
                        <th className="p-4 rounded-tr-md rounded-br-md text-center text-sm font-semibold text-purple-600">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodItems.map((item, index) => (
                        <tr key={index} className="border-b border-purple-100">
                          <td className="p-4 text-sm">{item.name}</td>
                          <td className="p-4 text-sm text-blue-600">{item.url}</td>
                          <td className="p-4 text-sm text-center">{item.quantity}</td>
                          <td className="p-4 text-sm text-center">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <table className="w-full">
                    <tbody>
                      <tr className="">
                        <td className="p-4 text-sm"><span className="font-medium">Subtotal</span></td>
                        <td className="p-4"></td>
                        <td className="p-4"></td>
                        <td className="p-4 text-sm text-center" width={150}><span>$201.00</span></td>
                      </tr>
                      <tr className="">
                        <td className="p-4 text-sm"><span className="font-medium">Tax</span></td>
                        <td className="p-4"></td>
                        <td className="p-4"></td>
                        <td className="p-4 text-sm text-center" width={150}><span>$19.75</span></td>
                      </tr>
                      <tr className="">
                        <td className="p-4 text-sm"><span className="font-medium">Total</span></td>
                        <td className="p-4"></td>
                        <td className="p-4"></td>
                        <td className="p-4 text-sm text-center" width={150}><span>$220.75</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* School List */}
          <div>
            <button
              onClick={() => toggleList('school')}
              className="w-full flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-green-600" />
                <span className="font-medium">School List</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Total Cost $143.92</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedList === 'school' ? 'rotate-180' : ''}`} />
              </div>
            </button>
          </div>
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