import { Button } from '@/components/ui/button'
import HeroSection from './hero-section'
import Navbar from './navbar'
import { Helmet } from 'react-helmet-async'

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Edulight - Nền tảng học trực tuyến hàng đầu Việt Nam</title>
        <meta name="description" content="Khám phá hàng nghìn khóa học chất lượng cao từ các giảng viên hàng đầu. Học bất cứ lúc nào, bất cứ nơi đâu và nâng cao kỹ năng của bạn với tốc độ riêng." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Course",
                  "position": 1,
                  "url": "https://www.edulight.vn/courses/lap-trinh-web",
                  "name": "Lập trình Web",
                  "description": "Học lập trình web từ cơ bản đến nâng cao với các công nghệ hiện đại",
                  "provider": {
                    "@type": "Organization",
                    "name": "Edulight",
                    "sameAs": "https://www.edulight.vn"
                  }
                },
                {
                  "@type": "Course",
                  "position": 2,
                  "url": "https://www.edulight.vn/courses/marketing-so",
                  "name": "Marketing Số",
                  "description": "Chiến lược marketing số hiệu quả cho doanh nghiệp hiện đại",
                  "provider": {
                    "@type": "Organization",
                    "name": "Edulight",
                    "sameAs": "https://www.edulight.vn"
                  }
                },
                {
                  "@type": "Course",
                  "position": 3,
                  "url": "https://www.edulight.vn/courses/thiet-ke-do-hoa",
                  "name": "Thiết kế Đồ họa",
                  "description": "Phát triển kỹ năng thiết kế đồ họa chuyên nghiệp",
                  "provider": {
                    "@type": "Organization",
                    "name": "Edulight",
                    "sameAs": "https://www.edulight.vn"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <Navbar />
      <HeroSection />
      {/* Các section khác sẽ được thêm vào sau */}
    </main>
  )
} 