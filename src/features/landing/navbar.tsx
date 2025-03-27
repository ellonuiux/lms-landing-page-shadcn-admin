import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Đóng menu khi resize window để tránh lỗi hiển thị
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  // Thêm class để tránh scroll khi menu mobile đang mở
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white" role="banner">
      <div className="container flex h-24 md:h-28 items-center py-4 md:py-8">
        {/* Logo - left-aligned on both mobile and desktop */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center" aria-label="Trang chủ Edulight">
            <span className="text-2xl font-bold">
              <span className="text-gray-800">Edu</span>
              <span className="text-teal-500">light</span>
            </span>
            <svg className="ml-1 text-teal-500 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
          </Link>
        </div>

        {/* Desktop Menu Items - Visible only on desktop - Căn lề trái */}
        <nav className="ml-10 md:ml-32 hidden md:block" aria-label="Menu chính" role="navigation" itemScope itemType="https://schema.org/SiteNavigationElement">
          <ul className="flex space-x-8">
            <li itemProp="name">
              <a href="#features" className="text-base font-medium text-gray-500 hover:text-teal-500 transition-colors py-3 inline-block" itemProp="url" aria-label="Xem tính năng">
                Tính năng
              </a>
            </li>
            <li itemProp="name">
              <a href="#pricing" className="text-base font-medium text-gray-500 hover:text-teal-500 transition-colors py-3 inline-block" itemProp="url" aria-label="Xem học phí">
                Học phí
              </a>
            </li>
            <li itemProp="name">
              <a href="#courses" className="text-base font-medium text-gray-500 hover:text-teal-500 transition-colors py-3 inline-block" itemProp="url" aria-label="Xem khóa học">
                Khóa học
              </a>
            </li>
            <li itemProp="name">
              <a href="#news" className="text-base font-medium text-gray-500 hover:text-teal-500 transition-colors py-3 inline-block" itemProp="url" aria-label="Xem tin tức">
                Tin tức
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Authentication Buttons - Visible only on desktop */}
        <div className="hidden md:flex items-center gap-4 ml-auto" role="group" aria-label="Đăng nhập và đăng ký">
          <Button 
            variant="outline" 
            className="rounded-sm border border-teal-500 bg-white text-teal-500 px-8 py-3 text-base font-medium hover:bg-teal-50 transition-colors shadow-none h-auto" 
            asChild
          >
            <Link to="/sign-in" aria-label="Đăng nhập vào tài khoản">Đăng nhập</Link>
          </Button>
          
          <Button className="rounded-sm bg-teal-500 text-white px-8 py-3 text-base font-medium hover:bg-teal-600 transition-colors shadow-none h-auto" asChild>
            <Link to="/sign-up" aria-label="Đăng ký tài khoản mới">Đăng ký</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button - Visible only on mobile, right-aligned */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden z-50 bg-white text-gray-800 ml-auto" 
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
        >
          {mobileMenuOpen ? (
            /* X Icon when menu is open */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M18 6L6 18"></path>
              <path d="M6 6L18 18"></path>
            </svg>
          ) : (
            /* Hamburger Icon when menu is closed */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
          <span className="sr-only">{mobileMenuOpen ? "Đóng menu" : "Mở menu"}</span>
        </Button>
      </div>

      {/* Mobile Menu - Full screen khi mở */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-white pt-20 md:hidden overflow-auto"
          style={{ 
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 300ms ease-in-out'
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu di động"
        >
          <div className="container py-8 flex flex-col min-h-screen">
            {/* Mobile Navigation - Tất cả các mục menu và nút đăng nhập cùng 1 danh sách */}
            <nav className="space-y-6" aria-label="Menu di động" role="navigation" itemScope itemType="https://schema.org/SiteNavigationElement">
              <a href="#features" className="block py-3 text-xl font-medium text-gray-700 hover:text-teal-500 transition-colors border-b border-gray-100" itemProp="url" aria-label="Xem tính năng">
                Tính năng
              </a>
              <a href="#pricing" className="block py-3 text-xl font-medium text-gray-700 hover:text-teal-500 transition-colors border-b border-gray-100" itemProp="url" aria-label="Xem học phí">
                Học phí
              </a>
              <a href="#courses" className="block py-3 text-xl font-medium text-gray-700 hover:text-teal-500 transition-colors border-b border-gray-100" itemProp="url" aria-label="Xem khóa học">
                Khóa học
              </a>
              <a href="#news" className="block py-3 text-xl font-medium text-gray-700 hover:text-teal-500 transition-colors border-b border-gray-100" itemProp="url" aria-label="Xem tin tức">
                Tin tức
              </a>
              <Link to="/sign-in" className="block py-3 text-xl font-medium text-gray-700 hover:text-teal-500 transition-colors border-b border-gray-100" aria-label="Đăng nhập vào tài khoản">
                Đăng nhập
              </Link>
              <Link to="/sign-up" className="block py-3 text-xl font-medium text-gray-700 hover:text-teal-500 transition-colors border-b border-gray-100" aria-label="Đăng ký tài khoản mới">
                Đăng ký
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
} 