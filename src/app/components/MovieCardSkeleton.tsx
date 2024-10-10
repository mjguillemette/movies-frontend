import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MovieCardSkeleton() {
  return (
    <Card className="w-full max-w-sm overflow-hidden relative flex flex-col">
      <div className="relative w-full aspect-[2/3] flex-grow">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="flex flex-col z-20 bg-white">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-16" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </div>
      <div className="flex justify-center flex-grow p-2">
        <Skeleton className="h-10 w-full max-w-xs" />
      </div>
    </Card>
  )
}