#!/bin/bash

# HDRO API Endpoints Test Script
# Tests all available HDRO API endpoints

echo "🧪 Testing HDRO API Endpoints..."
echo "================================"
echo ""

BASE_URL="http://localhost:3000/api"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

test_endpoint() {
  local name=$1
  local endpoint=$2
  
  echo -e "${BLUE}Testing:${NC} $name"
  response=$(curl -s "$BASE_URL$endpoint")
  
  if echo "$response" | jq -e '.kenya.current' > /dev/null 2>&1; then
    current=$(echo "$response" | jq -c '.kenya.current')
    echo -e "${GREEN}✓ Success:${NC} $current"
  else
    error=$(echo "$response" | jq -r '.error // "Unknown error"')
    echo -e "${RED}✗ Failed:${NC} $error"
  fi
  echo ""
}

echo "📊 Core Development Indices"
echo "----------------------------"
test_endpoint "HDI" "/hdi"
test_endpoint "IHDI" "/ihdi"
test_endpoint "PHDI" "/phdi"

echo "👥 Gender Equality Metrics"
echo "----------------------------"
test_endpoint "GDI" "/gdi"
test_endpoint "GII" "/gii"

echo "📚 Education Indicators"
echo "----------------------------"
test_endpoint "Mean Years of Schooling" "/education/mean-years-schooling"
test_endpoint "Expected Years of Schooling" "/education/expected-years-schooling"
test_endpoint "Secondary Education Rate" "/education/secondary-education"

echo "💰 Economic Indicators"
echo "----------------------------"
test_endpoint "GNI Per Capita" "/economic/gni-per-capita"
test_endpoint "Labour Force Participation" "/economic/labour-force"

echo "🏥 Health Indicators"
echo "----------------------------"
test_endpoint "Life Expectancy" "/health/life-expectancy"
test_endpoint "Maternal Mortality Ratio" "/health/maternal-mortality"
test_endpoint "Adolescent Birth Rate" "/health/adolescent-birth-rate"

echo "🌍 Environmental Indicators"
echo "----------------------------"
test_endpoint "CO2 Emissions Per Capita" "/environment/co2-emissions"
test_endpoint "Material Footprint Per Capita" "/environment/material-footprint"

echo "🏠 Living Standards"
echo "----------------------------"
test_endpoint "Access to Electricity" "/living-standards/electricity"
test_endpoint "Access to Clean Water" "/living-standards/water"
test_endpoint "Access to Sanitation" "/living-standards/sanitation"
test_endpoint "Clean Cooking Fuel" "/living-standards/cooking-fuel"
test_endpoint "Housing Quality" "/living-standards/housing"

echo "⚖️ Governance & Poverty"
echo "----------------------------"
test_endpoint "Parliamentary Representation" "/governance/parliament"
test_endpoint "Multidimensional Poverty Index" "/poverty/mpi"

echo "================================"
echo "✅ Testing Complete!"
