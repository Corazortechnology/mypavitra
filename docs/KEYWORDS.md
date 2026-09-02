# Keyword Strategy & Content Map

> SEO/AEO keyword architecture for all 9 launch markets.
> See also: [GO_TO_MARKET.md](./GO_TO_MARKET.md)

---

## Title Formula (Products + Google Shopping)

```
{Material} {Product Type} — {Use Case} | {Indian Name} | {Brand}
```

Example: `Brass Diya Oil Lamp — Daily Puja & Diwali | Deepak | MyPavitra`

---

## India — Tier 1 Keywords (Launch Priority)

### Transactional
| Keyword | Page type | Content action |
|---------|-----------|----------------|
| puja samagri online | Category | /categories/puja-samagri |
| pooja samagri kit | Bundle index | /bundles |
| brass diya online | PDP + category | /categories/diyas |
| brass pooja thali set | PDP + category | /categories/pooja-thali |
| puja kit for home | Bundle | /bundles/new-home-puja-kit |
| daily puja samagri list | Guide | /guides/daily-puja-items-list |
| diwali puja kit | Festival + bundle | /festivals/diwali |
| diwali puja samagri list | Guide P0 | /guides/diwali-puja-samagri-list |
| jain puja samagri | Category | /categories/jain-puja-products |
| cotton wicks for diya | PDP | Product page |
| camphor for puja | PDP | Product page |
| brass kalash online | PDP | Product page |

### Festival clusters
| Festival | Primary keywords |
|----------|------------------|
| Diwali | diwali puja items, lakshmi puja samagri, dhanteras brass items |
| Navratri | navratri puja kit, navratri samagri list |
| Ganesh Chaturthi | ganesh puja kit, ganesh chaturthi samagri |
| Paryushan | jain paryushan puja items, jain samagri |
| Akshaya Tritiya | brass items akshaya tritiya, puja gifts |

---

## USA — Tier 1 Keywords

| Keyword | Page |
|---------|------|
| puja items usa | /us/ landing or /puja-items-usa |
| buy puja samagri online usa | Guide |
| hindu puja items online usa | Collection |
| brass diya oil lamp | US PDP |
| puja thali set brass | US PDP |
| diwali puja kit usa | /us/festivals/diwali |
| home temple setup items | Guide |
| indian spiritual gifts usa | /us/collections/gifting |
| camphor holder brass kapoor dani | US PDP (dual name) |
| jain puja items usa | /us/categories/jain-puja-products |

---

## UK / CA / AU / AE / SG / NZ / EU

Apply US pattern with market-specific hreflang pages. Research phrasing per market:
- UK: "puja thali set uk", "indian prayer items uk"
- CA: "diwali puja kit canada"
- AU: "hindu puja items australia"
- UAE: "puja items dubai delivery"

---

## Search Synonyms (Meilisearch index)

Seed these in `search_synonyms` table:

```json
[
  { "term": "diya", "synonyms": ["deepak", "deep", "lamp", "oil lamp"] },
  { "term": "agarbatti", "synonyms": ["incense", "incense sticks", "dhoop"] },
  { "term": "kalash", "synonyms": ["puja pot", "purna kalash", " sacred vessel"] },
  { "term": "thali", "synonyms": ["puja plate", "pooja thali", "aarti thali"] },
  { "term": "samai", "synonyms": ["jain oil lamp", "jain diya"] },
  { "term": "kapoor dani", "synonyms": ["camphor holder", "camphor burner"] },
  { "term": "murti", "synonyms": ["idol", "statue", "deity idol"] },
  { "term": "roli", "synonyms": ["red kumkum powder", "puja red powder"] },
  { "term": "akshat", "synonyms": ["puja rice", "sacred rice"] },
  { "term": "chandan", "synonyms": ["sandalwood paste", "sandalwood powder"] }
]
```

---

## Guide Content Backlog (90 days)

| Week | Guide | Primary keyword |
|------|-------|-----------------|
| 1 | Diwali Puja Samagri List | diwali puja samagri list |
| 1 | Daily Puja Items List | daily puja items list |
| 2 | What Is a Brass Diya? | what is brass diya |
| 2 | Puja Samagri USA Guide | puja samagri usa |
| 3 | Lakshmi Puja Essentials | lakshmi puja items |
| 3 | Jain Daily Puja Explained | jain puja samagri list |
| 4 | Brass vs Copper Puja Items | brass vs copper puja |
| 4 | New Home Puja Essentials | griha pravesh puja items |
| 5 | How to Clean Brass Diyas | how to clean brass diya |
| 6 | Navratri Puja Essentials | navratri puja items |
| 6 | Ganesh Chaturthi Guide | ganesh chaturthi puja samagri |

---

## AEO Answer Block Template

Every guide and major PDP section uses:

```markdown
## {Exact user question}?

**Short answer:** {40-60 word direct answer with item list or definition}

### Details
{Expanded content with table, steps, internal links}
```

This structure is optimized for Google AI Overviews and ChatGPT/Perplexity citation.
