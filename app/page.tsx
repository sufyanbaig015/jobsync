import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Briefcase, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TechCorp</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/careers" className="text-gray-600 hover:text-gray-900">
                Careers
              </Link>
              <Button asChild>
                <Link href="/careers">Join Us</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to TechCorp</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We're building the future of technology with innovative solutions and an amazing team. Join us in creating
            products that make a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/careers">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Team Members</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Globe className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Briefcase className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Open Positions</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
