
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';

interface DeliverableModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
}

const DeliverableModal = ({ 
  isOpen, 
  onClose, 
  image,
  title
}: DeliverableModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[95vw] !max-h-[95vh] !w-[95vw] !h-[95vh] !p-0 !gap-0 bg-black-900/95 border-gold-500/20 overflow-hidden flex flex-col">
        {/* Visually hidden accessibility elements */}
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          Full resolution view of {title} deliverable example
        </DialogDescription>

        {/* Fixed header */}
        <div className="flex items-center justify-between bg-black-900/90 backdrop-blur-sm px-4 py-3 border-b border-gold-500/10 shrink-0">
          <div className="text-white/90 text-sm font-medium">
            {title}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black-900/60 border border-gold-500/20 flex items-center justify-center text-white/70 hover:text-white hover:border-gold-500/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable image container taking remaining height */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <img
            src={image}
            alt={`${title} deliverable example`}
            className="w-full min-w-full max-w-none h-auto block"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliverableModal;
