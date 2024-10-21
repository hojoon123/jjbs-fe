'use client';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productApi } from '@/services/api/productApi';
import { ProductOptionsProps } from '@/services/types/product';
import { Minus, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ProductOptions({ productId, onAddToTemp, onRemoveFromTemp, tempItems }: ProductOptionsProps) {
  const [options, setOptions] = useState<Array<{ id: number; name: string; additional_price: number }>>([]);
  const [selectedOption, setSelectedOption] = useState<{ name: string; additional_price: number }>({ name: '', additional_price: 0 });
  const [quantity, setQuantity] = useState(1);

  // 상품 옵션 불러오기
  useEffect(() => {
    const fetchProductOptions = async () => {
      try {
        const fetchedOptions = await productApi.getProductOptions(productId);
        setOptions(fetchedOptions);
        setSelectedOption(fetchedOptions[0]); // 기본 선택값 설정
      } catch (error) {
        console.error('Failed to fetch product options:', error);
      }
    };
    fetchProductOptions();
  }, [productId]);

  const handleAddToTemp = () => {
    onAddToTemp(selectedOption, quantity);
    setQuantity(1);
  };

  return (
    <div className="mt-6">
      <Select 
        defaultValue={selectedOption.name} 
        onValueChange={(value) => setSelectedOption(options.find(opt => opt.name === value) || { name: '', additional_price: 0 })}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((option) => (
            <SelectItem 
              key={option.id} 
              value={option.name} 
              className="hover:bg-gray-100 transition-colors duration-150"
            >
              {option.name} (+{option.additional_price}원)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-4 flex items-center">
        <Button
          variant="outline"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="hover:bg-gray-100 transition-colors duration-150"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="mx-4 w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          onClick={() => setQuantity(quantity + 1)}
          className="hover:bg-gray-100 transition-colors duration-150"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button 
          className="ml-4 hover:bg-gray-100 transition-colors duration-150" 
          onClick={handleAddToTemp}
        >
          옵션 추가
        </Button>
      </div>

      {tempItems.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900">선택한 옵션:</h3>
          <ul className="mt-2 divide-y divide-gray-200">
            {tempItems.map((item, index) => (
              <li key={index} className="py-2 flex justify-between items-center">
                <span>{item.option} - {item.quantity}개</span>
                <Button 
                  variant="ghost" 
                  onClick={() => onRemoveFromTemp(index)}
                  className="hover:bg-gray-100 transition-colors duration-150"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex space-x-3">
        <Button 
          className="flex-1 hover:bg-gray-100 transition-colors duration-150" 
          variant="outline"
        >
          장바구니 담기
        </Button>
        <Button 
          className="flex-1 hover:bg-gray-100 transition-colors duration-150"
          variant="outline"
        >
          바로 구매하기
        </Button>
      </div>
    </div>
  );
}