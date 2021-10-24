import '@testing-library/jest-dom/extend-expect'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    // eslint-disable-next-line jsx-a11y/alt-text
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt='test' />
  },
}))

process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
      deviceSizes: [320, 420, 768, 1024, 1200],
      imageSizes: [],
      domains: ['openbank.es'],
      path: '/_next/image',
      loader: 'default',
  },
};