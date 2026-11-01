// Resolves a portfolio image filename (from frontmatter) to its bundled URL,
// falling back to the placeholder when a project has no screenshot
const images = (require as any).context('../assets/img', false, /\.png$/)

const portfolioImage = (image?: string): string => images(`./${image || 'placeholder.png'}`).default

export default portfolioImage
