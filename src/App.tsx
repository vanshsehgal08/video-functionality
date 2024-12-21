import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import HomeButton from "./components/ui/HomeButton";
import { SearchBar } from "./components/SearchBar";
import { VideoList } from "./components/VideoList";
import { VideoResult } from "./types";
import { processQuery } from "./services/gemini";
import { searchVideos } from "./services/youtube";
import { Youtube } from "lucide-react";
// import Home from './pages/Home';
import AiAssistant from "./pages/AiAssistant";
import Videos from "./pages/Videos";
import Calculator from "./pages/Calculator";
import Quiz from "./pages/Quiz";
import News from "./pages/News";
import { Leaf } from "lucide-react";

export default function App() {
    const [videos, setVideos] = useState<VideoResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (query: string) => {
        setIsLoading(true);
        setError(null);

        try {
            // Process query with Gemini
            const searchTerms = await processQuery(query);

            // Search YouTube with processed terms
            const { results, error: searchError } = await searchVideos(
                searchTerms
            );

            if (searchError) {
                throw new Error(searchError);
            }

            setVideos(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setVideos([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Router>
            <PageLayout>
                <div className="min-h-screen bg-gray-100 flex flex-col">
                    <main className="flex-grow container mx-auto px-4 py-8">
                        {/* Centered Header */}
                        <div className="flex flex-col items-center justify-center h-[50vh]">
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <Leaf className="w-10 h-10 text-green-600" />
                                </div>
                                <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
                                    EcoSearch
                                </h1>
                                <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center leading-relaxed font-serif">
                                    Get ready to explore the most impactful
                                    YouTube video timestamps on the environment,
                                    climate change, and sustainability. Find
                                    exactly what you need, when you need it,
                                    with quick, easy access to the most relevant
                                    content. Whether you're looking for
                                    actionable tips, mind-blowing facts, or
                                    eye-opening insights — we've got you
                                    covered!
                                </p>
                            </div>
                        </div>

                        {/* Search Box and Results */}
                        <div className="flex flex-col items-center space-y-8">
                            <SearchBar
                                onSearch={handleSearch}
                                isLoading={isLoading}
                            />

                            {isLoading && (
                                <div className="text-gray-600">
                                    Processing your request...
                                </div>
                            )}

                            {error && (
                                <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {videos.length > 0 && <VideoList videos={videos} />}
                        </div>
                    </main>
                </div>

                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/ai-assistant" element={<AiAssistant />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/news" element={<News />} />
                </Routes>

                <HomeButton />
            </PageLayout>
        </Router>
    );
}
