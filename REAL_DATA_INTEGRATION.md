# Real Data Integration - Kenya Ranked

## 🎉 What's Been Implemented

The Kenya Ranked platform now fetches **real, live data** from authoritative international sources and stores it in MongoDB Atlas.

## 📊 Data Sources Integrated

### 1. **World Bank API** (9 Indicators)
- ✅ GDP Per Capita
- ✅ Poverty Headcount Ratio
- ✅ Life Expectancy at Birth
- ✅ Control of Corruption (WGI)
- ✅ Government Effectiveness (WGI)
- ✅ Rule of Law (WGI)
- ✅ Regulatory Quality (WGI)
- ✅ Voice and Accountability (WGI)
- ✅ Political Stability (WGI)

**API**: `https://api.worldbank.org/v2/country/KEN/indicator/{CODE}?format=json`

### 2. **UNDP - Human Development Index**
- ✅ HDI Value, Rank, and Components

**Source**: CSV from `https://hdr.undp.org/sites/default/files/2024-01/Statistical_Annex_Table_1.csv`

### 3. **Transparency International - Corruption Perceptions Index**
- ✅ CPI Score and Global Rank

**Source**: CSV from `https://images.transparencycdn.org/images/2023_CPI_dataset.csv`

### 4. **SDG Index - All 17 Sustainable Development Goals**
- ✅ Overall SDG Score
- ✅ Individual scores for all 17 goals
- ✅ Trend indicators

**Source**: JSON from `https://dashboards.sdgindex.org/static/data/2024/data.json`

### 5. **Reporters Without Borders - Press Freedom Index**
- ✅ Press Freedom Score and Rank

**Source**: JSON API from `https://api.rsf.org/press-freedom-index/2024/countries`

## 🗄️ Database Structure

### MongoDB Collections

#### `indicators`
Stores all individual indicators with:
- Name, slug, category, description
- Current score, rank, total countries
- Historical trend data (10+ years)
- Regional comparisons (Kenya vs East Africa)
- Source information and methodology
- Last updated timestamp

#### `sdggoals`
Stores all 17 SDG goals with:
- Goal number, title, description, color, icon
- Progress percentage (0-100)
- Status (on-track, moderate, off-track)
- Individual indicators with targets
- Last updated timestamp

## 🚀 How to Use

### Initial Data Population

```bash
# Fetch real data from all sources and populate MongoDB
pnpm seed
```

This script:
1. Connects to MongoDB Atlas
2. Fetches data from all 5 sources
3. Transforms and validates the data
4. Stores in MongoDB with proper schemas
5. Logs progress for each indicator

### Update Data

Run the same command to refresh all data:

```bash
pnpm seed
```

The script uses `upsert` operations, so it will update existing records or create new ones.

## 🔌 API Endpoints

### Get All Indicators
```
GET /api/indicators
Query params: ?category=governance&search=corruption
```

### Get Single Indicator
```
GET /api/indicators/[slug]
Example: /api/indicators/corruption-perceptions-index
```

### Get All SDG Goals
```
GET /api/sdg
Returns: All 17 goals + overall score
```

### Get Single SDG Goal
```
GET /api/sdg/[slug]
Example: /api/sdg/no-poverty
```

## 📁 File Structure

```
kenya-ranked/
├── lib/
│   ├── mongodb.ts                    # MongoDB connection
│   └── dataFetchers/
│       ├── worldBank.ts              # World Bank API
│       ├── undpHDI.ts                # UNDP HDI CSV parser
│       ├── transparencyIntl.ts       # CPI CSV parser
│       ├── sdgIndex.ts               # SDG JSON fetcher
│       └── pressFreedom.ts           # Press Freedom API
├── models/
│   ├── Indicator.model.ts            # Indicator schema
│   └── SDGGoal.model.ts              # SDG Goal schema
├── scripts/
│   └── seedDatabase.ts               # Data population script
└── app/api/
    ├── indicators/
    │   ├── route.ts                  # List all indicators
    │   └── [slug]/route.ts           # Get single indicator
    └── sdg/
        ├── route.ts                  # List all SDG goals
        └── [slug]/route.ts           # Get single SDG goal
```

## 🔄 Data Refresh Strategy

### Automatic Updates (Future Enhancement)
The platform can be configured to automatically refresh data:

1. **Scheduled Cron Job** (Recommended)
   - Run `pnpm seed` monthly via cron
   - Most sources update annually, so monthly checks are sufficient

2. **Webhook-based Updates**
   - Set up webhooks for sources that support them
   - Trigger refresh when new data is published

3. **Manual Refresh**
   - Run `pnpm seed` whenever you want to update data
   - Useful for testing or immediate updates

### Current Implementation
- Manual refresh via `pnpm seed`
- Each record includes `lastUpdated` timestamp
- Frontend can display data freshness

## 🎯 Next Steps

1. **Update Frontend Pages** to use API routes instead of mock data
2. **Add Loading States** for data fetching
3. **Implement Error Handling** for failed API calls
4. **Add Data Freshness Indicators** showing when data was last updated
5. **Create Admin Dashboard** for monitoring data updates
6. **Set up Automated Refresh** using cron jobs or serverless functions

## 🔐 Environment Variables

Required in `.env.local`:

```
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database"
```

## 📊 Data Quality

All data fetchers include:
- ✅ Error handling and logging
- ✅ Data validation
- ✅ Fallback for missing data
- ✅ Retry logic for failed requests
- ✅ Progress logging during seeding

## 🎨 Features

- **Real-time Data**: Fetches latest available data from official sources
- **Historical Trends**: Stores 10+ years of data where available
- **Regional Comparisons**: Compares Kenya with East African neighbors
- **Comprehensive Coverage**: 15+ indicators across 5 major sources
- **Scalable Architecture**: Easy to add new data sources
- **Type-safe**: Full TypeScript support with proper interfaces

---

**Status**: ✅ Backend integration complete. Ready for frontend integration.
