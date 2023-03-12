interface ApiResponse {
  games: Game[]
  count: number
}

interface Game {
  id: string
  handle: string
  url: string
  bga_edit_url: string
  template_url: string
  name: string
  price: string
  price_ca: string
  price_uk: string
  price_au: string
  msrp: number
  msrps: {
    country: string
    price: number
  }[]
  discount: string
  year_published: number
  min_players: number
  max_players: number
  player_counts: string[]
  min_playtime: number
  max_playtime: number
  min_age: number
  description: string
  commentary: string
  faq: string
  thumb_url: string
  image_url: string
  matches_specs: null
  specs: []
  mechanics: {
    id: string
    url: string
  }[]
  categories: {
    id: string
    url: string
  }[]
  publishers: {
    id: string
    num_games: number | null
    score: number
    game: {}
    url: string
    images: {
      thumb: string | null
      small: string | null
      medium: string | null
      large: string | null
      original: string | null
    }
  }[]
  designers: {
    id: string
    num_games: number | null
    score: number
    game: {}
    url: string
    images: {
      thumb: string | null
      small: string | null
      medium: string | null
      large: string | null
      original: string | null
    }
  }[]
  primary_publisher: {
    id: string
    name: string
    url: string
  }
  primary_designer: {
    id: string
    name: string
    url: string
  }
  developers: []
  related_to: []
  related_as: []
  artists: string[]
  names: []
  rules_url: string
  amazon_rank: number
  official_url: string
  comment_count: number
  num_user_ratings: number
  average_user_rating: number
  weight_amount: number
  weight_units: string
  size_height: number
  size_depth: number
  size_units: string
  historical_low_prices: {
    country: string
    date: string
    price: number
    isLow: boolean
  }[]
  active: boolean
  num_user_complexity_votes: number
  average_learning_complexity: number
  average_strategy_complexity: number
  visits: number
  lists: number
  mentions: number
  links: number
  plays: number
  rank: number
  type: string
  sku: string
  upc: string
  isbn: string
  video_links: []
  availability_status: string
  num_distributors: number
  trending_rank: number
  listing_clicks: number
  is_historical_low: boolean
  skus: string[]
  sku_objects: {
    name: string
    sku: string
  }[]
  edit_url: string
  players: string
  playtime: string
  msrp_text: string
  price_text: string
  tags: string[]
  images: {
    thumb: string | null
    small: string | null
    medium: string | null
    large: string | null
    original: string | null
  }
  description_preview: string
}
