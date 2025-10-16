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

const HomePage = () => {
  return (
    <div className="bg-white">
      <div className="min-h-screen w-full bg-[#f9fafb] relative">
        <div
          className="absolute h-screen w-screen opacity-55 z-0  pointer-events-none"
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
        <div className="relative w-full max-w-6xl mx-auto px-4 lg:px-8 ">
          <HeroSection />
          <TrendingCategories />
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <>
      <div className="min-h-max flex pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full max-w-7xl py-12">
          <div className="space-y-6">
            <h1 className="text-5xl xl:text-7xl font-bold tracking-tight mt-3">
              <TextEffect preset="slide" per="char">
                Stick Your Personality Everywhere
              </TextEffect>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Buy the perfect stickers to make your world uniquely yours.
            </p>
            <div className="pt-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              >
                Shop Now
              </Button>
            </div>
          </div>
          <div className="w-full max-w-64 mx-auto lg:mx-0 lg:ml-auto lg:top-20 relative">
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
                      className="w-full h-auto object-contain"
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
    <div className="py-12 overflow-hidden">
      <h2 className="section-title mb-8 text-center">Trending Categories</h2>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {Object.entries(trendingCategoryImages).map(
              ([name, image], index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 lg:mx-1"
                >
                  <div className="space-y-2">
                    <div className="aspect-square w-full overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-center line-clamp-2">
                      {name}
                    </h3>
                  </div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
          <CarouselPrevious className="md:flex" />
          <CarouselNext className="md:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage;
