import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-500 h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted!</h3>
        <p className="text-gray-600 mb-6">Thank you for applying. We'll be in touch soon with next steps.</p>
        <Button onClick={onClose} className="w-full">
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  );
}
