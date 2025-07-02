import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const UserSkeletonList = ({ count = 9 }: { count?: number }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <Card key={index} className="animate-pulse border-0 shadow-lg">
          <CardHeader>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="h-3 bg-gray-200 rounded w-full mb-2" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
