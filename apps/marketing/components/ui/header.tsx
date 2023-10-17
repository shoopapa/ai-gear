import Link from 'next/link'
import MobileMenu from './mobile-menu'
import Image from 'next/image'
import logo from '@/public/assets/logo-alpha.svg'

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            <div className="shrink-0 mr-4 w-1/4">
              {/* Logo */}
              <Link href="/" className="block" aria-label="Cruip">
                <Image src={logo} width={48} height={48} alt="Testimonial 03" />
              </Link>
            </div>
            <div className="flex grow justify-end flex-wrap items-center">
              <Link
                href="/"
                className="font-medium hover:text-gray-100 px-4 py-3 flex items-center transition duration-150 ease-in-out"
              >
                Home
              </Link>
              <Link
                href="/product"
                className="font-medium hover:text-gray-100 px-4 py-3 flex items-center transition duration-150 ease-in-out"
              >
                Support
              </Link>
              <Link
                href="/privacy"
                className="font-medium hover:text-gray-100 px-4 py-3 flex items-center transition duration-150 ease-in-out"
              >
                Privacy
              </Link>
            </div>
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center  w-1/4">
              <li>
                <Link
                  href="https://app.ai-gear.com/sign-in"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="https://app.ai-gear.com/sign-up" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                  Sign up
                </Link>
              </li>
            </ul>
          </nav>
          <MobileMenu />

        </div>
      </div>
    </header >
  )
}
