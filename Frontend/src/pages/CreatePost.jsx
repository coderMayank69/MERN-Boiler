import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApi } from "@/services/post-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function CreatePost() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        try {
            await postApi.createPost({
                title: String(formData.get("title") || ""),
                content: String(formData.get("content") || ""),
                imageUrl: String(formData.get("imageUrl") || ""),
            });

            navigate("/feed");
        } catch (error) {
            setErrorMessage(error?.response?.data?.message || "Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 py-10">
            <Card className="w-full max-w-2xl border-slate-200/80 shadow-xl shadow-orange-100/50">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">Create a New Post</CardTitle>
                    <p className="text-sm text-slate-600">Draft quickly and move to feed instantly.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="A crisp post title" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" name="content" rows={6} placeholder="Write something useful..." required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                            <Input id="imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg" />
                        </div>

                        {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

                        <div className="flex gap-3">
                            <Button disabled={isSubmitting} type="submit">
                                {isSubmitting ? "Publishing..." : "Publish Post"}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => navigate("/feed")}>Go to Feed</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}

export default CreatePost;