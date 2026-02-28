import { useState } from "react";
import { Image, Upload, Sparkles, Download, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AnalysisResult {
  styleProfile: {
    primary: string;
    secondary: string;
    confidence: number;
  };
  colors: Array<{ name: string; percentage: number; hex: string }>;
  items: Array<{ name: string; category: string }>;
  suggestions: string[];
  rating: number;
}

export function StyleAnalyzer() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysis({
        styleProfile: {
          primary: "Contemporary Chic",
          secondary: "Minimalist",
          confidence: 94,
        },
        colors: [
          { name: "Black", percentage: 45, hex: "#000000" },
          { name: "White", percentage: 30, hex: "#FFFFFF" },
          { name: "Beige", percentage: 15, hex: "#D4C5B9" },
          { name: "Gray", percentage: 10, hex: "#808080" },
        ],
        items: [
          { name: "Blazer", category: "Outerwear" },
          { name: "T-shirt", category: "Top" },
          { name: "Jeans", category: "Bottom" },
          { name: "Sneakers", category: "Footwear" },
        ],
        suggestions: [
          "Add a statement accessory like a watch or bracelet to elevate the look",
          "Consider a different shoe style for more formal occasions",
          "The color palette is versatile and works for multiple settings",
          "Try layering with a scarf or cardigan for added dimension",
        ],
        rating: 8.5,
      });
      setAnalyzing(false);
    }, 2000);
  };

  const sampleImages = [
    "https://images.unsplash.com/photo-1620777888789-0ee95b57a277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBvdXRmaXR8ZW58MXx8fHwxNzcyMTkxOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1768289222368-62cbdfe7d5f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwd29tYW4lMjBjbG90aGluZ3xlbnwxfHx8fDE3NzIyMTA2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1771736823376-5b1447f1e5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZHklMjBmYXNoaW9uJTIwc3RyZWV0JTIwc3R5bGV8ZW58MXx8fHwxNzcyMjEwNjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  const useSampleImage = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    analyzeImage();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4"
          >
            <Image className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">AI Style Analyzer</span>
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Analyze Your Style</h1>
          <p className="text-xl text-gray-600">
            Upload a photo and get instant AI-powered styling insights and recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <Card className="h-full">
              <CardContent className="p-6">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="upload">Upload Image</TabsTrigger>
                    <TabsTrigger value="samples">Try Samples</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload">
                    <div className="space-y-6">
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-gray-50 hover:bg-gray-100"
                      >
                        {uploadedImage ? (
                          <div className="relative w-full h-full">
                            <ImageWithFallback
                              src={uploadedImage}
                              alt="Uploaded outfit"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {analyzing && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                <div className="text-white text-center">
                                  <Wand2 className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                                  <p>Analyzing your style...</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-700 mb-2">
                              Upload an outfit photo
                            </p>
                            <p className="text-sm text-gray-500">
                              PNG, JPG up to 10MB
                            </p>
                          </div>
                        )}
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />

                      {uploadedImage && (
                        <Button
                          onClick={() => {
                            setUploadedImage(null);
                            setAnalysis(null);
                          }}
                          variant="outline"
                          className="w-full"
                        >
                          Upload Different Image
                        </Button>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="samples">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Try analyzing these sample outfits:
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {sampleImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => useSampleImage(image)}
                            className="relative h-32 rounded-lg overflow-hidden hover:ring-2 ring-purple-500 transition-all"
                          >
                            <ImageWithFallback
                              src={image}
                              alt={`Sample ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div>
            {analysis ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Style Profile */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Style Profile</h3>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                        {analysis.styleProfile.confidence}% Match
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Primary Style</span>
                          <span className="text-gray-600">{analysis.styleProfile.primary}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Secondary Style</span>
                          <span className="text-gray-600">{analysis.styleProfile.secondary}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Overall Rating</span>
                          <span className="text-purple-600 font-semibold">
                            {analysis.rating}/10
                          </span>
                        </div>
                        <Progress value={analysis.rating * 10} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Color Analysis */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Color Analysis</h3>
                    <div className="space-y-3">
                      {analysis.colors.map((color, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full border-2 border-gray-200"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span className="font-medium">{color.name}</span>
                            </div>
                            <span className="text-gray-600">{color.percentage}%</span>
                          </div>
                          <Progress value={color.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Detected Items */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Detected Items</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {analysis.items.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Suggestions */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <h3 className="text-xl font-semibold">AI Suggestions</h3>
                    </div>
                    <ul className="space-y-3">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-purple-600 font-bold">•</span>
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Analysis Report
                </Button>
              </motion.div>
            ) : (
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[500px]">
                  <Image className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-500 text-center">
                    Upload an image or try a sample to see AI-powered style analysis
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
