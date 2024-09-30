import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readFileAsDataURL } from "@/lib/utils";
import axios from "axios";
import { baseUrl } from "@/constants/baseURL";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice/postSlice";
import { AppDispatch, RootState } from "@/redux/store";

function CreatePost({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { posts } = useSelector((store: RootState) => store.post);
  const dispatch = useDispatch<AppDispatch>();

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const dataUri = await readFileAsDataURL(selectedFile);
      setImagePreview(dataUri);
    }
  }

  async function handleCreatePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("image", file); // Ensure the actual file is used

    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/post/add-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        resetForm(); // Reset form after success
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setFile(null);
    setCaption("");
    setImagePreview("");
    setOpen(false); // Close the dialog on success
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <form onSubmit={handleCreatePost}>
            <div>
              <input
                ref={imageRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="gap-2"
              >
                <Upload /> <span>Upload Image</span>
              </Button>
              {imagePreview && (
                <div className="flex items-center justify-center w-full h-64 mt-2">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              )}
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="border-none focus-visible:ring-transparent"
                placeholder="Write a caption..."
                required
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={loading} className="px-4 py-2">
                {loading ? "Posting..." : "Create Post"}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
