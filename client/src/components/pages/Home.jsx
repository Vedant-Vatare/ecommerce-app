import { Button } from '@/components/ui/button';
import { ChevronsRightIcon } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../ui/carousel';
import { TextEffect } from '../ui/text-effect';
import {
  heroImages,
  topSellingProducts,
  trendingCategoryImages,
  featuredProducts,
} from '@/utils/images';
import ProductGrid from '../product/ProductGrid';
import { ReviewsCarousel } from '../user/Reviews';
import Footer from '../Footer';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const HomePage = () => {
  return (
    <div className="bg-white">
      <div className="relative min-h-screen w-full bg-[#f9fafb]">
        <div
          className="pointer-events-none absolute z-0 h-screen w-full opacity-45"
          style={{
            backgroundImage: `
      linear-gradient(to right, #d1d5db 1px, transparent 1px),
      linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
    `,
            backgroundSize: '32px 32px',
            maskImage:
              'radial-gradient(circle at top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage:
              'radial-gradient(circle at top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
        <div className="relative mx-auto mb-10 flex w-full max-w-6xl flex-col px-2 md:px-8">
          <HeroSection />
          <TrendingCategories />
          <FeaturedProducts />
          <TopSellingProducts />
          <Testimonials />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const HeroSection = () => {
  return (
    <>
      <motion.div
        className="flex min-h-max pb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <div className="grid w-full max-w-7xl grid-cols-1 items-start gap-12 py-12 md:grid-cols-2 md:gap-16">
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h1
              className="mt-3 text-5xl font-bold tracking-tight xl:text-7xl"
              variants={fadeInUp}
            >
              <TextEffect preset="slide" per="char">
                Stick Your Personality Everywhere
              </TextEffect>
            </motion.h1>
            <motion.p
              className="text-xl leading-relaxed text-gray-600"
              variants={fadeInUp}
            >
              Buy the perfect stickers to make your world uniquely yours.
            </motion.p>
            <motion.div className="w-max pt-2" variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                >
                  Shop Now
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-64 lg:top-20 lg:mx-0 lg:ml-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            animate={{ y: [0, -10, 0] }}
            whileHover={{ scale: 1.05 }}
          >
            <Carousel
              autoplay={true}
              autoplayInterval={2500}
              opts={{ loop: true }}
              className="overflow-hidden"
            >
              <CarouselContent>
                {heroImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image || '/placeholder.svg'}
                      alt={`Hero image ${index + 1}`}
                      className="h-auto w-full object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

const TrendingCategories = () => {
  return (
    <motion.div
      className="mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      <motion.h2 className="section-title text-center" variants={fadeInUp}>
        Trending Categories
      </motion.h2>
      <div className="relative">
        <Carousel>
          <CarouselContent>
            {trendingCategoryImages.map((category, index) => {
              const [name, imgSrc] = Object.entries(category)[0];
              return (
                <CarouselItem
                  key={index}
                  className="mx-1 basis-1/2 py-2 pl-2 sm:basis-1/3 md:basis-1/4 md:pl-4 lg:mx-1"
                >
                  <motion.div
                    className="outline-foreground cursor-pointer space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div className="relative flex w-full flex-col items-center gap-2 rounded-lg transition-transform duration-300 hover:scale-105">
                      <img
                        src={imgSrc || '/placeholder.svg'}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                      <Button
                        variant={'outline'}
                        className="font-body mx-auto mb-5 w-max text-sm font-medium capitalize md:text-base"
                      >
                        {name}
                      </Button>
                    </motion.div>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0" />
          <CarouselNext className="absolute right-0" />
        </Carousel>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  return (
    <motion.div
      className="mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      <motion.div
        className="mb-3 flex items-center justify-between"
        variants={fadeInUp}
      >
        <h2 className="section-title">Featured Stickers</h2>
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={'outline'}
            className="group ml-auto flex items-center"
          >
            View All
            <ChevronsRightIcon className="inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <ProductGrid products={featuredProducts} showAddToCartBtn={true} />
      </motion.div>
    </motion.div>
  );
};

const TopSellingProducts = () => {
  return (
    <motion.div
      className="mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      <motion.div
        className="mb-3 flex items-center justify-between"
        variants={fadeInUp}
      >
        <h2 className="section-title">Top Selling Stickers</h2>
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={'outline'}
            className="group ml-auto flex items-center"
          >
            View All
            <ChevronsRightIcon className="inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <ProductGrid products={topSellingProducts} showAddToCartBtn={true} />
      </motion.div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <motion.div
      className="mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      <motion.h2 className="section-title text-center" variants={fadeInUp}>
        What Our Customers Say
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <ReviewsCarousel />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
