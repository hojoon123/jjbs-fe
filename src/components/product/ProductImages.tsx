'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ProductImagesProps {
  images: Array<{ id: number; image: string }>;
}

export function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col-reverse"
    >
      <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ${
                selectedImage === index ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <span className="sr-only">{index + 1}번 이미지 보기</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <Image src={image.image} alt="" className="w-full h-full object-center object-cover" layout="fill" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full aspect-w-1 aspect-h-1">
        <Image
          src={images[selectedImage].image}
          alt="제품 이미지"
          className="w-full h-full object-center object-cover sm:rounded-lg"
          layout="fill"
        />
      </div>
    </motion.div>
  )
}