// src/pages/Mosaics.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { List, Grid, Plus, Sun, Moon, Search } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { useModalStore } from "@/store/useModalStore"; // Import Zustand store for modal state
import CreateMosaicModal from "@/components/CreateMosaicModal"; // Import Create Mosaic Modal
import { useNavigate } from "react-router-dom"; // Use to navigate to different routes

const Mosaics: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const openCreateMosaicModal = useModalStore((state) => state.openCreateMosaicModal); // Open modal function from Zustand
  const navigate = useNavigate(); // Initialize navigation hook

  const handleViewEdit = (graphId: string) => {
    navigate(`/graph/${graphId}`); // Navigate to GraphEditorPage with the graphId
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} py-4 px-8`}>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        {/* Hamburger Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300">
              <span className="sr-only">Open Menu</span>
              <List className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => console.log("Go to Mosaics")}>
              Mosaics
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Go to Global View")}>
              Global View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Go to User Settings")}>
              User Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Logging out...")}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Page Title */}
        <h1 className="text-2xl font-bold dark:text-white">Mosaics</h1>

        {/* Light/Dark Mode Toggle */}
        <Button variant="ghost" className="text-gray-600 dark:text-gray-300" onClick={toggleTheme}>
          {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center justify-between mb-6">
        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <Input type="text" placeholder="Search mosaics..." className="w-64" />
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Filters</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Date Created</DropdownMenuItem>
              <DropdownMenuItem>Last Modified</DropdownMenuItem>
              <DropdownMenuItem>Tags</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" className="text-gray-600">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Grid/List Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-5 w-5" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            onClick={() => setViewMode("list")}
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mosaics Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Graph Title {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {/* Updated View/Edit Button */}
                <Button variant="link" onClick={() => handleViewEdit(`graph${index + 1}`)}>
                  View/Edit
                </Button>
                <Button variant="link">More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {[...Array(8)].map((_, index) => (
            <Card
              key={index}
              className="flex items-center p-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md mr-4"></div>
              <div className="flex-1">
                <h3 className="text-lg font-bold dark:text-white">Graph Title {index + 1}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last modified: X days ago
                </div>
              </div>
              {/* Updated View/Edit Button */}
              <Button variant="link" className="ml-4" onClick={() => handleViewEdit(`graph${index + 1}`)}>
                View/Edit
              </Button>
              <Button variant="link">More</Button>
            </Card>
          ))}
        </div>
      )}

      {/* Create New Mosaic Button */}
      <Button
        variant="default"
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg"
        onClick={openCreateMosaicModal} // Open modal on button click
      >
        <p>Create New Mosaic</p>
        <Plus className="h-6 w-6" />
      </Button>

      {/* Create New Mosaic Modal */}
      <CreateMosaicModal />
    </div>
  );
};

export default Mosaics;
