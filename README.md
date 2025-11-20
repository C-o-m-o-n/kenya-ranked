# Kenya Ranked

> See how Kenya stands in the world — through data, not opinions.

A complete, authoritative public data website visualizing Kenya's position across global development indices.

## 🌍 About

Kenya Ranked is a civic-tech platform that centralizes Kenya's performance data across global indices including governance, corruption, poverty, HDI, SDGs, and World Development Indicators. The platform blends institutional authority with modern data design, inspired by World Bank and OurWorldInData.

## ✨ Features

- **7 Comprehensive Pages**: Home, Indicators, SDG Progress, Individual Indicator Details, Individual SDG Goals, About, and Methodology
- **Interactive Data Visualizations**: Custom SVG-based charts for trends and comparisons
- **Search & Filter**: Find indicators by category, name, or year
- **Responsive Design**: Mobile-first approach with smooth animations
- **17 SDG Goals**: Complete tracking of Kenya's Sustainable Development Goals progress
- **Regional Comparisons**: Kenya vs East Africa vs Africa vs World
- **Data Transparency**: Full methodology documentation and source attribution

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The application will be available at `http://localhost:3000`

## 🎨 Design System

### Color Palette
- **Primary**: Deep Blue (#003B73) - Institutional authority
- **Kenya Green**: #0F9D58 - National identity
- **Slate Gray**: #475569 - Readable text
- **Soft White**: #F8FAFC - Clean backgrounds
- **Data Cyan**: #00A7C4 - Data visualization

### Typography
- **Headings**: IBM Plex Sans
- **Body**: Inter
- **Numbers/Data**: Space Mono

## 📊 Data Sources

All data comes from authoritative international organizations:

- **World Bank**: Worldwide Governance Indicators, World Development Indicators
- **Transparency International**: Corruption Perceptions Index
- **UNDP**: Human Development Index
- **Sustainable Development Solutions Network**: SDG Index

## 🗂️ Project Structure

```
kenya-ranked/
├── app/                    # Next.js app directory
│   ├── indicators/        # Indicators pages
│   ├── sdg/              # SDG pages
│   ├── compare/          # Comparison tool
│   ├── about/            # About page
│   └── methodology/      # Methodology page
├── components/            # Reusable components
│   ├── layout/           # Navigation, Footer
│   ├── cards/            # MetricCard
│   ├── charts/           # Charts components
│   └── ui/               # UI components
├── data/                 # Mock data
├── types/                # TypeScript types
└── lib/                  # Utilities
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📱 Pages

1. **Homepage** - Hero, key highlights, regional comparisons, category explorer
2. **Indicators** - Searchable table with filters and trend sparklines
3. **Indicator Detail** - Historical trends, regional comparisons, methodology
4. **SDG Overview** - All 17 goals with progress tracking
5. **SDG Goal Detail** - Individual goal indicators and comparisons
6. **Compare** - Multi-indicator comparison (coming soon)
7. **About** - Mission, purpose, contact
8. **Methodology** - Data sources, limitations, best practices

## 🎯 Key Indicators Tracked

- Corruption Perceptions Index (CPI)
- Control of Corruption (WGI)
- Human Development Index (HDI)
- GDP Per Capita
- Poverty Headcount Ratio
- SDG Index Score
- And many more...

## 🔄 Future Enhancements

- [ ] Live API integration
- [ ] Advanced comparison tool
- [ ] Data export (CSV/JSON)
- [ ] User preferences (dark mode)
- [ ] Advanced filtering
- [ ] Analytics dashboard

## 📄 License

This project is built for civic engagement and transparency.

## 🤝 Contributing

Contributions are welcome! This is a civic-tech project aimed at promoting transparency and data-driven decision making.

## 📧 Contact

For questions or feedback: info@kenyaranked.org

---

**Built with transparency and civic engagement in mind.**
