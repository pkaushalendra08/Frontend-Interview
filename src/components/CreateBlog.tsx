import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '../api/blog'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export default function CreateBlog() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    content: '',
    coverImage: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg',
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      alert('Blog created successfully!');
      setFormData({
        title: '',
        description: '',
        category: '',
        content: '',
        coverImage: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg',
      });
    },
    onError: (error) => {
      alert(`Error creating blog: ${error}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      category: formData.category.split(',').map((c) => c.trim()),
    });
  };

  return (
    <Card className="h-full overflow-y-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#0F1D42]">Create New Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-700 font-medium">Title</Label>
            <Input 
              id="title" 
              placeholder="Enter blog title" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="border-slate-300 focus-visible:ring-[#0F1D42]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-700 font-medium">Category (comma separated)</Label>
            <Input 
              id="category" 
              placeholder="TECH, FINANCE, LIFESTYLE" 
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="border-slate-300 focus-visible:ring-[#0F1D42]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700 font-medium">Short Description</Label>
            <Textarea 
              id="description" 
              placeholder="Brief summary..." 
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="border-slate-300 focus-visible:ring-[#0F1D42]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-slate-700 font-medium">Full Content</Label>
            <Textarea 
              id="content" 
              className="min-h-[250px] border-slate-300 focus-visible:ring-[#0F1D42]" 
              placeholder="Write your blog post here..." 
              required
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-bold shadow-lg" 
            disabled={mutation.isPending}
            style={{ backgroundColor: '#0F1D42', color: 'white' }}
          >
            {mutation.isPending ? 'Creating...' : 'Publish Blog'}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}