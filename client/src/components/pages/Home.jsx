import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../ui/carousel';
import { TextEffect } from '../ui/text-effect';
import { heroImages } from '@/utils/images';
import { trendingCategoryImages } from '@/utils/images';
import { featuredImages } from '@/utils/images';
import ProductGrid from '../product/ProductGrid';

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
        <div className="relative mx-auto flex w-full max-w-6xl flex-col px-2 lg:px-8">
          <HeroSection />
          <TrendingCategories />
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <>
      <div className="flex min-h-max pb-10">
        <div className="grid w-full max-w-7xl grid-cols-1 items-start gap-12 py-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <h1 className="mt-3 text-5xl font-bold tracking-tight xl:text-7xl">
              <TextEffect preset="slide" per="char">
                Stick Your Personality Everywhere
              </TextEffect>
            </h1>
            <p className="text-xl leading-relaxed text-gray-600">
              Buy the perfect stickers to make your world uniquely yours.
            </p>
            <div className="pt-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
              >
                Shop Now
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-64 lg:top-20 lg:mx-0 lg:ml-auto">
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
                      src={image}
                      alt={`Hero image ${index + 1}`}
                      className="h-auto w-full object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

const TrendingCategories = () => {
  return (
    <div className="mt-12">
      <h2 className="section-title mb-8 text-center">Trending Categories</h2>
      <div className="relative">
        <Carousel>
          <CarouselContent>
            {trendingCategoryImages.map((category, index) => {
              const [name, imgSrc] = Object.entries(category)[0];
              return (
                <CarouselItem
                  key={index}
                  className="basis-1/2 py-2 pl-2 sm:basis-1/3 md:basis-1/4 md:pl-4 lg:mx-1 lg:basis-1/5"
                >
                  <div className="outline-foreground cursor-pointer space-y-2 transition-transform duration-300 hover:scale-110">
                    <div className="aspect-square w-full rounded-lg">
                      <img
                        src={imgSrc}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-body line-clamp-2 text-center text-sm font-medium capitalize md:text-base">
                      {name}
                    </span>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0" />
          <CarouselNext className="absolute right-0" />
        </Carousel>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <div className="mt-24">
      <h2 className="section-title text-center">Featured Stickers</h2>
      <ProductGrid products={featuredImages} show />
    </div>
  );
};
export default HomePage;
