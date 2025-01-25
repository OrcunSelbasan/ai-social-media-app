import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

function CreatePage() {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post creation
    console.log({ content, selectedImage });
    // Reset form
    setContent('');
    setSelectedImage(null);
  };

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        {selectedImage ? (
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center space-y-2">
                <ImageIcon className="h-12 w-12 text-gray-400" />
                <span className="text-sm text-gray-500">Click to upload an image</span>
              </div>
            </label>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={!content.trim()}>
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default CreatePage;