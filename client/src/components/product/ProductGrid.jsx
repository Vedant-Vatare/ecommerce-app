import { Button } from '../ui/button';
import { motion } from 'motion/react';
const ProductGrid = ({ products, showDescription, showAddToCartBtn }) => (
  <div className="grid w-full grid-cols-2 justify-items-center gap-2 gap-y-7 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
    {products.map((product, index) => (
      <motion.div
        key={index}
        className="outline-foreground flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-sm p-2 transition-transform duration-300 hover:scale-105 hover:outline-1"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay: Math.min(index * 0.05, 2) }}
        whileHover={{ y: -5 }}
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
        {showAddToCartBtn && (
          <Button variant={'outline'} className="mt-1 self-start">
            Add to Cart
          </Button>
        )}
      </motion.div>
    ))}
  </div>
);

const a = () => <div>Hello</div>;
export default ProductGrid;
