'use client'

import Image from "next/image"
import Link from "next/link"
import posthog from "posthog-js"

const Navbar = () => {
  const handleNavClick = (linkName: string) => {
    posthog.capture('nav_link_clicked', {
      link_name: linkName,
    })
  }

  return (
    <header>
        <nav>
            <Link href='/' className="logo" onClick={() => handleNavClick('Logo')}>
                <Image src="/icons/logo.png" alt="logo" width={24} height={24} />

                <p>DevEvent</p>
            </Link>

            <ul>
                <Link href="/" onClick={() => handleNavClick('Home')}>Home</Link>
                <Link id="explore-btn" href="/events/create" onClick={() => handleNavClick('Create Event')}>Create Event</Link>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
