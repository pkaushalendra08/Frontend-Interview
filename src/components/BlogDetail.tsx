import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '../api/blog';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Bookmark, UserCircle } from 'lucide-react';

interface BlogDetailProps {
  id: string;
}

export default function BlogDetail({ id }: BlogDetailProps) {
  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <Skeleton className="h-80 w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (isError) return <div className="p-8 text-red-500 font-medium">Failed to load content.</div>;
  if (!blog) return null;

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Hero Image */}
      <div className="relative w-full h-72 md:h-96">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
          <div className="text-white">
            <div className="flex gap-2 mb-3">
              {blog.category.map((cat) => (
                <span key={cat} className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold tracking-wide uppercase">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight shadow-sm">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Meta Bar */}
        <div className="flex items-center justify-between border-b pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              <UserCircle className="h-8 w-8 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">CA Monk Team</p>
              <p className="text-xs text-slate-500">
                {new Date(blog.date).toLocaleDateString(undefined, { dateStyle: 'medium' })} · 5 min read
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-slate prose-lg max-w-none mb-12">
          <p className="whitespace-pre-wrap leading-8 text-slate-700 font-normal">
            {blog.content}
          </p>
        </article>

        {/* Engagement Footer */}
        <div className="bg-slate-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Did you find this helpful?</h3>
            <p className="text-slate-500 text-sm">Join the discussion with other students.</p>
          </div>
          <div className="flex gap-3">
            <Button className="gap-2 bg-white text-slate-700 border hover:bg-slate-50 shadow-sm">
              <Heart className="h-4 w-4 text-red-500" /> Like
            </Button>
            <Button
              className="gap-2 bg-slate-900 text-white hover:bg-slate-800 shadow-md"
              style={{ backgroundColor: '#0F1D42', color: 'white' }}
            >
              <MessageCircle className="h-4 w-4" /> Comments
            </Button>
          </div>
        </div>

        {/* Author Bio Section */}
        <div className="mt-8 pt-8 border-t">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">About the Author</h4>
          <div className="flex gap-4 items-start">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
              C
            </div>
            <div>
              <p className="font-bold text-slate-900 text-lg">CA Monk Editorial</p>
              <p className="text-slate-600 leading-relaxed">
                Empowering the next generation of financial leaders with tools, community, and knowledge.
                Stay tuned for more updates on Finance, Tech, and Regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}