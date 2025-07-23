import Papa from 'papaparse'

export interface Job {
  id: string
  title: string
  description: string
  department: string
  location: string
  type: string
  salary: string
  posted: string
  requirements: string[]
}

/**
 * Fetches job listings from a public Google Sheet published as CSV.
 * @param sheetId The Google Sheet ID
 * @param sheetGid The sheet/tab GID (default 0)
 */
export async function fetchJobsFromSheet(sheetId: string, sheetGid: string = '0'): Promise<Job[]> {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${sheetGid}`
  const res = await fetch(csvUrl)
  if (!res.ok) throw new Error('Failed to fetch job listings from Google Sheet')
  const csvText = await res.text()
  const parsed = Papa.parse(csvText, { header: true })
  if (!parsed.data || !Array.isArray(parsed.data)) return []
  return (parsed.data as any[]).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    department: row.department,
    location: row.location,
    type: row.type,
    salary: row.salary,
    posted: row.posted,
    requirements: typeof row.requirements === 'string' ? row.requirements.split(',').map((r: string) => r.trim()).filter(Boolean) : [],
  }))
} 