import { TrendingUp, Sparkles, ArrowUpRight, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Trend {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  popularity: number;
  timeframe: string;
  tags: string[];
}

export function TrendInsights() {
  const trends: Trend[] = [
    {
      id: "1",
      title: "Oversized Blazers",
      description: "Structured yet relaxed oversized blazers are dominating the fashion scene. Perfect for creating a powerful silhouette with comfort.",
      image: "https://images.unsplash.com/photo-1770364019396-36ae51854520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGF0dGlyZXxlbnwxfHx8fDE3NzIxMTk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Outerwear",
      popularity: 95,
      timeframe: "Spring 2026",
      tags: ["Professional", "Versatile", "Statement"],
    },
    {
      id: "2",
      title: "Monochromatic Looks",
      description: "Single-color outfits are making a bold statement. This trend emphasizes sophistication and effortless style coordination.",
      image: "https://images.unsplash.com/photo-1768289222368-62cbdfe7d5f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwd29tYW4lMjBjbG90aGluZ3xlbnwxfHx8fDE3NzIyMTA2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Style",
      popularity: 88,
      timeframe: "Spring 2026",
      tags: ["Minimalist", "Chic", "Easy"],
    },
    {
      id: "3",
      title: "Elevated Athleisure",
      description: "The fusion of athletic wear with luxury materials continues to evolve. Comfort meets high fashion in this enduring trend.",
      image: "https://images.unsplash.com/photo-1595137976825-b906534240a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBvdXRmaXQlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzcyMjEwNjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Casual",
      popularity: 92,
      timeframe: "Year-round",
      tags: ["Comfortable", "Modern", "Active"],
    },
    {
      id: "4",
      title: "Statement Sleeves",
      description: "Dramatic sleeves with volume and unique shapes are adding architectural interest to everyday outfits.",
      image: "https://images.unsplash.com/photo-1761574028262-6d834741bfd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBmYXNoaW9ufGVufDF8fHx8MTc3MjE2NzgyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Details",
      popularity: 82,
      timeframe: "Spring 2026",
      tags: ["Dramatic", "Feminine", "Bold"],
    },
    {
      id: "5",
      title: "Sustainable Fashion",
      description: "Eco-friendly materials and ethical production methods are becoming fashion standards, not just trends.",
      image: "https://images.unsplash.com/photo-1620777888789-0ee95b57a277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBvdXRmaXR8ZW58MXx8fHwxNzcyMTkxOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Movement",
      popularity: 96,
      timeframe: "Ongoing",
      tags: ["Eco-friendly", "Conscious", "Future"],
    },
    {
      id: "6",
      title: "Y2K Revival",
      description: "Early 2000s aesthetics are back with a modern twist. Think low-rise jeans, baby tees, and metallic accents.",
      image: "https://images.unsplash.com/photo-1771736823376-5b1447f1e5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZHklMjBmYXNoaW9uJTIwc3RyZWV0JTIwc3R5bGV8ZW58MXx8fHwxNzcyMjEwNjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Retro",
      popularity: 85,
      timeframe: "Spring/Summer 2026",
      tags: ["Nostalgic", "Playful", "Trendy"],
    },
  ];

  const categories = ["All", "Outerwear", "Style", "Casual", "Details", "Movement", "Retro"];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full mb-4"
          >
            <TrendingUp className="w-4 h-4 text-pink-600" />
            <span className="text-sm text-pink-600 font-medium">AI Trend Insights</span>
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Fashion Trends 2026</h1>
          <p className="text-xl text-gray-600">
            Stay ahead with AI-curated fashion trends and insights
          </p>
        </div>

        {/* Trending Now Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-2xl font-semibold">Trending This Week</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <ArrowUpRight className="w-8 h-8" />
                  <div>
                    <p className="text-3xl font-bold">+32%</p>
                    <p className="text-sm opacity-90">Oversized Blazers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowUpRight className="w-8 h-8" />
                  <div>
                    <p className="text-3xl font-bold">+28%</p>
                    <p className="text-sm opacity-90">Sustainable Fashion</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowUpRight className="w-8 h-8" />
                  <div>
                    <p className="text-3xl font-bold">+24%</p>
                    <p className="text-sm opacity-90">Monochrome Outfits</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Tabs */}
        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trends
                  .filter((trend) => category === "All" || trend.category === category)
                  .map((trend, index) => (
                    <motion.div
                      key={trend.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                        <div className="relative h-64">
                          <ImageWithFallback
                            src={trend.image}
                            alt={trend.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {trend.popularity}%
                            </Badge>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <Badge variant="secondary" className="mb-2">
                              {trend.category}
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{trend.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {trend.description}
                          </p>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Clock className="w-4 h-4" />
                            <span>{trend.timeframe}</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {trend.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Popularity Bar */}
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">Popularity</span>
                              <span className="font-medium text-purple-600">
                                {trend.popularity}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${trend.popularity}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">AI Fashion Forecast</h3>
                  <p className="text-gray-600 mb-4">
                    Based on current trend analysis, we predict the following will dominate fashion in the coming months:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        <strong>Sustainable materials</strong> will continue to grow, with a 45% increase in eco-conscious fashion choices
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        <strong>Oversized silhouettes</strong> remain strong, offering both comfort and statement-making style
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        <strong>Color blocking</strong> and monochromatic looks will be key styling techniques this season
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        <strong>Nostalgia-driven fashion</strong> from the early 2000s continues its comeback with modern refinements
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
