import { useQuery } from '@tanstack/react-query';
import { getBlogs, type Blog } from '../api/blog';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogListProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export default function BlogList({ onSelect, selectedId }: BlogListProps) {
  // Fetch data using React Query
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error loading blogs.</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {blogs?.map((blog: Blog) => (
        <Card 
          key={blog.id} 
          className={`cursor-pointer transition-colors hover:bg-slate-50 ${
            selectedId === blog.id ? 'border-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => onSelect(blog.id)}
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex gap-2 mb-2">
                {blog.category.map((cat) => (
                  <span key={cat} className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                    {cat}
                  </span>
                ))}
              </div>
              <span className="text-xs text-slate-400">
                {new Date(blog.date).toLocaleDateString()}
              </span>
            </div>
            <CardTitle className="text-lg">{blog.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {blog.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}