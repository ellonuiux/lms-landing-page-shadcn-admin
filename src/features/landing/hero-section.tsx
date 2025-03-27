import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Chọn danh mục khóa học')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })

  const options = [
    'Chọn danh mục khóa học',
    'Lập trình Web',
    'Marketing Số',
    'Thiết kế Đồ họa'
  ]

  // Update dropdown position when button position changes
  useEffect(() => {
    function updatePosition() {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        })
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition)
    
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    console.log('Toggling dropdown. Current state:', isOpen)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    console.log('Dropdown state changed:', isOpen)
  }, [isOpen])

  return (
    <section className="relative overflow-visible bg-white pt-8 md:pt-36 pb-16">
      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Text content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl md:text-6xl">
              Học kỹ năng mới trực tuyến theo thời gian của bạn
            </h1>
            <p className="max-w-xl text-gray-600 md:text-lg">
              Khám phá hàng nghìn khóa học chất lượng cao từ các giảng viên hàng đầu. Học bất cứ lúc nào, bất cứ nơi đâu và nâng cao kỹ năng của bạn với tốc độ riêng.
            </p>
            
            {/* Search form */}
            <div className="mt-4 flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                {/* Custom dropdown container */}
                <div className="flex flex-col md:flex-row w-full shadow-sm">
                  {/* Custom dropdown */}
                  <div className="relative flex-grow">
                    {/* Dropdown header */}
                    <button 
                      ref={buttonRef}
                      type="button"
                      className="h-12 md:h-16 w-full flex items-center px-4 md:px-6 bg-white border border-gray-200 rounded-sm md:rounded-none md:border-r-0 text-gray-700 cursor-pointer text-sm md:text-base"
                      onClick={toggleDropdown}
                      aria-haspopup="listbox"
                      aria-expanded={isOpen}
                    >
                      <span className={`${selectedOption === 'Chọn danh mục khóa học' ? 'text-gray-500' : 'text-gray-800'} truncate`}>
                        {selectedOption}
                      </span>
                      <div className="pointer-events-none absolute right-4 md:right-6 flex items-center">
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        >
                          <path d="M4 6L8 10L12 6" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </button>
                    
                    {/* Dropdown menu - rendered in a portal */}
                    {isOpen && createPortal(
                      <div 
                        ref={dropdownRef}
                        className="fixed bg-white border border-gray-200 shadow-lg rounded-sm z-[9999] max-h-60 overflow-y-auto"
                        style={{ 
                          top: `${dropdownPosition.top}px`,
                          left: `${dropdownPosition.left}px`,
                          width: `${dropdownPosition.width}px`
                        }}
                        role="listbox"
                      >
                        {options.map((option, index) => (
                          <div 
                            key={index}
                            role="option"
                            aria-selected={option === selectedOption}
                            className={`px-4 md:px-6 py-3 cursor-pointer hover:bg-teal-50 transition-colors text-sm md:text-base ${
                              option === selectedOption ? 'bg-teal-50 text-teal-600' : 'text-gray-700'
                            }`}
                            onClick={() => {
                              console.log('Option selected:', option)
                              setSelectedOption(option)
                              setIsOpen(false)
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>,
                      document.body
                    )}
                  </div>
                  
                  {/* Search button */}
                  <button 
                    className="relative flex-shrink-0 bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 md:px-12 py-3 md:py-0 h-12 md:h-16 text-base md:text-lg transition-colors rounded-sm mt-2 md:mt-0"
                    aria-label="Tìm kiếm khóa học"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="mt-4 flex gap-4">
              <button 
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                aria-label="Khóa học trước đó"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                aria-label="Khóa học tiếp theo"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative">
              <img
                alt="Học sinh tập trung học online với laptop - Khóa học trực tuyến Edulight"
                className="w-full rounded-lg object-cover"
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                width="600"
                height="600"
                style={{ 
                  aspectRatio: "4/3",
                  objectFit: "cover"
                }}
                loading="eager"
              />
              
              {/* Play button overlay */}
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
                <button 
                  className="bg-teal-500 hover:bg-teal-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
                  aria-label="Xem video giới thiệu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 