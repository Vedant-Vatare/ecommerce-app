import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Rating, RatingButton } from '../ui/rating';
const SITE_REVIEWS = [
  {
    id: 1,
    rating: 5,
    name: 'Aarav Sharma',
    text: "Absolutely love these stickers! The print quality is excellent and colors are vibrant. I've already ordered more!",
  },
  {
    id: 2,
    rating: 5,
    name: 'Isha Patel',
    text: 'These stickers completely transformed my laptop. The designs are unique and the material feels premium.',
  },
  {
    id: 3,
    rating: 5,
    name: 'Rohan Mehta',
    text: 'Fast delivery and great packaging. The stickers are waterproof and still look brand new after weeks of use.',
  },
  {
    id: 4,
    rating: 5,
    name: 'Sneha Gupta',
    text: "Perfect for my water bottle and phone case! The adhesive is strong and doesn't leave residue.",
  },
  {
    id: 5,
    rating: 5,
    name: 'Karan Verma',
    text: "The detailing in each sticker is so good! Definitely worth the price and I'm recommending it to all my friends.",
  },
];

export const ReviewsCarousel = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div
        className="relative mx-auto w-full max-w-5xl overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 30%, black  70%, transparent)',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskImage:
            'linear-gradient(to right, transparent, black 30%, black 70%, transparent)',
          maskRepeat: 'no-repeat',
          maskSize: '100% 100%',
        }}
      >
        <Carousel
          autoplay={true}
          autoplayInterval={4000}
          opts={{ loop: true }}
          className="overflow-hidden"
        >
          <CarouselContent className="-ml-4">
            {SITE_REVIEWS.map((review) => (
              <CarouselItem
                key={review.id}
                className="basis-[90vw] pl-4 sm:basis-2/5 lg:basis-1/3"
              >
                <Card className="flex h-full flex-col items-center justify-between border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
                  <Rating defaultValue={review.rating} readOnly>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton className="text-yellow-500" key={index} />
                    ))}
                  </Rating>
                  <CardContent className="flex h-full flex-col justify-between py-4">
                    <blockquote className="relative block">
                      <p className="font-heading pr-6 pl-6 text-base font-bold text-gray-700 italic">
                        {review.text}
                      </p>
                    </blockquote>
                    <p className="mt-4 text-center text-sm font-semibold text-gray-900">
                      - {review.name}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
