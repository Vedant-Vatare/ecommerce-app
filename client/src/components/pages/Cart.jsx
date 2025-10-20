import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { X, Plus, Minus } from 'lucide-react';
import {
  useCartQuery,
  useDeleteCartItemQuery,
  useUpdateCartItemQuery,
} from '@/hooks/cart';
import ServerError from './ServerError';

const Cart = () => {
  const { data: cartItems, isLoading, isError } = useCartQuery();

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <ServerError />;
  }

  return (
    <>
      <div
        initial="hidden"
        animate="visible"
        className="bg-background min-h-screen pb-24 md:pb-0"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-foreground page-title">
              Shopping Cart
              {cartItems?.length > 0 && (
                <p className="ml-1 inline opacity-80">({cartItems.length})</p>
              )}
            </h1>
          </div>

          {cartItems?.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground text-lg">
                Your cart is empty
              </p>
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems?.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          )}
        </div>

        {cartItems?.length > 0 && (
          <div className="border-border bg-background fixed bottom-0 left-0 right-0 border-t p-4 md:hidden">
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

const CartItem = ({ item }) => {
  const { product, quantity, id } = item;
  const itemTotal = product.price * quantity;
  const { mutateAsync: updateCartItem } = useUpdateCartItemQuery();
  const { mutateAsync: removeCartItem } = useDeleteCartItemQuery();
  return (
    <Card className="border-border max-w-xl overflow-hidden border py-4">
      <div className="flex gap-4 p-4 px-2 py-2 sm:flex-row sm:gap-6 md:p-4">
        <div className="flex-shrink-0">
          <div className="bg-muted relative h-24 w-24 overflow-hidden rounded-lg sm:h-32 sm:w-32">
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-foreground font-semibold">{product.name}</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {product.description}
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Stock: {product.stock} available
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              disabled={quantity <= 1}
              onClick={() =>
                updateCartItem({
                  cartItemId: id,
                  updatedQuantity: quantity - 1,
                })
              }
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() =>
                updateCartItem({
                  cartItemId: id,
                  updatedQuantity: quantity + 1,
                })
              }
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <div className="text-right">
            <p className="text-muted-foreground text-sm">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-foreground mt-1 text-lg font-bold">
              ₹{itemTotal.toLocaleString()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-75 hover:opacity-100"
            onClick={() => removeCartItem(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const CartSummary = () => {
  const { data: cartItems } = useCartQuery();
  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;
  return (
    <Card className="border-border sticky top-8 border p-6">
      <h2 className="text-foreground text-lg font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Subtotal</span>
          <span className="text-foreground text-sm font-medium">
            ₹{subtotal?.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">Shipping</span>
          <span className="text-foreground text-sm font-medium">
            {shipping === 0 ? (
              <span className="font-medium text-emerald-600">FREE</span>
            ) : (
              `₹${shipping.toLocaleString()}`
            )}
          </span>
        </div>

        <div className="border-border border-t" />

        <div className="flex justify-between">
          <span className="font-bold text-emerald-600">Grand Total</span>
          <span className="text-xl font-bold text-emerald-600">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      <Button className="mt-6 w-full rounded-none" size="lg">
        Proceed to Checkout
      </Button>
    </Card>
  );
};

export default Cart;
