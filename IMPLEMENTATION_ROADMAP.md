# MTech Knowledge Hub Content Revision - Implementation Roadmap

## Project Overview
Transform 9 knowledge sections into 6 logical categories with enhanced single-page navigation, shadcn visual improvements, and optimized user experience.

**Branch**: `content-revision`  
**Start Date**: 2025-08-28  
**Target Completion**: 5 phases over 8-10 sessions

---

## Quick Status Check

### Overall Progress
- [x] Phase 1: Content Strategy & Migration ✅ COMPLETE
- [x] Phase 2: Component Architecture ✅ COMPLETE
- [ ] Phase 3: Visual Enhancement (shadcn)
- [ ] Phase 4: Navigation & UX Implementation
- [ ] Phase 5: Testing & Quality Assurance

---

## New 6-Category Structure

### 1. Equipment (Foundational Knowledge)
**Sources**: `plows-101.ts` + `spreaders-101.ts`  
**File**: `src/content/sections/equipment.ts`  
**Total Q&As**: ~16  
**Icon**: `Snowflake`  
**Preview**: "Plows, spreaders, and core equipment basics"

**Content Groups**:
- Plow Types & Dynamics (trip-edge vs full-trip, straight vs V vs wing)
- Spreader Systems (under-tailgate, spinner vs chute, calibration)  
- Sizing & Selection (moldboard dimensions, capacity matching)
- Materials & Components (cutting edges, hydraulics, materials)
- Application Basics (rates, patterns, operational fundamentals)

**Special Features**:
- Salt Usage Calculator (preserve from spreaders-101)
- Downloads from both sections
- Combined terminology

### 2. Integration (Technical Implementation)
**Sources**: `controls-101.ts` + `fit-compliance.ts`  
**File**: `src/content/sections/integration.ts`  
**Total Q&As**: ~15  
**Icon**: `Settings`  
**Preview**: "Controls, mounting, and chassis compliance"

**Content Groups**:
- Control Systems (Olympus overview, integration benefits)
- Installation & Setup (wiring, diagnostics, serviceability)
- Chassis & Mounting (GVWR, axle loads, frame considerations)
- Power Systems (hydraulics, PTO, electrical loads)
- Compliance & Documentation (lighting, transport limits, audits)

**Special Features**:
- Pre-build checklist (from fit-compliance)
- Technical downloads
- Control and compliance terminology

### 3. Operations (Field Excellence)
**Sources**: `safety-training.ts` + `regional-snapshots.ts`  
**File**: `src/content/sections/operations.ts`  
**Total Q&As**: ~16  
**Icon**: `ShieldCheck`  
**Preview**: "Safety, training, and regional best practices"

**Content Groups**:
- Operator Safety (PPE, pre-trip, traffic safety, fatigue)
- Training & Certification (programs, operator coaching)
- Regional Considerations (OH, MI, PA, IN, KY specific needs)
- Operational Procedures (storm protocols, debrief processes)

**Special Features**:
- Pre-season checklist (from safety-training)
- Regional best practices integration
- Combined terminology

### 4. Environment (Sustainability & Stewardship)
**Sources**: `environmental-compliance.ts` + optimization content  
**File**: `src/content/sections/environment.ts`  
**Total Q&As**: ~10  
**Icon**: `Leaf`  
**Preview**: "Salt management and environmental practices"

**Content Groups**:
- Salt Management Plans (reduction strategies, targets)
- Application Strategy (pre-wet, anti-ice, timing)
- Storage & Containment (facility requirements, spill prevention)  
- Reporting & Communication (data tracking, public communication)

**Special Features**:
- Salt Usage Calculator (shared with Equipment)
- "Quick wins" fact card
- Environmental focus

### 5. Procurement (Business Strategy)
**Sources**: `procurement-fleet.ts` + business metrics from telematics  
**File**: `src/content/sections/procurement.ts`  
**Total Q&As**: ~10  
**Icon**: `BriefcaseBusiness`  
**Preview**: "Purchasing, specs, and fleet strategy"

**Content Groups**:
- Evaluation & TCO (lifecycle costs, scoring criteria)
- Specification Writing (RFP/RFQ, compliance, performance specs)
- Fleet Strategy (standardization, refurbishment decisions)
- Performance Metrics (KPIs, data-driven decisions)

**Special Features**:
- "MTech value" fact card
- Business-focused content
- Fleet performance integration

### 6. Technology (Data-Driven Operations)
**Sources**: `telematics-maintenance.ts` + diagnostic content from controls  
**File**: `src/content/sections/technology.ts`  
**Total Q&As**: ~10  
**Icon**: `Signal`  
**Preview**: "Data systems and predictive maintenance"

**Content Groups**:
- Data & Monitoring (proof-of-service, sensor integration)
- Predictive Maintenance (failure prevention, duty cycles)
- System Integration (AVL integration, data export)  
- Analytics & Optimization (coverage analysis, driver coaching)

**Special Features**:
- Lane Coverage Estimator (from telematics-maintenance)
- Diagnostic capabilities integration
- Technology-focused terminology

---

## Phase 1: Content Strategy & Migration

### Phase 1 Status: [x] COMPLETE ✅

### Pre-Phase Setup
- [ ] Ensure you're on `content-revision` branch
- [ ] Run `pnpm install` to ensure dependencies
- [ ] Run `pnpm dev` to start development server
- [ ] Take backup screenshots of current sections for reference

### Task 1.1: Create Archive Structure ✅ COMPLETE
**Files to Create/Modify**:
- [x] Create `src/content/sections/legacy/` directory
- [x] Move all 9 existing section files to legacy folder
- [ ] Update imports in `knowledge.ts` temporarily for testing

**Commands**:
```bash
mkdir -p src/content/sections/legacy
mv src/content/sections/*.ts src/content/sections/legacy/
```

**Success Criteria**: All original files preserved in legacy folder, app still runs

### Task 1.2: Create New Section - Equipment ✅ COMPLETE
**File to Create**: `src/content/sections/equipment.ts`

**Content Sources**: 
- `legacy/plows-101.ts` (all content)
- `legacy/spreaders-101.ts` (all content)

**Implementation Checklist**:
- [x] Copy type imports and structure template
- [x] Merge all Q&As from both sources (total: 16)
- [x] Create 6 content groups as specified above
- [x] Assign Q&As to appropriate groups
- [x] Preserve `hasSaltUsageTool: true` from spreaders
- [x] Merge terms arrays from both sections
- [x] Combine downloads arrays
- [x] Set relatedSlugs to other new sections
- [x] Set slug to "equipment", title to "Equipment", icon to "Snowflake"

**Success Criteria**: Equipment section displays correctly when imported ✅

### Task 1.3: Create New Section - Integration ✅ COMPLETE
**File to Create**: `src/content/sections/integration.ts`

**Content Sources**:
- `legacy/controls-101.ts` (all content)
- `legacy/fit-compliance.ts` (all content)

**Implementation Checklist**:
- [x] Merge all Q&As from both sources (total: 16)
- [x] Create 6 content groups as specified above
- [x] Preserve checklist from fit-compliance
- [x] Combine terms and downloads
- [x] Set slug to "integration", title to "Integration", icon to "Settings"

**Success Criteria**: Integration section displays correctly when imported ✅

### Task 1.4: Create New Section - Operations ✅ COMPLETE
**File to Create**: `src/content/sections/operations.ts`

**Content Sources**:
- `legacy/safety-training.ts` (all content)
- `legacy/regional-snapshots.ts` (all content)

**Implementation Checklist**:
- [x] Merge all Q&As from both sources (total: 16)
- [x] Create 4 content groups as specified above
- [x] Preserve checklist from safety-training
- [x] Combine terms and merge regional focus
- [x] Set slug to "operations", title to "Operations", icon to "ShieldCheck"

**Success Criteria**: Operations section displays correctly when imported ✅

### Task 1.5: Create New Section - Environment ✅ COMPLETE
**File to Create**: `src/content/sections/environment.ts`

**Content Sources**:
- `legacy/environmental-compliance.ts` (all content)
- Application optimization content from spreaders where relevant

**Implementation Checklist**:
- [x] Use environmental-compliance as primary base (8 Q&As)
- [x] Create 5 content groups as specified above
- [x] Preserve `hasSaltUsageTool: true` and fact card
- [x] Set slug to "environment", title to "Environment", icon to "Leaf"

**Success Criteria**: Environment section displays correctly when imported ✅

### Task 1.6: Create New Section - Procurement ✅ COMPLETE
**File to Create**: `src/content/sections/procurement.ts`

**Content Sources**:
- `legacy/procurement-fleet.ts` (all content)
- Business metrics concepts from telematics where relevant

**Implementation Checklist**:
- [x] Use procurement-fleet as primary base (8 Q&As)
- [x] Add relevant business/KPI content from telematics (2 Q&As)
- [x] Create 6 content groups as specified above  
- [x] Preserve fact card from procurement-fleet
- [x] Set slug to "procurement", title to "Procurement", icon to "BriefcaseBusiness"

**Success Criteria**: Procurement section displays correctly when imported ✅

### Task 1.7: Create New Section - Technology ✅ COMPLETE
**File to Create**: `src/content/sections/technology.ts`

**Content Sources**:
- `legacy/telematics-maintenance.ts` (all content)
- Diagnostic content from controls where relevant

**Implementation Checklist**:
- [x] Use telematics-maintenance as primary base (6 Q&As)
- [x] Add relevant diagnostic Q&As from controls (2 Q&As)
- [x] Create 4 content groups as specified above
- [x] Preserve `hasLaneCoverageTool: true`
- [x] Set slug to "technology", title to "Technology", icon to "Signal"

**Success Criteria**: Technology section displays correctly when imported ✅

### Task 1.8: Update Knowledge Registry ✅ COMPLETE
**File to Modify**: `src/content/knowledge.ts`

**Changes Required**:
- [x] Update imports to reference new 6 sections instead of 9
- [x] Update KNOWLEDGE_SECTIONS array with new 6 sections
- [x] Remove legacy imports
- [x] Verify getSectionBySlug function works with new slugs

**Success Criteria**: 
- [x] Application shows 6 categories instead of 9
- [x] All sections load correctly
- [x] No console errors

### Task 1.9: Update Related Section References ✅ COMPLETE
**Files to Check/Update**:
- [x] All new section files - verify `relatedSlugs` point to new section slugs
- [x] Any hardcoded section references in components

### Phase 1 Testing Checkpoint ✅ COMPLETE
**Before proceeding to Phase 2, verify**:
- [x] Application loads without errors
- [x] 6 categories display in knowledge grid
- [x] Each section page loads with merged content
- [x] All microtools still function (salt calculator, lane coverage estimator)  
- [x] Downloads are accessible
- [x] No broken cross-references between sections
- [x] Build completes successfully without TypeScript errors

---

## Phase 2: Component Architecture

### Phase 2 Status: [x] COMPLETE ✅

### Task 2.1: Install shadcn Components ✅ COMPLETE
**Commands to Run**:
```bash
npx shadcn@latest add card
npx shadcn@latest add accordion  
npx shadcn@latest add badge
npx shadcn@latest add button
npx shadcn@latest add sheet
npx shadcn@latest add command
npx shadcn@latest add skeleton
npx shadcn@latest add tabs
npx shadcn@latest add separator
```

**Success Criteria**: All components installed without conflicts ✅

### Task 2.2: Create Single-Page Knowledge Component
**File to Create**: `src/components/knowledge/SinglePageKnowledge.tsx`

**Component Requirements**:
- [ ] Accept `sections` prop (array of KnowledgeSection)
- [ ] Sticky category navigation at top
- [ ] Search/filter functionality
- [ ] Progressive disclosure - one category expanded at a time
- [ ] Smooth scrolling to sections
- [ ] Mobile-responsive design

**Key Features to Implement**:
- [ ] Category navigation pills (sticky)
- [ ] Expand/collapse functionality for each category
- [ ] Search that filters Q&As across all categories
- [ ] Jump navigation within expanded categories
- [ ] Preserve all existing microtools inline
- [ ] Related downloads at end of each category

### Task 2.3: Enhance KnowledgeGrid Component
**File to Modify**: `src/components/landing/KnowledgeGrid.tsx`

**Changes Required**:
- [ ] Update to handle 6 categories instead of 9
- [ ] Use shadcn Card component
- [ ] Add content count badges
- [ ] Improve responsive layout (2×3 grid)
- [ ] Add "View All Content" button that opens single-page view

### Task 2.4: Update GroupedQA Component
**File to Modify**: `src/components/knowledge/GroupedQA.tsx`

**Enhancements**:
- [ ] Use shadcn Accordion component
- [ ] Improve typography and spacing
- [ ] Add smooth expand/collapse animations
- [ ] Better mobile responsiveness

### Task 2.5: Create Search Component
**File to Create**: `src/components/knowledge/KnowledgeSearch.tsx`

**Features**:
- [ ] Real-time search across all Q&A content
- [ ] Category filtering
- [ ] Keyboard shortcuts (Ctrl+K)
- [ ] Search result highlighting
- [ ] Clear search functionality

### Task 2.6: Update Page Routes
**Files to Modify**: 
- `src/pages/LandingPage.tsx`
- Routing configuration

**Changes**:
- [ ] Add single-page view route (`/knowledge`)
- [ ] Maintain individual section routes for backward compatibility
- [ ] Add redirects from old section slugs to new ones
- [ ] Update navigation links

### Phase 2 Testing Checkpoint
**Verify**:
- [ ] Single-page view renders all 6 categories
- [ ] Category navigation works smoothly  
- [ ] Search finds relevant content
- [ ] Progressive disclosure functions properly
- [ ] Mobile view is usable
- [ ] Backward compatibility maintained

---

## Phase 3: Visual Enhancement (shadcn)

### Phase 3 Status: [ ] Not Started / [ ] In Progress / [ ] Complete

### Task 3.1: Update Typography System
**Files to Modify**:
- `src/styles/theme.css`
- Component files as needed

**Improvements**:
- [ ] Implement consistent heading hierarchy
- [ ] Improve body text readability
- [ ] Better font weights and spacing
- [ ] Enhanced line heights

### Task 3.2: Enhance Card Components
**Apply shadcn Card to**:
- [ ] Knowledge grid items
- [ ] Fact cards  
- [ ] Resource/download cards
- [ ] Microtool containers

### Task 3.3: Implement Badge System  
**Use shadcn Badge for**:
- [ ] Content count indicators
- [ ] Topic tags
- [ ] Status indicators
- [ ] Regional indicators

### Task 3.4: Button System Consistency
**Apply shadcn Button variants**:
- [ ] Primary CTAs (default variant)
- [ ] Secondary actions (outline variant) 
- [ ] Subtle actions (ghost variant)
- [ ] Consistent sizing and spacing

### Task 3.5: Mobile Navigation Enhancement
**File to Create/Modify**: Mobile navigation components

**Features**:
- [ ] Use shadcn Sheet for mobile navigation drawer
- [ ] Touch-friendly interactions
- [ ] Optimized spacing for mobile
- [ ] Swipe gestures where appropriate

### Task 3.6: Loading States
**Implement shadcn Skeleton**:
- [ ] Content loading states
- [ ] Search result loading
- [ ] Section expansion loading
- [ ] Smooth transitions

### Phase 3 Testing Checkpoint
**Visual Quality Check**:
- [ ] Consistent design system applied
- [ ] Improved visual hierarchy  
- [ ] Better mobile experience
- [ ] Smooth animations and transitions
- [ ] Accessibility improvements

---

## Phase 4: Navigation & UX Implementation

### Phase 4 Status: [ ] Not Started / [ ] In Progress / [ ] Complete

### Task 4.1: Implement Deep Linking
**Features to Add**:
- [ ] URL hash navigation for sections (`#equipment`)
- [ ] Direct links to specific Q&As
- [ ] Browser back/forward support
- [ ] Social sharing with deep links

### Task 4.2: State Management
**Implement state for**:
- [ ] Expanded/collapsed section state
- [ ] Search query persistence
- [ ] Scroll position memory
- [ ] User preferences

### Task 4.3: Keyboard Navigation
**Accessibility Features**:
- [ ] Tab order optimization
- [ ] Keyboard shortcuts for search
- [ ] Arrow key navigation
- [ ] Focus management

### Task 4.4: Performance Optimization
**Optimizations**:
- [ ] Lazy loading for collapsed sections
- [ ] Virtual scrolling for large content
- [ ] Image optimization
- [ ] Bundle size analysis

### Task 4.5: Analytics Integration
**Track User Interactions**:
- [ ] Section engagement
- [ ] Search queries  
- [ ] Download clicks
- [ ] Microtool usage

### Phase 4 Testing Checkpoint
**UX Quality Check**:
- [ ] Smooth navigation experience
- [ ] Fast performance
- [ ] Accessible keyboard navigation
- [ ] Deep linking works correctly
- [ ] Analytics tracking functional

---

## Phase 5: Testing & Quality Assurance

### Phase 5 Status: [ ] Not Started / [ ] In Progress / [ ] Complete

### Task 5.1: Update Playwright Tests
**Tests to Update/Create**:
- [ ] Update section count expectations (6 instead of 9)
- [ ] Single-page navigation tests
- [ ] Search functionality tests
- [ ] Mobile responsiveness tests  
- [ ] Accessibility tests

**Commands**:
```bash
pnpm test
```

### Task 5.2: Content Verification
**Manual Testing Checklist**:
- [ ] All Q&As from original 9 sections are present
- [ ] All microtools function correctly
- [ ] All downloads are accessible  
- [ ] Cross-references work properly
- [ ] Related section links are accurate

### Task 5.3: WordPress Plugin Compatibility
**Verify**:
- [ ] Plugin assets build correctly (`pnpm build:wp`)
- [ ] Shortcode embedding works
- [ ] Mobile view in WordPress context
- [ ] No JavaScript conflicts

### Task 5.4: Performance Testing
**Metrics to Check**:
- [ ] Page load speed
- [ ] Time to interactive
- [ ] Bundle size impact
- [ ] Mobile performance scores

### Task 5.5: Accessibility Audit
**Check**:
- [ ] WCAG 2.1 AA compliance  
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast ratios
- [ ] Focus indicators

### Final Testing Checkpoint
**Production Readiness**:
- [ ] All tests passing
- [ ] No console errors
- [ ] Performance metrics acceptable
- [ ] WordPress plugin compatible
- [ ] Accessibility compliant
- [ ] Content complete and accurate

---

## Deployment Checklist

### Pre-Deployment
- [ ] All phases completed and tested
- [ ] Performance audit passed
- [ ] WordPress plugin tested
- [ ] Backup of current production version

### Deployment Steps
1. [ ] Merge `content-revision` branch to main
2. [ ] Deploy to production
3. [ ] Test production functionality
4. [ ] Update documentation
5. [ ] Monitor for issues

### Post-Deployment
- [ ] Analytics tracking verification
- [ ] User feedback collection
- [ ] Performance monitoring
- [ ] Issue resolution planning

---

## Troubleshooting Guide

### Common Issues & Solutions

**If sections don't display**:
- Check `src/content/knowledge.ts` imports
- Verify section file exports match expected structure
- Check console for TypeScript errors

**If search doesn't work**:
- Verify search component is properly integrated
- Check search index generation
- Test search query handling

**If mobile view is broken**:
- Check responsive CSS
- Verify shadcn component mobile compatibility
- Test touch interactions

**If tests fail**:
- Update test expectations for new structure
- Check selector changes in components
- Verify content assertions match new organization

---

## Success Metrics

### Quantitative Goals
- [ ] Reduced cognitive load: 6 vs 9 top-level categories
- [ ] Improved mobile performance scores
- [ ] Faster content discovery (time to find relevant Q&A)
- [ ] Higher engagement (time on page, sections explored)

### Qualitative Goals  
- [ ] Improved user experience feedback
- [ ] Easier content maintenance
- [ ] Better visual consistency
- [ ] Enhanced accessibility

---

**Last Updated**: 2025-08-28  
**Next Review**: After each phase completion  
**Project Owner**: [Your Name]  
**Branch**: content-revision