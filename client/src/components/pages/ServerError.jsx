import { Button } from '@/components/ui/button';
import { ChevronsRight } from 'lucide-react';
import serverErrorSVG from '../../assets/server-error.svg';
export function ServerError() {
  return (
    <div className="bg-background flex min-h-full items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div>
          <img
            src={serverErrorSVG}
            alt="Server Error"
            className="mx-auto max-h-80"
          />
          <span className="text-destructive font-body text-lg font-bold tracking-tight">
            Status Code: 500
          </span>
          <h3 className="text-foreground font-heading text-2xl font-semibold">
            Internal Server Error
          </h3>
          <p className="text-muted-foreground text-balance">
            Our servers are currently experiencing issues. Please try again
            later.
          </p>
        </div>

        <div className="mt-6 flex flex-col justify-center sm:flex-row">
          <Button
            variant={'outline'}
            size="lg"
            className="mx-auto w-max"
            onClick={() => window.location.reload()}
          >
            Try Again
            <ChevronsRight className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ServerError;
