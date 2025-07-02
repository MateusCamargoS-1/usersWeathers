import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const LoadingSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="animate-pulse border-0 shadow-lg">
        <CardHeader>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </CardContent>
      </Card>
    ))}
  </div>
);
