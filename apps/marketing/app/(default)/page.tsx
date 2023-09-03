export const metadata = {
  title: 'AI Gear',
  description: 'The Wrestling App',
}

import Hero from '@/components/hero'
import Features from '@/components/features'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      {/* <Zigzag /> */}
      {/* <Testimonials /> */}
    </>
  )
}
