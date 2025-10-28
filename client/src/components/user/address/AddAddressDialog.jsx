import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useUserAddresses } from '@/hooks/user';

const fields = [
  { name: 'name', label: 'Full Name', placeholder: 'Enter your full name' },
  {
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    type: 'tel',
    maxLength: 10,
  },
  {
    name: 'address',
    label: 'Street Address',
    placeholder: 'Flat/House number, Building, Street',
  },
  { name: 'city', label: 'City', placeholder: 'Enter city' },
  { name: 'state', label: 'State', placeholder: 'Enter state' },
  {
    name: 'pincode',
    label: 'Pincode',
    placeholder: 'Enter pincode',
    type: 'text',
    maxLength: 6,
  },
];

export const AddAddressDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    handleClose(false);
  };

  const handleClose = (open) => {
    if (!open)
      setFormData({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
      });
    onOpenChange(open);
  };
  const { data: addresses } = useUserAddresses();
  useEffect(() => {
    if (addresses?.length >= 3) {
      toast.error('Address limit reached (3 max).');
      handleClose(false);
    }
  }, [addresses?.length]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Add New Address
          </DialogTitle>
          <DialogDescription>
            Fill in the details for your new shipping address
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          {fields.map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="space-y-2"
            >
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                required
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={formData[field.name]}
                maxLength={field.maxLength}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
              />
            </motion.div>
          ))}

          <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Address'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
