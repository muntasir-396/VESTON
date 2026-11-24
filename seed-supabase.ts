import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error("⚠️ ERROR: Mising VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log('Seeding Supabase...');

    const products = [
        { 
            name: "Double-Breasted Tailored Blazer Dress", 
            price: 890.00, 
            category: "Dresses", 
            image: "/products/double-breasted-blazer-coat.jpg", 
            description: "Architectural double-breasted long blazer coat dress with sharp peak lapels and structured masculine tailoring in pure virgin wool.", 
            is_available: 1, 
            color: "Charcoal", 
            size: "XS,S,M,L" 
        },
        { 
            name: "Tailored Single-Breasted Wool Overcoat", 
            price: 720.00, 
            category: "Outerwear", 
            image: "/products/tailored-wool-overcoat.jpg", 
            description: "Timeless single-breasted overcoat tailored from heavyweight wool with notch lapels, structured shoulders, and angled welt pockets.", 
            is_available: 1, 
            color: "Black", 
            size: "S,M,L,XL" 
        },
        { 
            name: "Laser-Print Denim Coach Jacket", 
            price: 560.00, 
            category: "Outerwear", 
            image: "/products/laser-print-denim-coach-jacket.jpg", 
            description: "Contemporary streetwear denim jacket featuring laser-etched allover monogram patterning, point collar, and matte silver snap closures.", 
            is_available: 1, 
            color: "Indigo", 
            size: "S,M,L,XL" 
        },
        { 
            name: "Reversible Monogram Nylon Tracktop", 
            price: 490.00, 
            category: "Outerwear", 
            image: "/products/monogram-nylon-tracktop.jpg", 
            description: "Sport-luxe technical windbreaker jacket engineered with lightweight water-resistant nylon and tonal allover monogram motif.", 
            is_available: 1, 
            color: "Navy", 
            size: "S,M,L,XL" 
        },
        { 
            name: "Textured Wool Knit Buttoned Cardigan", 
            price: 360.00, 
            category: "Knitwear", 
            image: "/products/textured-knit-cardigan.jpg", 
            description: "Artisanal melange textured knit jacket cardigan crafted from rich wool yarns, featuring a crew neckline and tonal horn buttons.", 
            is_available: 1, 
            color: "Brown", 
            size: "S,M,L,XL" 
        },
        { 
            name: "Fine Merino Wool Turtleneck Sweater", 
            price: 290.00, 
            category: "Knitwear", 
            image: "/products/cashmere-ribbed-turtleneck.jpg", 
            description: "Sleek second-skin fine-gauge merino wool turtleneck sweater with seamless tubular knit construction and refined ribbed cuffs.", 
            is_available: 1, 
            color: "Black", 
            size: "S,M,L,XL" 
        },
        { 
            name: "Straight-Leg Ecru Denim Trousers", 
            price: 280.00, 
            category: "Bottoms", 
            image: "/products/straight-leg-ecru-denim.jpg", 
            description: "Tailored straight-cut trousers constructed from heavyweight premium Japanese ecru denim with refined tonal stitching.", 
            is_available: 1, 
            color: "Ecru", 
            size: "30,32,34,36" 
        },
        { 
            name: "Monogram Printed Graphic T-Shirt", 
            price: 240.00, 
            category: "Tops", 
            image: "/products/monogram-printed-tee.jpg", 
            description: "Luxury relaxed-fit tee cut from heavyweight organic cotton jersey with signature heritage monogram graphics.", 
            is_available: 1, 
            color: "Navy", 
            size: "S,M,L,XL,XXL" 
        }
    ];


    const categories = [
        { id: '1', name: 'Women', slug: 'women', description: 'Luxury apparel and accessories for women.', parentId: null, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800" },
        { id: '1-1', name: 'Dresses', slug: 'women-dresses', description: null, parentId: '1', image: null },
        { id: '1-2', name: 'Outerwear', slug: 'women-outerwear', description: null, parentId: '1', image: null },
        { id: '1-3', name: 'Handbags', slug: 'women-handbags', description: null, parentId: '1', image: null },
        { id: '2', name: 'Men', slug: 'men', description: 'Sophisticated tailoring and essentials for men.', parentId: null, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800" },
        { id: '2-1', name: 'Suits', slug: 'men-suits', description: null, parentId: '2', image: null },
        { id: '2-2', name: 'Accessories', slug: 'men-accessories', description: null, parentId: '2', image: null },
        { id: '3', name: 'Accessories', slug: 'accessories', description: 'The finishing touches for any ensemble.', parentId: null, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800" }
    ];

    // Clear existing products to prevent duplicates
    const { error: dErr } = await supabase.from('products').delete().neq('id', 0);
    if (dErr) console.error("Error clearing products:", dErr);
    else console.log("Existing products cleared!");

    const { error: pErr } = await supabase.from('products').upsert(products);
    if (pErr) console.error("Error products:", pErr);
    else console.log("Products seeded!");

    const { error: cErr } = await supabase.from('categories').upsert(categories.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        parentid: c.parentId,
        image: c.image
    })));
    if (cErr) console.error("Error categories:", cErr);
    else console.log("Categories seeded!");

    console.log('Seeding Complete.');
}

seed();
