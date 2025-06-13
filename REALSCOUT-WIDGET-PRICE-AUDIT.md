# RealScout Widget Price Range Audit

## Overview
Each page now uses contextually appropriate price ranges for the RealScout widgets to provide targeted property listings based on user intent and page context.

## Price Variant Configurations

### 1. Homepage (Default)
- **Variant**: `homepage`
- **Price Range**: $550,000+
- **Property Types**: SFR, MF, TC, MOBILE
- **Sort Order**: STATUS_AND_SIGNIFICANT_CHANGE
- **Title**: "Featured Skye Canyon Homes"
- **Description**: "Current listings starting at $550K+"
- **Rationale**: Balanced entry point for general visitors

### 2. Entry-Level Properties
- **Variant**: `entry-level`
- **Price Range**: $500,000 - $650,000
- **Property Types**: SFR, TC, MOBILE
- **Sort Order**: PRICE_LOW_TO_HIGH
- **Title**: "Starter Homes in Skye Canyon"
- **Description**: "Affordable options from $500K-$650K"
- **Rationale**: First-time buyers and budget-conscious purchasers

### 3. Mid-Range Properties
- **Variant**: `mid-range`
- **Price Range**: $650,000 - $800,000
- **Property Types**: SFR, MF, TC
- **Sort Order**: STATUS_AND_SIGNIFICANT_CHANGE
- **Title**: "Mid-Range Skye Canyon Properties"
- **Description**: "Quality homes from $650K-$800K"
- **Rationale**: Move-up buyers and established families

### 4. Luxury Properties
- **Variant**: `luxury`
- **Price Range**: $800,000+
- **Property Types**: SFR, MF, TC
- **Sort Order**: PRICE_HIGH_TO_LOW
- **Title**: "Luxury Skye Canyon Homes"
- **Description**: "Premium properties starting at $800K+"
- **Rationale**: High-end buyers seeking luxury features

### 5. New Construction
- **Variant**: `new-construction`
- **Price Range**: $600,000+
- **Property Types**: SFR, MF
- **Sort Order**: NEWEST
- **Title**: "New Construction Homes"
- **Description**: "Brand new properties from $600K+"
- **Rationale**: Buyers specifically seeking new builds

### 6. All Properties
- **Variant**: `all-properties`
- **Price Range**: $400,000+
- **Property Types**: SFR, MF, TC, MOBILE
- **Sort Order**: STATUS_AND_SIGNIFICANT_CHANGE
- **Title**: "All Available Properties"
- **Description**: "Complete inventory starting at $400K+"
- **Rationale**: Comprehensive listings for broad searches

## Page-Specific Implementation

### Home Page (`/`)
- **Widget Variant**: `homepage`
- **Context**: Main landing page for general visitors
- **Price Focus**: $550K+ (balanced entry point)

### Properties Page (`/properties`)
- **Widget 1**: `mid-range` (Featured Listings section)
- **Widget 2**: `all-properties` (All Available Properties section)
- **Context**: Comprehensive property browsing
- **Price Focus**: Segmented by buyer type

### Skye Canyon Communities (`/skye-canyon-communities`)
- **Widget Variant**: `new-construction`
- **Context**: Focus on new developments and builders
- **Price Focus**: $600K+ (new construction premium)

### Skye Canyon Guide (`/skye-canyon-guide`)
- **Widget Variant**: `luxury`
- **Context**: Exclusive community showcase
- **Price Focus**: $800K+ (premium community positioning)

### Skye Canyon Schools (`/skye-canyon-schools`)
- **Widget Variant**: `mid-range`
- **Context**: Family-oriented buyers prioritizing education
- **Price Focus**: $650K-$800K (family home range)

### Northwest Las Vegas (`/northwest-las-vegas`)
- **Widget Variant**: `all-properties`
- **Context**: Broader geographic area coverage
- **Price Focus**: $400K+ (inclusive regional search)

### Property Detail Pages
- **Widget Variant**: `mid-range`
- **Context**: Similar properties to current listing
- **Price Focus**: $650K-$800K (comparable homes)

## Benefits of Price Segmentation

### User Experience
- Visitors see relevant price ranges for their context
- Reduces cognitive load by filtering appropriate options
- Improves conversion by matching user intent

### SEO Benefits
- Page-specific content relevance
- Better user engagement metrics
- Reduced bounce rates from irrelevant listings

### Lead Quality
- More qualified prospects per price segment
- Better conversion tracking by price range
- Improved agent efficiency with targeted leads

## Analytics Tracking
Each widget variant includes specific analytics tracking to measure:
- Engagement by price segment
- Conversion rates by variant
- User journey patterns across price ranges
- Lead quality by property type and price

## Technical Implementation
- Dynamic widget configuration based on page context
- Consistent agent ID across all widgets
- Proper sort orders for each use case
- Responsive design maintained across variants