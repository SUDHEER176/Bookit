import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ExperienceCard } from "@/components/ExperienceCard";
import { getExperiences, handleApiError } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [allExperiences, setAllExperiences] = useState<any[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getExperiences();
        // Ensure no duplicate cards by id
        const uniqueById = Array.from(new Map(data.map((exp: any) => [exp.id, exp])).values());
        if (!mounted) return;
        setAllExperiences(uniqueById);
        setFilteredExperiences(uniqueById);
        setIsLoading(false);
      } catch (e) {
        const message = handleApiError(e);
        toast({ title: "Failed to load experiences", description: message, variant: "destructive" });
        setAllExperiences([]);
        setFilteredExperiences([]);
        setIsLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allExperiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExperiences(filtered);
    } else {
      setFilteredExperiences(allExperiences);
    }
  }, [searchQuery, allExperiences]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 md:px-8 py-8">
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Search results for "{searchQuery}"
            </h2>
            <p className="text-muted-foreground">
              Found {filteredExperiences.length} experience{filteredExperiences.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full h-40 rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
        {filteredExperiences.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No experiences found</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
