const LoadingDots = () => {
  return (
    <div className="flex gap-2">
      <span
        style={{ animationDuration: '750ms' }}
        className="h-2.5 w-2.5 animate-pulse rounded-full bg-white delay-75"
      ></span>
      <span
        style={{ animationDuration: '750ms' }}
        className="h-2.5 w-2.5 animate-pulse rounded-full bg-white delay-100 duration-200"
      ></span>
      <span
        style={{ animationDuration: '750ms' }}
        className="h-2.5 w-2.5 animate-pulse rounded-full bg-white duration-200"
      ></span>
    </div>
  );
};

export default LoadingDots;
