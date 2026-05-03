const fs = require('fs');

let content = fs.readFileSync('src/components/WeddingTemplate.js', 'utf-8');

// Replace <img ...> with <img loading="lazy" decoding="async" ...>
content = content.replace(/<img\s+(?!.*loading="lazy")/g, '<img loading="lazy" decoding="async" ');
content = content.replace(/<motion\.img\s+(?!.*loading="lazy")/g, '<motion.img loading="lazy" decoding="async" ');

fs.writeFileSync('src/components/WeddingTemplate.js', content);
console.log('Optimized images in WeddingTemplate.js');
