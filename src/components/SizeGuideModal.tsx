import React from 'react';
import { X } from 'lucide-react';
import { SizeGuide } from '../types';

interface SizeGuideModalProps {
  sizeGuide: SizeGuide[];
  onClose: () => void;
}

export default function SizeGuideModal({ sizeGuide, onClose }: SizeGuideModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Size Guide</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Size</th>
                <th className="py-2 text-left">Chest</th>
                <th className="py-2 text-left">Length</th>
                <th className="py-2 text-left">Shoulder</th>
              </tr>
            </thead>
            <tbody>
              {sizeGuide.map((size) => (
                <tr key={size.size} className="border-b">
                  <td className="py-2">{size.size}</td>
                  <td className="py-2">{size.chest}</td>
                  <td className="py-2">{size.length}</td>
                  <td className="py-2">{size.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-gray-600">
            Measurements are approximate. For the best fit, please measure yourself and compare with the size guide.
          </p>
        </div>
      </div>
    </div>
  );
}