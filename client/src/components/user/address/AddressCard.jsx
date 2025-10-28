import { motion } from 'motion/react';
import { Check, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

export const AddressCard = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  showActions = false,
}) => (
  <motion.label
    htmlFor={address.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className={`group relative flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all ${
      isSelected
        ? 'border-primary shadow-sm'
        : 'border-border hover:border-primary/50 hover:bg-accent/30'
    }`}
  >
    {onSelect && (
      <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
    )}

    <div className="flex-1 space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-foreground font-semibold">{address.name}</p>
        {address.isDefault && (
          <Badge
            variant="secondary"
            className="bg-green-100 text-xs text-green-800"
          >
            Default
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {address.address}
      </p>
      <p className="text-muted-foreground text-sm">
        {address.city}, {address.state} - {address.pincode}
      </p>
      <p className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
        <span className="font-medium">Phone:</span> {address.phone}
      </p>
    </div>

    {showActions && (
      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )}

    {isSelected && !showActions && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring' }}
      >
        <Check className="text-primary h-5 w-5" />
      </motion.div>
    )}
  </motion.label>
);
