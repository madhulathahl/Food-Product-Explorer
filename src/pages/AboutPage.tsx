export function AboutPage() {
  return (
    <div className="page-container about-page">
      <p className="eyebrow"><span className="eyebrow-dot" /> A LITTLE ABOUT US</p>
      <h1>Good things,<br /><em>easier to find.</em></h1>
      <div className="about-content">
        <span className="about-mark" aria-hidden="true">f.</span>
        <div>
          <h2>Food Explorer</h2>
          <p>Food Explorer is a thoughtful place to browse groceries. Search by title, filter by category, compare prices and ratings, and open any item for a closer look at its details.</p>
          <p>Our collection is powered by the DummyJSON product API and presented in a simple, easy-to-explore catalog.</p>
        </div>
      </div>
    </div>
  )
}