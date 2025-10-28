import { AddressCard } from './AddressCard';
import { RadioGroup } from '@/components/ui/radio-group';

export const AddressList = ({
  addresses,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  showActions = true,
}) => (
  <RadioGroup value={selectedId} onValueChange={onSelect}>
    <div className="space-y-3">
      {console.log({ addresses, selectedId })}
      {addresses.map((addr) => (
        <AddressCard
          key={addr.id}
          address={addr}
          isSelected={selectedId === addr.id}
          onSelect={() => onSelect?.(addr.id)}
          onEdit={() => onEdit?.(addr)}
          onDelete={() => onDelete?.(addr)}
          showActions={showActions}
        />
      ))}
    </div>
  </RadioGroup>
);
