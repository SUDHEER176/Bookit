import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Highway Delite" className="h-12" />
        </Link>

        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md mx-4">
          <Input
            type="text"
            placeholder="Search experiences"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-muted/50 border-0"
          />
          <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
            Search
          </Button>
        </form>
      </div>
    </header>
  );
};
