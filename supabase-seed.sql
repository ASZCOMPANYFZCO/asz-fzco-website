-- ============================================================
-- Supabase Seed File for ASZ Website
-- Products (24) and Blog Posts (3)
-- ============================================================

-- ============================================================
-- PRODUCTS
-- ============================================================

INSERT INTO products (name, slug, category, short_description, image, specifications, mmta_specs, grades, is_active, is_featured) VALUES

-- ======== FERRO ALLOYS ========

-- 1. Ferro Silicon
(
  'Ferro Silicon',
  'ferro-silicon',
  'ferro_alloy',
  'Premium ferro silicon for steel deoxidation, alloying, and casting applications.',
  '/images/products/ferro-silicon.jpeg',
  '{"Si": "72–78%", "Al": "1–2%", "C": "0.1% max", "Form": "Lumps / Granules", "Size": "10–100mm"}',
  '{"origin": "China, Brazil, Norway", "quality": "FeSi 75% Standard Grade", "form": "Lumps, Granules", "packaging": "Big bags (1–1.5 MT) or drums", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[{"name": "Ferro-Silicon 75% Standard Grade", "gradePercent": "75%", "sizeMm": "10-60mm", "carbonPercent": "0.1% max", "purityPercent": "75% Si min", "packaging": "Big bags 1MT", "origin": "China / Brazil"}]',
  true,
  true
),

-- 2. Ferro Chrome
(
  'Ferro Chrome',
  'ferro-chrome',
  'ferro_alloy',
  'High-carbon and low-carbon ferro chrome for stainless steel and alloy production.',
  '/images/products/chrome.jpeg',
  '{"Cr": "60–70%", "C": "4–10% (HC) / 0.1% max (LC)", "Si": "1–3%", "Form": "Lumps", "Size": "10–100mm"}',
  '{"origin": "South Africa, India, Kazakhstan, Turkey", "quality": "High Carbon / Low Carbon / Medium Carbon grades", "form": "Lumps", "packaging": "Big bags (1–1.5 MT) or bulk", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate, Certificate of Origin", "weighingSampling": "At loading port per industry standards"}',
  '[{"name": "Ferro-Chrome 60% High Carbon", "gradePercent": "60%", "sizeMm": "10-100mm", "carbonPercent": "6-8%", "purityPercent": "60% Cr min", "packaging": "Big bags 1MT", "origin": "South Africa / India"}, {"name": "Ferro-Chrome 60% Low Carbon", "gradePercent": "60%", "sizeMm": "10-80mm", "carbonPercent": "0.1% max", "purityPercent": "60% Cr min", "packaging": "Big bags 1MT", "origin": "South Africa"}, {"name": "Ferro-Chrome 65% High Carbon", "gradePercent": "65%", "sizeMm": "10-100mm", "carbonPercent": "6-8%", "purityPercent": "65% Cr min", "packaging": "Big bags 1MT", "origin": "South Africa / India"}, {"name": "Ferro-Chrome 65% Medium Carbon", "gradePercent": "65%", "sizeMm": "10-80mm", "carbonPercent": "1-4%", "purityPercent": "65% Cr min", "packaging": "Big bags 1MT", "origin": "South Africa"}]',
  true,
  true
),

-- 3. Ferro Manganese
(
  'Ferro Manganese',
  'ferro-manganese',
  'ferro_alloy',
  'High-quality ferro manganese for steel production and alloying across grades.',
  '/images/products/ferro-manganese.jpeg',
  '{"Mn": "65–78%", "C": "0.5–7%", "Si": "1–2%", "Form": "Lumps", "Size": "10–80mm"}',
  '{"origin": "India, South Africa, China, Ukraine", "quality": "High Carbon / Medium Carbon / Low Carbon", "form": "Lumps", "packaging": "Big bags (1–1.5 MT)", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[{"name": "Ferro-Manganese (High Carbon)", "gradePercent": "75%", "sizeMm": "10-80mm", "carbonPercent": "6-7%", "purityPercent": "75% Mn min", "packaging": "Big bags 1MT", "origin": "India / South Africa"}, {"name": "Ferro-Manganese (Medium Carbon)", "gradePercent": "78%", "sizeMm": "10-80mm", "carbonPercent": "1-2%", "purityPercent": "78% Mn min", "packaging": "Big bags 1MT", "origin": "India / China"}, {"name": "Ferro-Manganese (Low Carbon)", "gradePercent": "80%", "sizeMm": "10-60mm", "carbonPercent": "0.5% max", "purityPercent": "80% Mn min", "packaging": "Big bags 1MT", "origin": "India"}]',
  true,
  true
),

-- 4. Silico Manganese
(
  'Silico Manganese',
  'silico-manganese',
  'ferro_alloy',
  'Combined silicon-manganese alloy for efficient steel production and deoxidation.',
  '/images/products/silico-manganese.jpeg',
  '{"Mn": "65–68%", "Si": "16–21%", "C": "2% max", "Form": "Lumps", "Size": "10–80mm"}',
  '{"origin": "India, Georgia, Ukraine, Malaysia", "quality": "SiMn 65/16 Standard", "form": "Lumps", "packaging": "Big bags (1–1.5 MT)", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  true
),

-- 5. Ferro Phosphorus
(
  'Ferro Phosphorus',
  'ferro-phosphorus',
  'ferro_alloy',
  'Ferro phosphorus used as a phosphorus additive in steelmaking and foundry applications.',
  NULL,
  '{"P": "23–28%", "Si": "2–5%", "Mn": "2–4%", "Form": "Lumps", "Size": "10–50mm"}',
  '{"origin": "China, India", "quality": "FeP 24% Standard", "form": "Lumps", "packaging": "Big bags or drums", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- ======== NOBLE ALLOYS ========

-- 6. Ferro Molybdenum
(
  'Ferro Molybdenum',
  'ferro-molybdenum',
  'noble_alloy',
  'Ferro molybdenum for high-strength low-alloy steels and specialty applications.',
  '/images/products/ferro-molybdenum.jpeg',
  '{"Mo": "60–70%", "C": "0.1% max", "Si": "1% max", "Form": "Lumps", "Size": "10–50mm"}',
  '{"origin": "China, Chile, Netherlands, Belgium", "quality": "FeMo 60% / FeMo 65%", "form": "Lumps", "packaging": "Drums (200–250 kg)", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate, Certificate of Origin", "weighingSampling": "At loading port per industry standards"}',
  '[{"name": "Ferro-Molybdenum 60%", "gradePercent": "60%", "sizeMm": "10-50mm", "carbonPercent": "0.1% max", "purityPercent": "60% Mo min", "packaging": "Drums 250kg", "origin": "China / Chile"}, {"name": "Ferro-Molybdenum 65%", "gradePercent": "65%", "sizeMm": "10-50mm", "carbonPercent": "0.1% max", "purityPercent": "65% Mo min", "packaging": "Drums 250kg", "origin": "Netherlands / Belgium"}]',
  true,
  true
),

-- 7. Ferro Vanadium
(
  'Ferro Vanadium',
  'ferro-vanadium',
  'noble_alloy',
  'High-purity ferro vanadium for specialty and high-strength steel applications.',
  '/images/products/ferro-vanadium.jpeg',
  '{"V": "50–80%", "C": "0.5% max", "Si": "2% max", "Form": "Lumps", "Size": "10–50mm"}',
  '{"origin": "China, South Africa, Brazil", "quality": "FeV 50% / FeV 80%", "form": "Lumps", "packaging": "Drums (200–250 kg)", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  true
),

-- 8. Ferro Titanium
(
  'Ferro Titanium',
  'ferro-titanium',
  'noble_alloy',
  'Ferro titanium for deoxidation and micro-alloying in steel production.',
  '/images/products/ferro-titanium.jpeg',
  '{"Ti": "25–70%", "Al": "5–10%", "C": "0.1% max", "Form": "Lumps", "Size": "10–50mm"}',
  '{"origin": "UK, China, India", "quality": "FeTi 70% (Western) / Titanium Sponge", "form": "Lumps, Sponge", "packaging": "Drums or big bags", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[{"name": "Ferro-Titanium 70% (Western)", "gradePercent": "70%", "sizeMm": "10-50mm", "carbonPercent": "0.1% max", "purityPercent": "70% Ti min", "packaging": "Drums", "origin": "UK"}, {"name": "Titanium (Sponge)", "gradePercent": "99%+", "sizeMm": "0.8-12.7mm", "carbonPercent": "0.02% max", "purityPercent": "99%+ Ti", "packaging": "Drums", "origin": "Japan / Kazakhstan"}]',
  true,
  true
),

-- 9. Ferro Tungsten
(
  'Ferro Tungsten',
  'ferro-tungsten',
  'noble_alloy',
  'Ferro tungsten for high-speed steels, tool steels, and wear-resistant alloys.',
  '/images/products/ferro-tungsten.jpeg',
  '{"W": "70–80%", "C": "0.5% max", "Mn": "0.5% max", "Form": "Lumps", "Size": "10–50mm"}',
  '{"origin": "China", "quality": "FeW 75% (Chinese)", "form": "Lumps", "packaging": "Drums", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[{"name": "Ferro-Tungsten (Chinese 75%)", "gradePercent": "75%", "sizeMm": "10-50mm", "carbonPercent": "0.5% max", "purityPercent": "75% W min", "packaging": "Drums", "origin": "China"}]',
  true,
  false
),

-- 10. Ferro Niobium
(
  'Ferro Niobium',
  'ferro-niobium',
  'noble_alloy',
  'Ferro niobium for micro-alloying in HSLA steels and superalloy applications.',
  '/images/products/ferro-niobium.jpeg',
  '{"Nb": "60–70%", "C": "0.1% max", "Si": "3% max", "Form": "Lumps", "Size": "10–50mm"}',
  '{"origin": "Brazil", "quality": "FeNb 66%", "form": "Lumps", "packaging": "Drums", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  true
),

-- 11. Ferro Boron
(
  'Ferro Boron',
  'ferro-boron',
  'noble_alloy',
  'Ferro boron for hardening steel and improving mechanical properties.',
  '/images/products/ferro-boron.jpeg',
  '{"B": "17–20%", "C": "0.5% max", "Si": "2% max", "Form": "Lumps / Powder", "Size": "10–50mm"}',
  '{"origin": "China", "quality": "FeB 18%", "form": "Lumps, Powder", "packaging": "Drums or bags", "lotSizeTolerance": "As per contract", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- ======== MINOR METALS ========

-- 12. Antimony
(
  'Antimony',
  'antimony',
  'minor_metal',
  'Antimony metal and trioxide for flame retardants, batteries, and alloys.',
  '/images/products/antimony.jpeg',
  '{"Sb": "99.65%+", "As": "0.1% max", "Pb": "0.1% max", "Form": "Ingots"}',
  '{"origin": "China, Tajikistan, Bolivia", "form": "Ingots", "packaging": "On pallets, banded", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 13. Chromium
(
  'Chromium',
  'chromium',
  'minor_metal',
  'Aluminothermic and electrolytic chromium metal for superalloys and aerospace applications.',
  '/images/products/chromium.jpeg',
  '{"Cr": "99%+", "Al": "0.5% max", "Fe": "0.3% max", "Form": "Lumps / Powder"}',
  '{"origin": "China", "form": "Lumps, Powder, Briquettes", "packaging": "Drums or big bags", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 14. Cobalt
(
  'Cobalt',
  'cobalt',
  'minor_metal',
  'Cobalt metal for batteries, superalloys, and catalytic applications.',
  '/images/products/cobalt.jpeg',
  '{"Co": "99.8%+", "Ni": "0.05% max", "Fe": "0.01% max", "Form": "Cathodes / Briquettes"}',
  '{"origin": "DRC, Zambia, Finland, China", "form": "Cathodes, Briquettes, Powder", "packaging": "Drums or on pallets", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 15. Hafnium
(
  'Hafnium',
  'hafnium',
  'minor_metal',
  'Hafnium metal for nuclear, aerospace, and high-temperature applications.',
  '/images/products/hafnium.jpeg',
  '{"Hf": "97%+", "Zr": "2.5% max", "Fe": "0.1% max", "Form": "Crystal Bar / Sponge"}',
  '{"origin": "France, USA", "form": "Crystal Bar, Sponge", "packaging": "Drums", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 16. Manganese
(
  'Manganese',
  'manganese',
  'minor_metal',
  'Electrolytic manganese metal for special alloys and steel production.',
  '/images/products/manganese.jpeg',
  '{"Mn": "99.7%+", "Fe": "0.01% max", "Se": "0.01% max", "Form": "Flakes"}',
  '{"origin": "China, South Africa", "form": "Flakes, Briquettes", "packaging": "Drums or big bags", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 17. Molybdenum
(
  'Molybdenum',
  'molybdenum',
  'minor_metal',
  'Molybdenum metal for high-temperature and high-strength alloy applications.',
  NULL,
  '{"Mo": "99.95%+", "Fe": "0.01% max", "O": "0.01% max", "Form": "Powder / Wire / Sheet"}',
  '{"origin": "China, Chile, USA", "form": "Powder, Wire, Sheet, Rod", "packaging": "Drums or cases", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 18. Niobium (Colombium)
(
  'Niobium (Colombium)',
  'niobium',
  'minor_metal',
  'Niobium metal for superconductors, micro-alloying, and aerospace applications.',
  NULL,
  '{"Nb": "99.9%+", "Ta": "0.1% max", "Fe": "0.01% max", "Form": "Ingots / Powder"}',
  '{"origin": "Brazil", "form": "Ingots, Powder, Strip", "packaging": "Drums or cases", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 19. Silicon
(
  'Silicon',
  'silicon',
  'minor_metal',
  'High-purity silicon metal for aluminium, chemical, and solar industries.',
  '/images/products/silicon.jpeg',
  '{"Si": "99%+", "Fe": "0.4% max", "Al": "0.3% max", "Form": "Lumps", "Size": "10–100mm"}',
  '{"origin": "China, Brazil, Norway, France", "form": "Lumps", "packaging": "Big bags (1–1.5 MT)", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 20. Titanium
(
  'Titanium',
  'titanium',
  'minor_metal',
  'Titanium sponge and ingots for aerospace, medical, and industrial applications.',
  NULL,
  '{"Ti": "99.5%+", "Fe": "0.15% max", "O": "0.1% max", "Form": "Sponge / Ingots"}',
  '{"origin": "Japan, Kazakhstan, China", "form": "Sponge, Ingots", "packaging": "Drums", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 21. Tungsten
(
  'Tungsten',
  'tungsten',
  'minor_metal',
  'Tungsten metal for hard metals, lighting, electronics, and high-temperature applications.',
  NULL,
  '{"W": "99.95%+", "Mo": "0.01% max", "Fe": "0.01% max", "Form": "Powder / Wire / Rod"}',
  '{"origin": "China, Vietnam", "form": "Powder, Wire, Rod, APT", "packaging": "Drums or cases", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 22. Vanadium
(
  'Vanadium',
  'vanadium',
  'minor_metal',
  'Vanadium pentoxide and metal for steel micro-alloying and energy storage.',
  NULL,
  '{"V": "99.5%+", "Fe": "0.05% max", "Si": "0.05% max", "Form": "Flake / Powder"}',
  '{"origin": "China, South Africa, Brazil", "form": "Flake, Powder, Pentoxide", "packaging": "Drums", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 23. Yttrium
(
  'Yttrium',
  'yttrium',
  'minor_metal',
  'Yttrium metal for ceramics, phosphors, lasers, and superalloy applications.',
  '/images/products/yttrium.jpeg',
  '{"Y": "99.9%+", "Fe": "0.01% max", "Form": "Lumps / Powder"}',
  '{"origin": "China", "form": "Lumps, Powder, Oxide", "packaging": "Drums", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
),

-- 24. Zirconium
(
  'Zirconium',
  'zirconium',
  'minor_metal',
  'Zirconium metal for nuclear, chemical processing, and corrosion-resistant applications.',
  '/images/products/zirconium.jpeg',
  '{"Zr": "99.5%+", "Hf": "1% max", "Fe": "0.1% max", "Form": "Sponge / Ingots"}',
  '{"origin": "USA, France, China", "form": "Sponge, Ingots, Powder", "packaging": "Drums", "documentation": "Certificate of Analysis, Weight Certificate", "weighingSampling": "At loading port per industry standards"}',
  '[]',
  true,
  false
);


-- ============================================================
-- BLOG POSTS
-- ============================================================

INSERT INTO blog_posts (title, slug, excerpt, content, category, featured_image, author, status, is_featured, published_at) VALUES

-- 1. Global Ferro Alloys Market Outlook 2025
(
  'Global Ferro Alloys Market Outlook 2025',
  'global-ferro-alloys-market-outlook-2025',
  'An analysis of key trends shaping the ferro alloys market and what to expect in the coming year.',
  '<h2>Global Ferro Alloys Market Outlook 2025</h2>
<p>The global ferro alloys market is entering 2025 with a complex mix of challenges and opportunities. After a period of significant volatility driven by supply chain disruptions and shifting demand patterns, the industry is showing signs of stabilization while adapting to new market realities.</p>

<h3>Key Market Drivers</h3>
<p>Steel production remains the primary demand driver for ferro alloys, and global crude steel output is projected to grow modestly in 2025. Infrastructure development initiatives across Asia, the Middle East, and Africa continue to support demand for structural steel, which in turn sustains requirements for ferro silicon, ferro manganese, and ferro chrome.</p>

<p>The energy transition is creating new demand streams for several ferro alloys. The expansion of wind energy infrastructure requires significant quantities of manganese and molybdenum for high-strength steel components, while the growing electric vehicle sector is driving demand for vanadium in battery technologies.</p>

<h3>Supply Landscape</h3>
<p>On the supply side, major producing regions are facing a variety of pressures. Energy costs in Europe have led to reduced smelting capacity, while environmental regulations in China continue to constrain output from some facilities. South Africa and India are expected to play increasingly important roles in ferro chrome and ferro manganese supply chains.</p>

<h3>Price Outlook</h3>
<p>Prices for most ferro alloys are expected to remain supported by tight supply conditions, although significant upside may be limited by the moderate pace of steel production growth. Noble alloys such as ferro molybdenum and ferro vanadium may see more pronounced price movements due to their smaller market size and sensitivity to changes in specialty steel demand.</p>

<h3>Conclusion</h3>
<p>Stakeholders in the ferro alloys industry should prepare for a year of cautious optimism. Strategic procurement planning, diversified supply chains, and close monitoring of geopolitical developments will be essential for navigating the market effectively in 2025.</p>',
  'market-insights',
  '/images/blog/market-outlook.jpg',
  'ASZ Company FZCO',
  'published',
  true,
  '2025-01-15T00:00:00Z'
),

-- 2. Understanding Ferro Silicon Grades and Applications
(
  'Understanding Ferro Silicon Grades and Applications',
  'understanding-ferro-silicon-grades',
  'A comprehensive guide to different ferro silicon grades and their industrial applications.',
  '<h2>Understanding Ferro Silicon Grades and Applications</h2>
<p>Ferro silicon is one of the most widely used ferro alloys in the steel and foundry industries. Its versatility stems from the range of grades available, each tailored to specific applications and production requirements. This guide provides an overview of the main ferro silicon grades and how they are used across different industrial sectors.</p>

<h3>What is Ferro Silicon?</h3>
<p>Ferro silicon is an alloy of iron and silicon, produced by reducing quartz (silica) with coke in the presence of iron in an electric arc furnace. The silicon content typically ranges from 15% to 90%, with the most common commercial grades being FeSi 75% and FeSi 65%.</p>

<h3>Common Grades</h3>
<p>The standard grade, FeSi 75%, contains approximately 72-78% silicon and is the workhorse of the industry. It is primarily used as a deoxidizer in steelmaking, removing unwanted oxygen from molten steel to improve its quality and mechanical properties. This grade is supplied in lump form (10-60mm) and is sourced from major producing countries including China, Brazil, and Norway.</p>

<p>Lower silicon grades (45-65%) are often preferred in foundry applications, where they serve as an inoculant to promote the formation of graphite in cast iron. Higher purity grades (above 90% Si) are used in the chemical industry and for producing specialty silicones.</p>

<h3>Applications in Steelmaking</h3>
<p>In steelmaking, ferro silicon serves multiple functions. As a deoxidizer, it reacts with dissolved oxygen in molten steel to form silica, which floats to the surface as slag. As an alloying element, silicon increases the strength and hardness of steel and improves its resistance to oxidation at high temperatures. Electrical steels used in transformers and motors contain 2-4% silicon to reduce energy losses.</p>

<h3>Quality Considerations</h3>
<p>When sourcing ferro silicon, buyers should pay close attention to the aluminium and carbon content, as these impurities can affect steel quality. Particle size distribution is also critical, as it influences the dissolution rate in molten metal. Reputable suppliers provide detailed Certificates of Analysis for each shipment, ensuring that the material meets the required specifications.</p>

<h3>Conclusion</h3>
<p>Selecting the right ferro silicon grade is essential for achieving optimal results in steel production and foundry operations. Working with an experienced trading partner who understands the technical requirements of different applications can help ensure consistent quality and reliable supply.</p>',
  'technical-articles',
  '/images/blog/ferro-silicon-guide.jpg',
  'ASZ Company FZCO',
  'published',
  false,
  '2025-01-10T00:00:00Z'
),

-- 3. ASZ Company FZCO Joins the MMTA
(
  'ASZ Company FZCO Joins the MMTA',
  'asz-joins-mmta',
  'We are proud to announce our membership with the Minor Metals Trade Association.',
  '<h2>ASZ Company FZCO Joins the MMTA</h2>
<p>We are pleased to announce that ASZ Company FZCO has been accepted as a member of the Minor Metals Trade Association (MMTA), the international industry body representing companies involved in the trading, production, and recycling of minor metals and ferro alloys.</p>

<h3>About the MMTA</h3>
<p>The MMTA is a globally recognized organization that serves as the principal representative body for the minor metals industry. With members spanning over 30 countries, the association promotes best practices in trading, provides market intelligence, and facilitates networking among industry professionals. Membership in the MMTA is a mark of credibility and commitment to high standards in the metals trade.</p>

<h3>What This Means for Our Clients</h3>
<p>Our MMTA membership reinforces our commitment to transparency, quality, and ethical trading practices. As a member, ASZ Company FZCO adheres to the MMTA''s trading rules and guidelines, which provide a framework for fair and efficient commerce in minor metals. Our clients can be confident that their transactions are conducted in accordance with internationally recognized standards.</p>

<p>In addition, our membership gives us access to the MMTA''s extensive network of producers, traders, and end-users, enabling us to better serve our clients with competitive pricing, reliable supply, and deep market insight across the full range of minor metals and ferro alloys.</p>

<h3>Our Commitment</h3>
<p>This milestone reflects the growth and maturation of ASZ Company FZCO as a trusted participant in the global metals trade. Based in Dubai, UAE, we continue to expand our capabilities in sourcing and supplying ferro alloys, noble alloys, and minor metals to customers worldwide. Our MMTA membership is another step in our ongoing effort to provide the highest level of service and reliability to our partners.</p>

<h3>Looking Ahead</h3>
<p>We look forward to contributing to the MMTA community and to leveraging this partnership to bring even greater value to our customers. For inquiries about our products or trading services, please do not hesitate to contact our team.</p>',
  'company-updates',
  '/images/blog/expansion.jpg',
  'ASZ Company FZCO',
  'published',
  false,
  '2025-01-05T00:00:00Z'
);
