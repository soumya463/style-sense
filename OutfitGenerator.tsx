import { useState } from "react";
import { Sparkles, RefreshCw, Heart, Share2, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OutfitSuggestion {
  id: string;
  title: string;
  items: string[];
  image: string;
  style: string;
  occasion: string;
  confidence: number;
  colors: string[];
}

export function OutfitGenerator() {
  const [occasion, setOccasion] = useState("casual");
  const [style, setStyle] = useState("modern");
  const [season, setSeason] = useState("spring");
  const [formality, setFormality] = useState([50]);
  const [generating, setGenerating] = useState(false);
  const [outfits, setOutfits] = useState<OutfitSuggestion[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const mockOutfits: Record<string, OutfitSuggestion[]> = {
    casual: [
      {
        id: "1",
        title: "Relaxed Weekend Look",
        items: ["White cotton t-shirt", "Light blue denim jeans", "White sneakers", "Leather crossbody bag"],
        image: "https://images.unsplash.com/photo-1595137976825-b906534240a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBvdXRmaXQlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzcyMjEwNjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        style: "Casual",
        occasion: "Weekend",
        confidence: 95,
        colors: ["White", "Blue", "Brown"],
      },
      {
        id: "2",
        title: "Street Style Chic",
        items: ["Oversized hoodie", "Black joggers", "High-top sneakers", "Baseball cap"],
        image: "https://images.unsplash.com/photo-1771736823376-5b1447f1e5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZHklMjBmYXNoaW9uJTIwc3RyZWV0JTIwc3R5bGV8ZW58MXx8fHwxNzcyMjEwNjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        style: "Street",
        occasion: "Casual",
        confidence: 92,
        colors: ["Black", "Gray", "White"],
      },
    ],
    formal: [
      {
        id: "3",
        title: "Business Professional",
        items: ["Navy blazer", "White dress shirt", "Gray trousers", "Black leather oxfords", "Leather briefcase"],
        image: "https://images.unsplash.com/photo-1770364019396-36ae51854520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGF0dGlyZXxlbnwxfHx8fDE3NzIxMTk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        style: "Professional",
        occasion: "Business",
        confidence: 98,
        colors: ["Navy", "White", "Gray"],
      },
      {
        id: "4",
        title: "Elegant Evening",
        items: ["Black cocktail dress", "Strappy heels", "Statement necklace", "Clutch bag"],
        image: "https://images.unsplash.com/photo-1761574028262-6d834741bfd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBmYXNoaW9ufGVufDF8fHx8MTc3MjE2NzgyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        style: "Elegant",
        occasion: "Evening",
        confidence: 96,
        colors: ["Black", "Gold"],
      },
    ],
    party: [
      {
        id: "5",
        title: "Party Ready",
        items: ["Sequined top", "Black leather pants", "Ankle boots", "Statement earrings"],
        image: "https://images.unsplash.com/photo-1768289222368-62cbdfe7d5f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwd29tYW4lMjBjbG90aGluZ3xlbnwxfHx8fDE3NzIyMTA2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        style: "Glamorous",
        occasion: "Party",
        confidence: 94,
        colors: ["Black", "Silver", "Gold"],
      },
    ],
  };

  const generateOutfits = () => {
    setGenerating(true);
    setTimeout(() => {
      const selectedOutfits = mockOutfits[occasion] || mockOutfits.casual;
      setOutfits(selectedOutfits);
      setGenerating(false);
    }, 1500);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-600 font-medium">AI-Powered Outfit Generator</span>
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Create Your Perfect Outfit</h1>
          <p className="text-xl text-gray-600">
            Tell us your preferences and let AI generate personalized outfit recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label className="mb-2 block">Occasion</Label>
                  <Select value={occasion} onValueChange={setOccasion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="party">Party</SelectItem>
                      <SelectItem value="date">Date Night</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="workout">Workout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Style Preference</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="bohemian">Bohemian</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="streetwear">Streetwear</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Season</Label>
                  <Select value={season} onValueChange={setSeason}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-4 block">
                    Formality Level: {formality[0]}%
                  </Label>
                  <Slider
                    value={formality}
                    onValueChange={setFormality}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Casual</span>
                    <span>Formal</span>
                  </div>
                </div>

                <Button
                  onClick={generateOutfits}
                  disabled={generating}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Outfits
                    </>
                  )}
                </Button>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>AI Tips:</strong> Try different combinations of occasion and style for unique recommendations!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {outfits.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[600px] bg-white rounded-lg border-2 border-dashed border-gray-300"
                >
                  <Sparkles className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Ready to Generate Outfits
                  </h3>
                  <p className="text-gray-500">
                    Adjust your preferences and click "Generate Outfits"
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {outfits.map((outfit, index) => (
                    <motion.div
                      key={outfit.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="relative h-[400px] md:h-auto">
                            <ImageWithFallback
                              src={outfit.image}
                              alt={outfit.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                              <Button
                                size="icon"
                                variant="secondary"
                                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                                onClick={() => toggleFavorite(outfit.id)}
                              >
                                <Heart
                                  className={`w-5 h-5 ${
                                    favorites.has(outfit.id)
                                      ? "fill-red-500 text-red-500"
                                      : "text-gray-600"
                                  }`}
                                />
                              </Button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                              <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                                {outfit.confidence}% AI Match
                              </Badge>
                            </div>
                          </div>

                          <CardContent className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">{outfit.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="outline">{outfit.style}</Badge>
                              <Badge variant="outline">{outfit.occasion}</Badge>
                            </div>

                            <div className="mb-4">
                              <h4 className="font-semibold mb-2">Outfit Items:</h4>
                              <ul className="space-y-2">
                                {outfit.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-purple-600 mt-1">•</span>
                                    <span className="text-gray-700">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mb-6">
                              <h4 className="font-semibold mb-2">Color Palette:</h4>
                              <div className="flex gap-2">
                                {outfit.colors.map((color, i) => (
                                  <Badge key={i} variant="secondary">
                                    {color}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Download className="w-4 h-4 mr-2" />
                                Save
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
