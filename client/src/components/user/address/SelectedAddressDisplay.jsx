import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';

export const SelectedAddressDisplay = ({ address }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-lg"
  >
    <div className="space-y-2 text-sm">
      <p className="flex items-center gap-2 font-semibold">
        {address.name}
        {address.isDefault && (
          <Badge variant="secondary" className="bg-info p-1 px-2 text-xs">
            Default
          </Badge>
        )}
      </p>
      <p className="max-w-42 leading-relaxed md:max-w-60">{address.address}</p>
      <p>
        {address.city}, {address.state} - {address.pincode}
      </p>
      <p>
        <span className="font-medium">Phone:</span> {address.phone}
      </p>
    </div>
  </motion.div>
);
