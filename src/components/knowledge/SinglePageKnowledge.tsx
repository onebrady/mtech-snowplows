import { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import type { KnowledgeSection } from "@/content/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Accordion components available but not used in this implementation
import { Separator } from "@/components/ui/separator";
import { GroupedQA, JumpNav } from "./GroupedQA";
import { LaneCoverageEstimator } from "../microtools/LaneCoverageEstimator";
import { SaltUsageCalculator } from "../microtools/SaltUsageCalculator";
import { Checklist } from "../shared/Checklist";
import { FactCard } from "../shared/FactCard";
import { emitAnalytics } from "../../lib/analytics";

interface SinglePageKnowledgeProps {
  sections: KnowledgeSection[];
}

export function SinglePageKnowledge({ sections }: SinglePageKnowledgeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");

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

  // Handle section expansion
  const toggleSection = (sectionSlug: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionSlug)
        ? prev.filter(slug => slug !== sectionSlug)
        : [...prev, sectionSlug]
    );
    
    emitAnalytics("section_toggle", { 
      slug: sectionSlug, 
      action: expandedSections.includes(sectionSlug) ? "collapse" : "expand" 
    });
  };

  // Scroll to section
  const scrollToSection = (sectionSlug: string) => {
    const element = document.getElementById(`section-${sectionSlug}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionSlug);
      if (!expandedSections.includes(sectionSlug)) {
        toggleSection(sectionSlug);
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Sticky Category Navigation */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border rounded-lg p-4 mb-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-medium text-sm text-muted-foreground">Categories:</span>
          {sections.map(section => (
            <Button
              key={section.slug}
              variant={activeSection === section.slug ? "default" : "outline"}
              size="sm"
              onClick={() => scrollToSection(section.slug)}
              className="text-xs"
            >
              {section.title}
              <Badge variant="secondary" className="ml-2 text-xs">
                {sectionStats[section.slug]}
              </Badge>
            </Button>
          ))}
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search across all knowledge content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-md">
                      {/* Icon would go here - using placeholder for now */}
                      <div className="w-6 h-6 bg-primary/20 rounded"></div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">{section.preview}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {section.qas.length} topics
                    </Badge>
                    {expandedSections.includes(section.slug) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {/* Expanded Content */}
              {expandedSections.includes(section.slug) && (
                <CardContent>
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