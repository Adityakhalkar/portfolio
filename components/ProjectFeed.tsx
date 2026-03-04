"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, ArrowUpRight, BadgeCheck, BarChart2, Pin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
    {
        id: 1,
        title: "Dataset Finder",
        description: "Just shipped Dataset Finder! 🚀 It's a tool to help you discover and analyze datasets for your ML models. Check it out on HuggingFace.",
        image: "/dataset-finder.png",
        link: "https://huggingface.co/spaces/AdityaKhalkar/Dataset-finder",
        likes: 420,
        comments: 12,
        retweets: 5,
        views: "12.5K",
        timestamp: "2h",
        pinned: true
    },
    {
        id: 2,
        title: "Seat Algo",
        description: "Visualizing algorithms is so satisfying. 🎨 Built this interactive seat allocation visualizer. Great for understanding how these complex systems work.",
        image: "/SeatAlgo.jpg",
        link: "https://seatalgo.streamlit.app",
        likes: 892,
        comments: 45,
        retweets: 128,
        views: "45K",
        timestamp: "5h"
    },
    {
        id: 3,
        title: "Eye from Above",
        description: "Satellite imagery analysis using computer vision. 🛰️ The scale of data we can process now is mind-blowing. #ComputerVision #AI",
        image: "/eye-from-above.png",
        link: "https://eye-from-above.vercel.app",
        likes: 1543,
        comments: 89,
        retweets: 230,
        views: "89K",
        timestamp: "1d"
    },
    {
        id: 4,
        title: "Project Alpha",
        description: "Cooking up something new... 🍳 Stay tuned.",
        image: "/placeholder-1.jpg",
        link: "#",
        likes: 56,
        comments: 2,
        retweets: 0,
        views: "1.2K",
        timestamp: "2d"
    }
];

const trends = [
    { category: "Technology · Trending", name: "#NextJS", posts: "125K posts" },
    { category: "Technology · Trending", name: "#React", posts: "89K posts" },
    { category: "Design · Trending", name: "#UIUX", posts: "54K posts" },
    { category: "AI · Trending", name: "#MachineLearning", posts: "210K posts" },
    { category: "Trending in India", name: "#WebDev", posts: "45K posts" },
];

export default function ProjectFeed() {
    return (
        <section className="min-h-screen w-full bg-black text-white flex justify-center">
            <div className="flex w-full max-w-[1000px] gap-8">
                {/* Main Feed */}
                <div className="w-full max-w-[600px] border-x border-zinc-800 min-h-screen">
                    <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <h2 className="text-xl font-bold">Projects</h2>
                    </div>

                    {projects.map((project) => (
                        <Post key={project.id} project={project} />
                    ))}
                </div>

                {/* Sidebar (Hidden on mobile) */}
                <div className="hidden lg:block w-[350px] py-4 space-y-4 sticky top-0 h-screen overflow-y-auto no-scrollbar">
                    {/* Search Placeholder */}
                    <div className="bg-zinc-900 rounded-full px-5 py-3 text-zinc-500 flex items-center gap-3">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.73 3.815-1.945 5.232l4.959 4.959c.391.391.391 1.023 0 1.414s-1.023.391-1.414 0l-4.959-4.959C14.065 18.27 12.236 19 10.25 19c-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
                        <span>Search</span>
                    </div>

                    {/* Trends */}
                    <div className="bg-zinc-900 rounded-2xl p-4">
                        <h3 className="text-xl font-bold mb-4 px-2">Trends for you</h3>
                        {trends.map((trend, i) => (
                            <div key={i} className="py-3 px-2 hover:bg-white/5 transition-colors rounded-lg cursor-pointer">
                                <p className="text-xs text-zinc-500">{trend.category}</p>
                                <p className="font-bold text-white mt-0.5">{trend.name}</p>
                                <p className="text-xs text-zinc-500 mt-0.5">{trend.posts}</p>
                            </div>
                        ))}
                        <div className="text-blue-400 text-sm px-2 mt-4 cursor-pointer hover:underline">Show more</div>
                    </div>

                    {/* Who to follow */}
                    <div className="bg-zinc-900 rounded-2xl p-4">
                        <h3 className="text-xl font-bold mb-4 px-2">Who to follow</h3>
                        <div className="flex items-center justify-between py-3 px-2 hover:bg-white/5 transition-colors rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </div>
                                <div>
                                    <p className="font-bold hover:underline">GitHub</p>
                                    <p className="text-zinc-500 text-sm">@github</p>
                                </div>
                            </div>
                            <button className="bg-white text-black px-4 py-1.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors">
                                Follow
                            </button>
                        </div>
                    </div>

                    <div className="text-xs text-zinc-500 px-4 leading-relaxed">
                        Terms of Service Privacy Policy Cookie Policy Accessibility Ads info More © 2025 Aditya Khalkar
                    </div>
                </div>
            </div>
        </section>
    );
}

function Post({ project }: { project: any }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(project.likes);

    const handleLike = () => {
        if (liked) {
            setLikeCount((prev: number) => prev - 1);
        } else {
            setLikeCount((prev: number) => prev + 1);
        }
        setLiked(!liked);
    };

    return (
        <article className="border-b border-zinc-800 p-4 hover:bg-zinc-900/30 transition-colors cursor-pointer">
            {project.pinned && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold mb-2 ml-12">
                    <Pin className="w-3 h-3 fill-current" />
                    <span>Pinned</span>
                </div>
            )}

            <div className="flex gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden relative border border-zinc-800">
                        <Image
                            src="/pfp.png"
                            alt="Aditya Khalkar"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm flex-wrap">
                            <span className="font-bold text-white hover:underline">Aditya Khalkar</span>
                            <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400/10" />
                            <span className="text-zinc-500">@adityakhalkar</span>
                            <span className="text-zinc-500">·</span>
                            <span className="text-zinc-500 hover:underline">{project.timestamp}</span>
                        </div>
                        <button className="text-zinc-500 hover:text-blue-400 rounded-full p-2 hover:bg-blue-500/10 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Text */}
                    <p className="text-white text-[15px] mt-1 whitespace-pre-wrap leading-normal">
                        {project.description}
                    </p>

                    {/* Image */}
                    <div className="mt-3 rounded-2xl overflow-hidden border border-zinc-800 relative aspect-video group">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                            <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                View Project <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-3 text-zinc-500 max-w-md">
                        <button className="group flex items-center gap-2 hover:text-blue-400 transition-colors">
                            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                            </div>
                            <span className="text-xs group-hover:text-blue-400">{project.comments}</span>
                        </button>

                        <button className="group flex items-center gap-2 hover:text-green-400 transition-colors">
                            <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                                <Repeat2 className="w-4 h-4" />
                            </div>
                            <span className="text-xs group-hover:text-green-400">{project.retweets}</span>
                        </button>

                        <button
                            onClick={handleLike}
                            className={`group flex items-center gap-2 transition-colors ${liked ? "text-pink-600" : "hover:text-pink-600"}`}
                        >
                            <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors relative">
                                <AnimatePresence>
                                    {liked && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1.5 }}
                                            exit={{ scale: 0 }}
                                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                        >
                                            <Heart className="w-4 h-4 fill-pink-600 text-pink-600" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <Heart className={`w-4 h-4 ${liked ? "fill-pink-600" : ""}`} />
                            </div>
                            <span className="text-xs group-hover:text-pink-600">{likeCount}</span>
                        </button>

                        <button className="group flex items-center gap-2 hover:text-blue-400 transition-colors">
                            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                <BarChart2 className="w-4 h-4" />
                            </div>
                            <span className="text-xs group-hover:text-blue-400">{project.views}</span>
                        </button>

                        <button className="group flex items-center gap-2 hover:text-blue-400 transition-colors">
                            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                <Share className="w-4 h-4" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
