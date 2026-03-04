import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('products', () => {
  // ─── Product Data ─────────────────────────────────────
  const products = ref([
    // RINGS
    {
      id: 1,
      name: 'The Eternity Band',
      category: 'rings',
      price: 1299,
      originalPrice: 1599,
      description:
        'A timeless eternity band crafted in 24K solid gold, adorned with brilliant-cut diamonds that encircle the entire ring. Each stone is hand-set by our master jewellers.',
      material: '24K Gold, Diamond',
      weight: '4.2g',
      rating: 4.9,
      reviews: 142,
      badge: 'Bestseller',
      images: ['ring1'],
    },
    {
      id: 2,
      name: 'Golden Solitaire',
      category: 'rings',
      price: 2450,
      originalPrice: null,
      description:
        'A stunning solitaire ring featuring a 1.5 carat diamond set in a classic 22K gold band. The epitome of timeless elegance.',
      material: '22K Gold, Diamond',
      weight: '3.8g',
      rating: 4.8,
      reviews: 98,
      badge: 'Premium',
      images: ['ring2'],
    },
    {
      id: 3,
      name: 'Rose Petal Ring',
      category: 'rings',
      price: 899,
      originalPrice: 1100,
      description:
        'Inspired by nature, this delicate rose gold ring features intricate petal detailing with micro-pavé diamonds.',
      material: '18K Rose Gold, Diamond',
      weight: '2.9g',
      rating: 4.7,
      reviews: 76,
      badge: null,
      images: ['ring3'],
    },
    {
      id: 4,
      name: 'Vintage Crown Ring',
      category: 'rings',
      price: 1850,
      originalPrice: null,
      description:
        'A majestic crown-inspired ring with Victorian-era design elements, handcrafted with ethically sourced gemstones.',
      material: '22K Gold, Sapphire, Diamond',
      weight: '5.1g',
      rating: 4.9,
      reviews: 54,
      badge: 'New',
      images: ['ring4'],
    },
    {
      id: 5,
      name: 'Twisted Infinity Band',
      category: 'rings',
      price: 750,
      originalPrice: 950,
      description:
        'An elegant twisted band symbolizing infinite love, crafted in polished 18K gold with a satin finish interior.',
      material: '18K Gold',
      weight: '3.2g',
      rating: 4.6,
      reviews: 189,
      badge: 'Popular',
      images: ['ring5'],
    },
    {
      id: 6,
      name: 'Diamond Cluster Ring',
      category: 'rings',
      price: 3200,
      originalPrice: null,
      description:
        'A breathtaking cluster of brilliant diamonds set in a flower pattern on a solid gold band. A true statement piece.',
      material: '24K Gold, Diamond',
      weight: '6.3g',
      rating: 5.0,
      reviews: 32,
      badge: 'Exclusive',
      images: ['ring6'],
    },

    // NECKLACES
    {
      id: 7,
      name: 'Golden Cascade Pendant',
      category: 'necklaces',
      price: 1750,
      originalPrice: 2100,
      description:
        'A cascading pendant of layered gold drops, each catching light from a different angle. Comes with an 18-inch chain.',
      material: '22K Gold',
      weight: '8.5g',
      rating: 4.8,
      reviews: 112,
      badge: 'Bestseller',
      images: ['necklace1'],
    },
    {
      id: 8,
      name: 'Pearl Teardrop Necklace',
      category: 'necklaces',
      price: 2200,
      originalPrice: null,
      description:
        'A lustrous South Sea pearl suspended from a delicate gold chain with diamond accent pieces.',
      material: '18K Gold, Pearl, Diamond',
      weight: '7.2g',
      rating: 4.9,
      reviews: 87,
      badge: 'Premium',
      images: ['necklace2'],
    },
    {
      id: 9,
      name: 'Serpent Chain Choker',
      category: 'necklaces',
      price: 1400,
      originalPrice: 1700,
      description:
        'A sleek serpent-style choker necklace in polished gold, sitting perfectly at the collarbone.',
      material: '22K Gold',
      weight: '12.4g',
      rating: 4.7,
      reviews: 65,
      badge: null,
      images: ['necklace3'],
    },
    {
      id: 10,
      name: 'Emerald Heart Pendant',
      category: 'necklaces',
      price: 2800,
      originalPrice: null,
      description:
        'A heart-shaped emerald surrounded by a halo of diamonds, suspended on a fine gold chain.',
      material: '22K Gold, Emerald, Diamond',
      weight: '6.8g',
      rating: 4.9,
      reviews: 43,
      badge: 'Exclusive',
      images: ['necklace4'],
    },
    {
      id: 11,
      name: 'Layered Gold Chains',
      category: 'necklaces',
      price: 980,
      originalPrice: 1200,
      description:
        'Three delicate gold chains of varying lengths worn together for a modern layered look.',
      material: '18K Gold',
      weight: '9.1g',
      rating: 4.6,
      reviews: 201,
      badge: 'Popular',
      images: ['necklace5'],
    },
    {
      id: 12,
      name: 'Royal Collar Necklace',
      category: 'necklaces',
      price: 4500,
      originalPrice: null,
      description:
        'A magnificent collar necklace inspired by royal jewellery, featuring intricate filigree work in solid gold.',
      material: '24K Gold, Ruby',
      weight: '28.5g',
      rating: 5.0,
      reviews: 18,
      badge: 'New',
      images: ['necklace6'],
    },

    // BRACELETS
    {
      id: 13,
      name: 'Classic Gold Bangle',
      category: 'bracelets',
      price: 1100,
      originalPrice: 1350,
      description:
        'A perfectly formed solid gold bangle with a mirror-polish finish. Timeless and versatile.',
      material: '22K Gold',
      weight: '15.2g',
      rating: 4.8,
      reviews: 156,
      badge: 'Bestseller',
      images: ['bracelet1'],
    },
    {
      id: 14,
      name: 'Diamond Tennis Bracelet',
      category: 'bracelets',
      price: 3800,
      originalPrice: null,
      description:
        'A stunning tennis bracelet featuring 42 brilliant-cut diamonds set in a continuous line of gold.',
      material: '18K Gold, Diamond',
      weight: '11.8g',
      rating: 4.9,
      reviews: 72,
      badge: 'Premium',
      images: ['bracelet2'],
    },
    {
      id: 15,
      name: 'Twisted Cuff Bracelet',
      category: 'bracelets',
      price: 890,
      originalPrice: 1100,
      description:
        'A bold twisted cuff bracelet with an open design, perfect for stacking or wearing solo.',
      material: '18K Gold',
      weight: '18.6g',
      rating: 4.7,
      reviews: 94,
      badge: null,
      images: ['bracelet3'],
    },
    {
      id: 16,
      name: 'Charm Link Bracelet',
      category: 'bracelets',
      price: 1650,
      originalPrice: null,
      description:
        'A delicate link chain bracelet with hanging gold charms. Each charm represents a different element of nature.',
      material: '22K Gold',
      weight: '10.3g',
      rating: 4.8,
      reviews: 128,
      badge: 'Popular',
      images: ['bracelet4'],
    },
    {
      id: 17,
      name: 'Pearl & Gold Wrap',
      category: 'bracelets',
      price: 1950,
      originalPrice: 2300,
      description:
        'Alternating pearls and gold beads on a flexible wrap bracelet. Adjustable to fit any wrist.',
      material: '22K Gold, Freshwater Pearl',
      weight: '13.7g',
      rating: 4.6,
      reviews: 55,
      badge: 'New',
      images: ['bracelet5'],
    },
    {
      id: 18,
      name: 'Royal Kundan Bangle',
      category: 'bracelets',
      price: 2750,
      originalPrice: null,
      description:
        'Traditional Kundan craftsmanship meets modern design. Encrusted with precious stones in gold.',
      material: '24K Gold, Kundan, Ruby',
      weight: '22.1g',
      rating: 5.0,
      reviews: 38,
      badge: 'Exclusive',
      images: ['bracelet6'],
    },

    // EARRINGS
    {
      id: 19,
      name: 'Golden Drop Earrings',
      category: 'earrings',
      price: 680,
      originalPrice: 850,
      description:
        'Elegant teardrop-shaped earrings in polished gold, catching light with every movement.',
      material: '18K Gold',
      weight: '3.4g',
      rating: 4.8,
      reviews: 203,
      badge: 'Bestseller',
      images: ['earring1'],
    },
    {
      id: 20,
      name: 'Diamond Stud Earrings',
      category: 'earrings',
      price: 1450,
      originalPrice: null,
      description:
        'Classic diamond studs set in gold with secure push-back closures. A must-have for every collection.',
      material: '22K Gold, Diamond',
      weight: '2.8g',
      rating: 4.9,
      reviews: 167,
      badge: 'Premium',
      images: ['earring2'],
    },
    {
      id: 21,
      name: 'Filigree Hoop Earrings',
      category: 'earrings',
      price: 520,
      originalPrice: 650,
      description:
        'Intricate filigree work on medium-sized hoop earrings. Lightweight and comfortable for all-day wear.',
      material: '18K Gold',
      weight: '4.1g',
      rating: 4.7,
      reviews: 89,
      badge: null,
      images: ['earring3'],
    },
    {
      id: 22,
      name: 'Chandelier Earrings',
      category: 'earrings',
      price: 2100,
      originalPrice: null,
      description:
        'Statement chandelier earrings with cascading gold droplets and diamond accents.',
      material: '22K Gold, Diamond',
      weight: '7.6g',
      rating: 4.9,
      reviews: 45,
      badge: 'Exclusive',
      images: ['earring4'],
    },
    {
      id: 23,
      name: 'Jhumka Gold Earrings',
      category: 'earrings',
      price: 780,
      originalPrice: 950,
      description:
        'Traditional jhumka earrings reimagined with a modern twist. Features delicate bell-shaped drops.',
      material: '22K Gold',
      weight: '5.9g',
      rating: 4.8,
      reviews: 134,
      badge: 'Popular',
      images: ['earring5'],
    },
    {
      id: 24,
      name: 'Emerald Dangle Earrings',
      category: 'earrings',
      price: 1800,
      originalPrice: null,
      description:
        'Vibrant emerald stones dangling from diamond-studded gold settings. A regal statement piece.',
      material: '22K Gold, Emerald, Diamond',
      weight: '6.2g',
      rating: 5.0,
      reviews: 28,
      badge: 'New',
      images: ['earring6'],
    },
  ])

  // ─── Categories ───────────────────────────────────────
  const categories = ref([
    {
      id: 'rings',
      name: 'Rings',
      description: 'Timeless bands of gold, crafted for eternity',
      icon: '💍',
      particleShape: 'torus',
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      description: 'Elegant chains that adorn with grace',
      icon: '📿',
      particleShape: 'heart',
    },
    {
      id: 'bracelets',
      name: 'Bracelets',
      description: 'Golden circles of endless beauty',
      icon: '⭕',
      particleShape: 'bangle',
    },
    {
      id: 'earrings',
      name: 'Earrings',
      description: 'Drops of gold that dance with light',
      icon: '✨',
      particleShape: 'teardrop',
    },
  ])

  // ─── Cart ─────────────────────────────────────────────
  const cart = ref([])
  const isCartOpen = ref(false)

  const cartTotal = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const cartCount = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  function addToCart(product) {
    const existing = cart.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
    isCartOpen.value = true
  }

  function removeFromCart(productId) {
    cart.value = cart.value.filter((item) => item.id !== productId)
  }

  function updateQuantity(productId, quantity) {
    const item = cart.value.find((item) => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    cart.value = []
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  // ─── Wishlist ─────────────────────────────────────────
  const wishlist = ref([])

  function toggleWishlist(productId) {
    const index = wishlist.value.indexOf(productId)
    if (index > -1) {
      wishlist.value.splice(index, 1)
    } else {
      wishlist.value.push(productId)
    }
  }

  function isInWishlist(productId) {
    return wishlist.value.includes(productId)
  }

  // ─── Getters ──────────────────────────────────────────
  function getProductsByCategory(category) {
    return products.value.filter((p) => p.category === category)
  }

  function getProductById(id) {
    return products.value.find((p) => p.id === Number(id))
  }

  function getFeaturedProducts() {
    return products.value.filter((p) => p.badge === 'Bestseller' || p.badge === 'Exclusive')
  }

  function getNewProducts() {
    return products.value.filter((p) => p.badge === 'New' || p.badge === 'Premium')
  }

  // ─── Search ───────────────────────────────────────────
  const searchQuery = ref('')

  function searchProducts(query) {
    const q = query.toLowerCase()
    return products.value.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q),
    )
  }

  return {
    products,
    categories,
    cart,
    isCartOpen,
    cartTotal,
    cartCount,
    wishlist,
    searchQuery,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    toggleWishlist,
    isInWishlist,
    getProductsByCategory,
    getProductById,
    getFeaturedProducts,
    getNewProducts,
    searchProducts,
  }
})
