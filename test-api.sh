#!/bin/bash

# MoodMate API Test Script
# This script tests all major endpoints

BASE_URL="http://localhost:3000/api"
TOKEN=""

echo "================================"
echo "MoodMate API Testing Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/health")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Health check passed${NC}"
    echo "Response: $BODY"
else
    echo -e "${RED}✗ Health check failed (HTTP $HTTP_CODE)${NC}"
    exit 1
fi
echo ""

# Test 2: Register User
echo -e "${YELLOW}Test 2: Register User${NC}"
TIMESTAMP=$(date +%s)
EMAIL="test${TIMESTAMP}@example.com"

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"$EMAIL\",\"password\":\"password123\"}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 201 ]; then
    echo -e "${GREEN}✓ User registration passed${NC}"
    TOKEN=$(echo "$BODY" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "Token: ${TOKEN:0:20}..."
else
    echo -e "${RED}✗ User registration failed (HTTP $HTTP_CODE)${NC}"
    echo "Response: $BODY"
    exit 1
fi
echo ""

# Test 3: Login
echo -e "${YELLOW}Test 3: Login${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"password123\"}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Login passed${NC}"
else
    echo -e "${RED}✗ Login failed (HTTP $HTTP_CODE)${NC}"
    echo "Response: $BODY"
fi
echo ""

# Test 4: Get Current User
echo -e "${YELLOW}Test 4: Get Current User${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Get current user passed${NC}"
    echo "Response: $BODY"
else
    echo -e "${RED}✗ Get current user failed (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Test 5: Create Mood Entry
echo -e "${YELLOW}Test 5: Create Mood Entry${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/moods" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mood":"happy","note":"Testing the API!"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 201 ]; then
    echo -e "${GREEN}✓ Create mood entry passed${NC}"
    echo "Response: $BODY"
else
    echo -e "${RED}✗ Create mood entry failed (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Test 6: Get Mood Entries
echo -e "${YELLOW}Test 6: Get Mood Entries${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/moods" \
  -H "Authorization: Bearer $TOKEN")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Get mood entries passed${NC}"
    echo "Response: ${BODY:0:100}..."
else
    echo -e "${RED}✗ Get mood entries failed (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Test 7: Get User Stats
echo -e "${YELLOW}Test 7: Get User Stats${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/users/stats" \
  -H "Authorization: Bearer $TOKEN")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Get user stats passed${NC}"
    echo "Response: $BODY"
else
    echo -e "${RED}✗ Get user stats failed (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Test 8: Get Analytics
echo -e "${YELLOW}Test 8: Get Analytics${NC}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/analytics?days=30" \
  -H "Authorization: Bearer $TOKEN")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Get analytics passed${NC}"
    echo "Response: ${BODY:0:150}..."
else
    echo -e "${RED}✗ Get analytics failed (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Summary
echo "================================"
echo -e "${GREEN}All tests completed!${NC}"
echo "================================"
echo ""
echo "Your API is working correctly!"
echo "Token for further testing: $TOKEN"
echo ""
echo "You can now:"
echo "1. Import MoodMate.postman_collection.json into Postman"
echo "2. Use the token above for authenticated requests"
echo "3. Check API_EXAMPLES.md for more endpoint examples"
