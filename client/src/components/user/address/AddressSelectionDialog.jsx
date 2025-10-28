import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, MapPin } from 'lucide-react';
import { AddressList } from './AddressList';

export const AddressSelectionDialog = ({
  isOpen,
  onOpenChange,
  addresses,
  selectedId,
  onSelect,
  onAddNew,
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="px-2 sm:max-w-[500px] md:px-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-1">
          <MapPin className="h-5 w-5" /> Select Shipping Address
        </DialogTitle>
        <DialogDescription>
          Choose a delivery address or add a new one
        </DialogDescription>
      </DialogHeader>

      <div className="w-full flex-1 px-1">
        <AddressList
          addresses={addresses}
          selectedId={selectedId}
          onSelect={onSelect}
          showActions={false}
        />
      </div>

      <div className="border-t pt-4">
        <Button onClick={onAddNew} variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" /> Add New Address
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
