"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MapPin, Clock, DollarSign, Briefcase, ArrowLeft } from "lucide-react"
import { fetchJobsFromSheet, Job } from "@/lib/fetchJobsFromSheet"
import { Loader } from "@/components/ui/Loader"

// actual Google Sheet ID and GID
const SHEET_ID = "1csNdO--Rxuoyy-O7KYIrRvQ_JZJlMtXoGS8gM68Dl3A";
const SHEET_GID = "0";

export default function Page() {
  const [jobListings, setJobListings] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchKeyword, setSearchKeyword] = useState("")

  useEffect(() => {
    fetchJobsFromSheet(SHEET_ID, SHEET_GID)
      .then((jobs) => {
        setJobListings(jobs)
        setLoading(false)
      })
      .catch((err) => {
        setError("Error fetching jobs from Google Sheets.")
        setLoading(false)
        console.error(err)
      })
  }, [])

  const filteredJobs = jobListings.filter((job) => {
    const keyword = searchKeyword.toLowerCase()
    return (
      job.title.toLowerCase().includes(keyword) ||
      job.description.toLowerCase().includes(keyword) ||
      job.department.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword)
    )
  })

if (loading) {
  return <Loader />
}

  if (error) {
    return <div className="text-center py-10 text-xl text-red-600">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TechCorp</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-gray-600 mb-6">Discover your next career opportunity with us</p>

          {/* 🔍 Search Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search jobs by keyword..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{job.department}</Badge>
                    <span className="text-sm text-gray-500">{job.posted}</span>
                  </div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription>{job.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="pt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Requirements:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {Array.isArray(job.requirements) &&
                        job.requirements.map((req, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                            {req}
                          </li>
                        ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
