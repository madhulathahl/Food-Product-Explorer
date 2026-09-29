# Food Explorer

Food Explorer is a responsive grocery catalog built with React and TypeScript. Browse grocery products from DummyJSON, search product titles, filter by category, and open individual product details. Prices are displayed in Indian rupees (INR).

## Technologies

- React 19 and TypeScript
- Vite
- React Router
- DummyJSON Products API
- CSS with responsive layouts and reduced-motion support

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. Run project checks with `npm run lint`.

## API

The frontend calls DummyJSON directly from the browser:

- `GET https://dummyjson.com/products?limit=0` loads the collection.
- `GET https://dummyjson.com/products/{id}` loads a product detail page.

There is no backend. An internet connection is needed to load product data and images.

## Project structure

```text
src/
  components/  Navigation, product cards, feedback, and loading states
  hooks/       Product list request lifecycle and retry
  pages/       Products, product details, and About pages
  routes/      React Router route definitions
  services/    Typed DummyJSON API requests
  types/       Product and API response types
  utils/       Price, category, rating, and stock formatters
```

## Design and behavior

The interface uses a softly blurred fresh-fruit photo backdrop with restrained green and coral accents, a responsive product grid, and content-matched skeletons. Prices use Indian rupees (INR). The product list is restricted to DummyJSON's `groceries` category; direct detail URLs for other categories are treated as unavailable. Search filters titles client-side from the fetched grocery collection. Product details are fetched using the route ID; invalid IDs and API failures show recoverable states. Requests are aborted when users navigate away.

## Limitations

The data and image availability depend on DummyJSON. Product data is not persisted, and search/filter state resets when leaving the catalog. Typography uses Google Fonts with local system fallbacks.
