import { Button } from '../ui/button';

const ProductGrid = ({ products, showDescription, showAddToCartBtn }) => (
  <div className="grid w-full grid-cols-2 justify-items-center gap-2 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
    {products.map((product, index) => (
      <div
        key={index}
        className="outline-foreground flex w-full cursor-pointer flex-col items-center rounded-lg p-2 transition-transform duration-300 hover:scale-105 hover:outline-1"
      >
        <div className="bg-muted relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-md">
          <img
            loading="lazy"
            src={product.image || product.images[0]}
            alt={product.alt || 'Product image'}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="mt-2 w-full text-left">
          <span
            className="font-heading overflow-hidden text-ellipsis"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </span>

          <span className="block font-mono text-lg font-semibold">
            Rs.{product.price}
          </span>
        </div>
        {showAddToCartBtn && <Button className="w-full">Add to Cart</Button>}
      </div>
    ))}
  </div>
);

const a = () => <div>Hello</div>;
export default ProductGrid;
