import { useState, useEffect } from "react";
import { ShoppingBag, Plus, Sparkles, Trash2, Grid3x3, LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { wardrobeApi } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  color: string;
  season: string;
  image: string;
  timesWorn: number;
}

export function Wardrobe() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form state
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemColor, setNewItemColor] = useState("");
  const [newItemSeason, setNewItemSeason] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    loadWardrobe();
  }, [isAuthenticated, navigate]);

  const loadWardrobe = async () => {
    try {
      setLoading(true);
      const response = await wardrobeApi.getAll();
      setItems(response.items || []);
    } catch (error: any) {
      console.error('Error loading wardrobe:', error);
      toast.error(error.message || 'Failed to load wardrobe');
      if (error.status === 401) {
        navigate('/auth');
      }
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!newItemName || !newItemCategory) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      // Use a placeholder image for now
      const placeholderImages = [
        "https://images.unsplash.com/photo-1620777888789-0ee95b57a277?w=400",
        "https://images.unsplash.com/photo-1595137976825-b906534240a5?w=400",
        "https://images.unsplash.com/photo-1768289222368-62cbdfe7d5f5?w=400",
      ];
      
      const newItem = {
        name: newItemName,
        category: newItemCategory,
        color: newItemColor || "Multi",
        season: newItemSeason || "All Season",
        image: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
        timesWorn: 0,
      };

      const response = await wardrobeApi.add(newItem);
      setItems([...items, response.item]);
      toast.success('Item added to wardrobe!');
      
      // Reset form
      setNewItemName("");
      setNewItemCategory("");
      setNewItemColor("");
      setNewItemSeason("");
      setDialogOpen(false);
    } catch (error: any) {
      console.error('Error adding item:', error);
      toast.error(error.message || 'Failed to add item');
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await wardrobeApi.delete(id);
      setItems(items.filter((item) => item.id !== id));
      toast.success('Item removed from wardrobe');
    } catch (error: any) {
      console.error('Error deleting item:', error);
      toast.error(error.message || 'Failed to delete item');
    }
  };

  const [suggestions] = useState([
    {
      id: "s1",
      title: "Classic Work Combo",
      items: ["Black Blazer", "White T-Shirt", "Blue Denim Jeans"],
      occasion: "Business Casual",
    },
    {
      id: "s2",
      title: "Weekend Chic",
      items: ["White T-Shirt", "Blue Denim Jeans", "Stylish Jacket"],
      occasion: "Casual",
    },
    {
      id: "s3",
      title: "Evening Elegance",
      items: ["Elegant Dress", "Statement Accessories"],
      occasion: "Formal",
    },
  ]);

  const categories = ["All", "Outerwear", "Tops", "Bottoms", "Dresses", "Sets"];

  const stats = {
    totalItems: items.length,
    mostWorn: items.length > 0 ? items.reduce((max, item) => (item.timesWorn > max.timesWorn ? item : max), items[0]) : null,
    leastWorn: items.length > 0 ? items.reduce((min, item) => (item.timesWorn < min.timesWorn ? item : min), items[0]) : null,
    categories: [...new Set(items.map((item) => item.category))].length,
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading your wardrobe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
            >
              <ShoppingBag className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-600 font-medium">My Wardrobe</span>
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">Your Fashion Collection</h1>
            <p className="text-xl text-gray-600">
              Organize your wardrobe and get AI-powered styling suggestions
            </p>
          </div>

          <div className="flex gap-3">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="name">Item Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g., Blue Denim Jacket" 
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Outerwear">Outerwear</SelectItem>
                        <SelectItem value="Tops">Tops</SelectItem>
                        <SelectItem value="Bottoms">Bottoms</SelectItem>
                        <SelectItem value="Dresses">Dresses</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input 
                      id="color" 
                      placeholder="e.g., Navy Blue" 
                      value={newItemColor}
                      onChange={(e) => setNewItemColor(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="season">Season</Label>
                    <Select value={newItemSeason} onValueChange={setNewItemSeason}>
                      <SelectTrigger id="season">
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Season">All Season</SelectItem>
                        <SelectItem value="Spring">Spring</SelectItem>
                        <SelectItem value="Summer">Summer</SelectItem>
                        <SelectItem value="Fall">Fall</SelectItem>
                        <SelectItem value="Winter">Winter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={addItem} className="w-full">Add to Wardrobe</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {stats.totalItems}
                </div>
                <p className="text-sm text-gray-600">Total Items</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-pink-600 mb-1">
                  {stats.categories}
                </div>
                <p className="text-sm text-gray-600">Categories</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-blue-600 mb-1 truncate">
                  {stats.mostWorn?.name}
                </div>
                <p className="text-sm text-gray-600">Most Worn ({stats.mostWorn?.timesWorn}x)</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-orange-600 mb-1 truncate">
                  {stats.leastWorn?.name}
                </div>
                <p className="text-sm text-gray-600">Needs Love ({stats.leastWorn?.timesWorn}x)</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Wardrobe Items */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto mb-6">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <AnimatePresence mode="wait">
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid md:grid-cols-2 gap-4"
                          : "space-y-4"
                      }
                    >
                      {items
                        .filter((item) => category === "All" || item.category === category)
                        .map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                              {viewMode === "grid" ? (
                                <>
                                  <div className="relative h-48">
                                    <ImageWithFallback
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2">
                                      <Button
                                        size="icon"
                                        variant="secondary"
                                        className="bg-white/90 backdrop-blur-sm hover:bg-white"
                                        onClick={() => deleteItem(item.id)}
                                      >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                      </Button>
                                    </div>
                                  </div>
                                  <CardContent className="p-4">
                                    <h3 className="font-semibold mb-2">{item.name}</h3>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {item.category}
                                      </Badge>
                                      <Badge variant="outline" className="text-xs">
                                        {item.color}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                      <span>{item.season}</span>
                                      <span>Worn {item.timesWorn}x</span>
                                    </div>
                                  </CardContent>
                                </>
                              ) : (
                                <div className="flex gap-4 p-4">
                                  <div className="w-24 h-24 flex-shrink-0">
                                    <ImageWithFallback
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover rounded"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold mb-2">{item.name}</h3>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {item.category}
                                      </Badge>
                                      <Badge variant="outline" className="text-xs">
                                        {item.color}
                                      </Badge>
                                      <Badge variant="outline" className="text-xs">
                                        {item.season}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      Worn {item.timesWorn} times
                                    </p>
                                  </div>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => deleteItem(item.id)}
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </Button>
                                </div>
                              )}
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  </AnimatePresence>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* AI Suggestions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-semibold">AI Outfit Suggestions</h3>
                </div>

                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100"
                    >
                      <h4 className="font-semibold mb-2">{suggestion.title}</h4>
                      <Badge variant="secondary" className="mb-3">
                        {suggestion.occasion}
                      </Badge>
                      <ul className="space-y-1">
                        {suggestion.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-purple-600">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get More Suggestions
                </Button>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>Tip:</strong> Items worn less than 5 times might need styling suggestions!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}