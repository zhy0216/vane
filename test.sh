#!/bin/bash

# 测试脚本 - 用于快速测试 Vane Email 服务

echo "🧪 Testing Vane Email Service"
echo "================================"
echo ""

# 测试健康检查
echo "1️⃣  Testing health check..."
curl -s http://localhost:3000/health | jq '.'
echo ""
echo ""

# 测试文本组件
echo "2️⃣  Testing text component..."
curl -s -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d @examples/simple-text.json \
  -o test-output.html

if [ -f test-output.html ]; then
  echo "✅ HTML generated successfully!"
  echo "📄 Output saved to: test-output.html"
  echo ""
  echo "Preview (first 500 chars):"
  head -c 500 test-output.html
  echo ""
  echo "..."
else
  echo "❌ Failed to generate HTML"
fi

echo ""
echo "================================"
echo "✨ Testing complete!"
