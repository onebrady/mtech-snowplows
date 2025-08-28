import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import type { KnowledgeSection } from "@/content/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
// Accordion components available but not used in this implementation
import { Separator } from "@/components/ui/separator";
import { GroupedQA, JumpNav } from "./GroupedQA";
import { LaneCoverageEstimator } from "../microtools/LaneCoverageEstimator";
import { SaltUsageCalculator } from "../microtools/SaltUsageCalculator";
import { Checklist } from "../shared/Checklist";
import { FactCard } from "../shared/FactCard";
import { emitAnalytics } from "../../lib/analytics";

// Lazy-loaded component for section content to improve performance
function LazyContentRenderer({ section }: { section: KnowledgeSection }) {
  return (
    <div className="space-y-6">
      {/* Jump Navigation */}
      {section.groups && section.groups.length > 0 && (
        <JumpNav groups={section.groups} />
      )}
      
      {/* Q&As */}
      {section.groups && section.groups.length > 0 ? (
        <GroupedQA groups={section.groups} items={section.qas} />
      ) : (
        <div className="space-y-4">
          {section.qas.map((qa) => (
            <Card key={qa.id}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{qa.question}</h3>
                <div 
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: qa.answer }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Microtools */}
      {section.hasSaltUsageTool && (
        <Card>
          <CardHeader>
            <CardTitle>Salt Usage Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <SaltUsageCalculator />
          </CardContent>
        </Card>
      )}
      
      {section.hasLaneCoverageTool && (
        <Card>
          <CardHeader>
            <CardTitle>Lane Coverage Estimator</CardTitle>
          </CardHeader>
          <CardContent>
            <LaneCoverageEstimator />
          </CardContent>
        </Card>
      )}
      
      {/* Fact Cards */}
      {section.factCardTitle && section.factCardBullets && (
        <FactCard 
          title={section.factCardTitle}
          bullets={section.factCardBullets}
        />
      )}
      
      {/* Checklists */}
      {section.checklist && (
        <Checklist 
          title={section.checklist.title}
          items={section.checklist.items}
        />
      )}
      
      {/* Downloads */}
      {section.downloads && section.downloads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {section.downloads.map((download, downloadIndex) => (
                <a
                  key={downloadIndex}
                  href={download.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 border rounded-md hover:bg-muted/50 transition-colors"
                  onClick={() => emitAnalytics("download_click", { 
                    section: section.slug, 
                    download: download.label 
                  })}
                >
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center mr-3">
                    <span className="text-red-600 text-xs font-bold">PDF</span>
                  </div>
                  <span className="font-medium text-sm">{download.label}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface SinglePageKnowledgeProps {
  sections: KnowledgeSection[];
  loading?: boolean;
}

export function SinglePageKnowledge({ sections, loading = false }: SinglePageKnowledgeProps) {
  // State with localStorage persistence
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('knowledge-search-query') || '';
    }
    return '';
  });
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('knowledge-expanded-sections');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [activeSection, setActiveSection] = useState<string>("");

  // Handle URL hash changes for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove # symbol
      if (hash && sections.some(section => section.slug === hash)) {
        scrollToSection(hash);
      }
    };

    // Handle initial hash on mount
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [sections]);

  // Persist search query to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('knowledge-search-query', searchQuery);
    }
  }, [searchQuery]);

  // Persist expanded sections to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('knowledge-expanded-sections', JSON.stringify(expandedSections));
    }
  }, [expandedSections]);

  // Analytics for search queries
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const timeoutId = setTimeout(() => {
        const resultCount = filteredSections.reduce((total, section) => total + section.qas.length, 0);
        emitAnalytics("search_query", {
          query: searchQuery,
          result_count: resultCount,
          sections_found: filteredSections.length
        });
      }, 500); // Debounce search analytics

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, filteredSections]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      
      // Escape to clear search
      if (event.key === 'Escape' && searchQuery) {
        setSearchQuery('');
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.blur();
        }
      }
      
      // Arrow keys for section navigation (when not focused on input)
      if (!event.target || (event.target as HTMLElement).tagName !== 'INPUT') {
        const currentIndex = sections.findIndex(section => section.slug === activeSection);
        
        if (event.key === 'ArrowUp' && currentIndex > 0) {
          event.preventDefault();
          scrollToSection(sections[currentIndex - 1].slug);
        } else if (event.key === 'ArrowDown' && currentIndex < sections.length - 1) {
          event.preventDefault();
          scrollToSection(sections[currentIndex + 1].slug);
        }
        
        // Enter to toggle current section
        if (event.key === 'Enter' && activeSection) {
          event.preventDefault();
          toggleSection(activeSection);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, activeSection, sections]);

  // Filter sections and Q&As based on search
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    
    return sections.map(section => {
      const filteredQAs = section.qas.filter(qa => 
        qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return {
        ...section,
        qas: filteredQAs,
        groups: section.groups?.map(group => ({
          ...group,
          qaIds: group.qaIds.filter(qaId => 
            filteredQAs.some(qa => qa.id === qaId)
          )
        })).filter(group => group.qaIds.length > 0) || []
      };
    }).filter(section => section.qas.length > 0);
  }, [sections, searchQuery]);

  // Calculate total Q&As for each section
  const sectionStats = useMemo(() => 
    sections.reduce((acc, section) => {
      acc[section.slug] = section.qas.length;
      return acc;
    }, {} as Record<string, number>),
    [sections]
  );

  // Handle section expansion with analytics
  const toggleSection = (sectionSlug: string) => {
    const isCurrentlyExpanded = expandedSections.includes(sectionSlug);
    const action = isCurrentlyExpanded ? "collapse" : "expand";
    
    setExpandedSections(prev => 
      isCurrentlyExpanded
        ? prev.filter(slug => slug !== sectionSlug)
        : [...prev, sectionSlug]
    );
    
    // Enhanced analytics tracking
    emitAnalytics("section_toggle", { 
      slug: sectionSlug, 
      action,
      total_expanded: isCurrentlyExpanded ? expandedSections.length - 1 : expandedSections.length + 1,
      search_active: !!searchQuery
    });
  };

  // Scroll to section with URL hash update
  const scrollToSection = (sectionSlug: string) => {
    const element = document.getElementById(`section-${sectionSlug}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionSlug);
      if (!expandedSections.includes(sectionSlug)) {
        toggleSection(sectionSlug);
      }
      // Update URL hash without triggering navigation
      if (window.location.hash !== `#${sectionSlug}`) {
        window.history.replaceState(null, '', `#${sectionSlug}`);
      }
    }
  };

  // Sticky navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionSlug = entry.target.id.replace('section-', '');
            setActiveSection(sectionSlug);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25] }
    );

    const sectionElements = sections
      .map(section => document.getElementById(`section-${section.slug}`))
      .filter((el): el is HTMLElement => !!el);
    
    sectionElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Skeleton for sticky navigation */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 mb-4">
            <Skeleton className="h-4 w-20" />
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-5 w-6 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Skeleton for knowledge sections */}
        <div className="space-y-8">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <Skeleton className="w-10 h-10 rounded-md" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-7 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Sticky Category Navigation */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border rounded-lg p-4 mb-8 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 mb-4">
          <span className="font-medium text-sm text-muted-foreground flex-shrink-0">Categories:</span>
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
            {sections.map(section => (
              <Button
                key={section.slug}
                variant={activeSection === section.slug ? "default" : "outline"}
                size="sm"
                onClick={() => scrollToSection(section.slug)}
                className="text-xs flex-shrink-0"
              >
                <span className="hidden sm:inline">{section.title}</span>
                <span className="sm:hidden">{section.title.split(' ')[0]}</span>
                <Badge variant="secondary" className="ml-1.5 text-xs">
                  {sectionStats[section.slug]}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search across all knowledge content... (Ctrl+K to focus)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-20 py-2 border border-input rounded-md bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground hidden sm:block">
            ⌘K
          </div>
        </div>
        
        {searchQuery && (
          <div className="mt-2 text-sm text-muted-foreground">
            Found {filteredSections.reduce((total, section) => total + section.qas.length, 0)} results
          </div>
        )}
      </div>

      {/* Knowledge Sections */}
      <div className="space-y-8">
        {filteredSections.map((section, index) => (
          <div key={section.slug} id={`section-${section.slug}`} className="scroll-mt-32">
            {/* Section Header */}
            <Card>
              <CardHeader 
                className="cursor-pointer" 
                onClick={() => toggleSection(section.slug)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="p-2 bg-muted rounded-md flex-shrink-0">
                      {/* Icon would go here - using placeholder for now */}
                      <div className="w-6 h-6 bg-primary/20 rounded"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-xl md:text-2xl">{section.title}</CardTitle>
                      <p className="text-muted-foreground mt-1 text-sm md:text-base">{section.preview}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="outline" className="hidden sm:flex">
                      {section.qas.length} topics
                    </Badge>
                    <Badge variant="outline" className="sm:hidden text-xs">
                      {section.qas.length}
                    </Badge>
                    {expandedSections.includes(section.slug) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {/* Expanded Content - Lazy loaded for performance */}
              {expandedSections.includes(section.slug) && (
                <CardContent>
                  <Suspense fallback={
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-12 w-3/4" />
                    </div>
                  }>
                    <LazyContentRenderer section={section} />
                  </Suspense>
                </CardContent>
              )}
            </Card>
            
            {/* Separator between sections */}
            {index < filteredSections.length - 1 && (
              <Separator className="my-8" />
            )}
          </div>
        ))}
      </div>
      
      {/* No Results */}
      {searchQuery && filteredSections.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No content found for "{searchQuery}". Try different search terms.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}