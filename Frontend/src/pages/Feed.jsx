import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { postApi } from "@/services/post-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadPosts() {
            try {
                const response = await postApi.getPosts();
                if (isMounted) {
                    setPosts(response.data.data || []);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error?.response?.data?.message || "Failed to fetch posts");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadPosts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
            <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">Community Feed</h1>
                    <p className="mt-1 text-sm text-slate-600">A ready-to-extend starter feed for MERN apps.</p>
                </div>
                <Button asChild>
                    <Link to="/create-post" className="inline-flex items-center gap-2">
                        <PlusCircle className="size-4" /> Create Post
                    </Link>
                </Button>
            </header>

            {loading ? <p className="text-sm text-slate-600">Loading posts...</p> : null}
            {errorMessage ? <p className="mb-4 text-sm text-red-600">{errorMessage}</p> : null}

            {!loading && posts.length === 0 ? (
                <Card className="border-dashed border-slate-300 bg-white/70">
                    <CardContent className="py-8 text-center text-slate-600">No posts yet. Create your first post.</CardContent>
                </Card>
            ) : null}

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Card key={post._id} className="overflow-hidden border-slate-200/80 bg-white/90 backdrop-blur-sm">
                        {post.imageUrl ? (
                            <img src={post.imageUrl} alt={post.title} className="h-44 w-full object-cover" loading="lazy" />
                        ) : null}
                        <CardHeader>
                            <CardTitle className="text-xl text-slate-900">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="line-clamp-4 text-sm text-slate-700">{post.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </main>
    );
}

export default Feed;