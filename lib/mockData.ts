import { Product } from "@/types/product";

export const mockProducts: Product[] = [
    {
        id: "1",
        slug: "brno-brutalism-01",
        name: {
            en: "Thermal Brno Print",
            cs: "Termální Brno Tisk"
        },
        description: {
            en: "A minimalist interpretation of Brno's iconic modernist architecture. Printed on 240g archival paper with a matte finish.",
            cs: "Minimalistická interpretace ikonické modernistické architektury Brna. Tištěno na archivní papír 240g s matným povrchem."
        },
        designStory: {
            en: "This piece captures the raw concrete textures and rhythmic windows of the legendary Hotel Thermal, a beacon of Brno's brutalist heritage. It explores the tension between industrial coldness and structural elegance.",
            cs: "Tento kousek zachycuje syrové betonové textury a rytmická okna legendárního hotelu Thermal, majáku brněnského brutalistického dědictví. Zkoumá napětí mezi industriální chladností a strukturální elegancí."
        },
        brnoAttributes: ["Brutalism", "Modernist", "Concrete Soul", "Series 01"],
        mainImage: "https://images.unsplash.com/photo-1541462608141-ad4d4f942eb2?auto=format&fit=crop&q=80&w=1000",
        gallery: [],
        category: "prints",
        basePrice: 790,
        variants: [
            { id: "v1", name: { en: "A3", cs: "A3" }, stock: 10, priceAdjustment: 0 },
            { id: "v2", name: { en: "50x70", cs: "50x70" }, stock: 5, priceAdjustment: 400 }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active"
    },
    {
        id: "2",
        slug: "spilberk-coordinates-tee",
        name: {
            en: "Spilberk Coordinates Tee",
            cs: "Tričko Souřadnice Špilberk"
        },
        description: {
            en: "Heavyweight organic cotton tee featuring the exact map coordinates of the Spilberk Castle.",
            cs: "Tričko z těžké organické bavlny s přesnými souřadnicemi hradu Špilberk."
        },
        designStory: {
            en: "A tribute to the fortress that has guarded Brno for centuries, reimagined as a clean topographic element.",
            cs: "Pocta pevnosti, která po staletí střežila Brno, přetvořená jako čistý topografický prvek."
        },
        brnoAttributes: ["Medieval", "Fortress", "Topographic"],
        mainImage: "https://images.unsplash.com/photo-1576566582417-483568903c15?auto=format&fit=crop&q=80&w=1000",
        gallery: [],
        category: "apparel",
        basePrice: 890,
        variants: [
            { id: "s1", name: { en: "S", cs: "S" }, stock: 10, priceAdjustment: 0 },
            { id: "s2", name: { en: "M", cs: "M" }, stock: 10, priceAdjustment: 0 },
            { id: "s3", name: { en: "L", cs: "L" }, stock: 10, priceAdjustment: 0 }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active"
    },
    {
        id: "3",
        slug: "brno-functionalism-mug",
        name: {
            en: "Vila Tugendhat Mug",
            cs: "Hrnek Vila Tugendhat"
        },
        description: {
            en: "A premium ceramic mug featuring the clean architectural lines of Brno's most famous functionalist villa.",
            cs: "Prémiový keramický hrnek s čistými architektonickými liniemi nejslavnější brněnské funkcionalistické vily."
        },
        designStory: {
            en: "Less is more. This mug translates the philosophy of Mies van der Rohe into a daily ritual accessory. The grid pattern reflects the iconic onyx wall's rhythmic structure.",
            cs: "Méně je více. Tento hrnek převádí filosofii Ludwiga Miese van der Rohe do doplňku pro každodenní rituály. Mřížkový vzor odráží rytmickou strukturu ikonické onyxové stěny."
        },
        brnoAttributes: ["Functionalism", "UNESCO", "Modernism", "Tugendhat"],
        mainImage: "https://images.unsplash.com/photo-1514228742587-6b1558fbed20?auto=format&fit=crop&q=80&w=1000",
        gallery: [],
        category: "decor",
        basePrice: 390,
        variants: [
            { id: "m1", name: { en: "330ml", cs: "330ml" }, stock: 50, priceAdjustment: 0 },
            { id: "m2", name: { en: "450ml", cs: "450ml" }, stock: 30, priceAdjustment: 100 }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active"
    },
    {
        id: "4",
        slug: "brno-black-field-tote",
        name: {
            en: "Cerna Pole Tote Bag",
            cs: "Taška Černá Pole"
        },
        description: {
            en: "Durable canvas tote bag inspired by the history of Brno's first garden suburb.",
            cs: "Odolná plátěná taška inspirovaná historií první brněnské zahradní čtvrti."
        },
        designStory: {
            en: "Combining botanical motifs with urban geometry, this tote tells the story of Brno's green lungs and its residential elegance.",
            cs: "Kombinace botanických motivů s městskou geometrií, tato taška vypráví příběh brněnských zelených plic a rezidenční elegance."
        },
        brnoAttributes: ["Garden Suburb", "Canvas", "Eco-friendly", "Urban Green"],
        mainImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000",
        gallery: [],
        category: "apparel",
        basePrice: 450,
        variants: [
            { id: "t1", name: { en: "Standard", cs: "Standard" }, stock: 20, priceAdjustment: 0 }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active"
    },
    {
        id: "5",
        slug: "brno-dragon-print",
        name: {
            en: "Crocodile Myth Print",
            cs: "Grafika Brněnský drak"
        },
        description: {
            en: "A dark, atmospheric take on the legendary 'Brno Dragon' (actually a crocodile) hanging in the Old Town Hall.",
            cs: "Temné a atmosférické pojetí legendárního 'Brněnského draka' (původem krokodýla), který visí ve Staré radnici."
        },
        designStory: {
            en: "Every city needs its monster. This print explores the myth of the dragon through a contemporary lens, mixing folklore with street art elements.",
            cs: "Každé město potřebuje své monstrum. Tento tisk zkoumá mýtus draka současným pohledem, mísí folklór s prvky street artu."
        },
        brnoAttributes: ["Folklore", "Mythology", "Old Town", "Legend"],
        mainImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1000",
        gallery: [],
        category: "prints",
        basePrice: 850,
        variants: [
            { id: "p1", name: { en: "A3", cs: "A3" }, stock: 15, priceAdjustment: 0 },
            { id: "p2", name: { en: "50x70", cs: "50x70" }, stock: 10, priceAdjustment: 400 }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active"
    }
];

export const mockJournalPosts = [
    {
        id: "j1",
        slug: "brutalist-soul-brno",
        title: {
            en: "The Brutalist Soul of Brno",
            cs: "Brutalistní duše Brna"
        },
        excerpt: {
            en: "Exploring the raw concrete beauty of the city's most misunderstood architectural era.",
            cs: "Zkoumání syrové betonové krásy nejméně pochopené architektonické éry města."
        },
        content: {
            en: "Brno isn't just about functionalist villas. It's a city of layers...",
            cs: "Brno nejsou jen funkcionalistické vily. Je to město vrstev..."
        },
        category: "Architecture",
        publishedAt: "2024-03-15",
        mainImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1000",
        readTime: "5 min"
    },
    {
        id: "j2",
        slug: "designing-spilberk-collection",
        title: {
            en: "Designing the Spilberk Collection",
            cs: "Navrhování kolekce Špilberk"
        },
        excerpt: {
            en: "A behind-the-scenes look at how we translated a medieval fortress into a minimalist streetwear collection.",
            cs: "Pohled do zákulisí toho, jak jsme přeložili středověkou pevnost do minimalistické streetwearové kolekce."
        },
        content: {
            en: "The fortress of Spilberk has stood over Brno for centuries...",
            cs: "Pevnost Špilberk stojí nad Brnem po staletí..."
        },
        category: "Process",
        publishedAt: "2024-03-10",
        mainImage: "https://images.unsplash.com/photo-1493397212122-2b85def8d090?auto=format&fit=crop&q=80&w=1000",
        readTime: "4 min"
    }
];
