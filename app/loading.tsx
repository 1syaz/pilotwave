import { LoadingSpinner } from "./_components/LoadingSpinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <LoadingSpinner size={40} color="#fc350b" />
    </div>
  );
}
