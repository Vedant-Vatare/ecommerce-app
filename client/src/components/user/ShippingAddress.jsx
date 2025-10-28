import { useAddUserAddress, useUserAddresses } from '@/hooks/user';
import { Card, CardContent } from '../ui/card';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { MapPin, Edit2, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-separator';
import { SelectedAddressDisplay } from './address/SelectedAddressDisplay';
import { AddressSelectionDialog } from './address/AddressSelectionDialog';
import { AddAddressDialog } from './address/AddAddressDialog';

export const ShippingAddressSection = ({
  shippingAddressId,
  setShippingAddressId,
}) => {
  const { data: addresses = [], isLoading } = useUserAddresses();
  const { mutateAsync: addAddress, isPending: isAdding } = useAddUserAddress();
  const [changeOpen, setChangeOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    if (addresses.length) {
      setShippingAddressId(
        addresses.find((a) => a.isDefault)?.id || addresses[0]?.id,
      );
    }
  }, [addresses]);

  const selected = addresses.find((a) => a.id === shippingAddressId);

  if (isLoading)
    return (
      <Card className="border-border bg-muted/40 mb-3 rounded-lg border p-4 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-36" />
        </div>
        <Skeleton className="h-32 w-full rounded-lg" />
      </Card>
    );

  return (
    <Card className="bg-muted/30 my-4 rounded-none">
      <CardContent className="px-2 md:p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <h2 className="font-semibold">Shipping Address</h2>
          </div>
          {addresses.length > 0 && (
            <Button
              variant="outline"
              className={'rounded-sm p-1 px-2'}
              size="xs"
              onClick={() => setChangeOpen(true)}
            >
              <Edit2 className="h-3 w-3" /> Change
            </Button>
          )}
        </div>
        <Separator className="mb-4" />

        {selected ? (
          <SelectedAddressDisplay address={selected} />
        ) : (
          <Button
            onClick={() => setAddOpen(true)}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4" /> Add Shipping Address
          </Button>
        )}
        {changeOpen && (
          <AddressSelectionDialog
            isOpen={changeOpen}
            selectedId={shippingAddressId}
            onOpenChange={setChangeOpen}
            addresses={addresses}
            shippingAddressId={shippingAddressId}
            onSelect={(id) => {
              setShippingAddressId(id);
              setChangeOpen(false);
            }}
            onAddNew={() => {
              setChangeOpen(false);
              setAddOpen(true);
            }}
          />
        )}
        {addOpen && (
          <AddAddressDialog
            isOpen={addOpen}
            onOpenChange={setAddOpen}
            onSubmit={addAddress}
            isSubmitting={isAdding}
            currentCount={addresses.length}
          />
        )}
      </CardContent>
    </Card>
  );
};
