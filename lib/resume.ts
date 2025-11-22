import resumeData from '@/data/resume.json'

export interface Resume {
  basics: {
    name: string
    label: string
    email: string
    phone: string
    url: string
    summary: string
    location: {
      city: string
      countryCode: string
      region: string
    }
    profiles: Array<{
      network: string
      username: string
      url: string
    }>
  }
  work: Array<{
    name: string
    position: string
    url: string
    startDate: string
    endDate: string | null
    summary: string
    highlights: string[]
  }>
  education: Array<{
    institution: string
    url: string
    area: string
    studyType: string
    startDate: string
    endDate: string
    score?: string
  }>
  skills: Array<{
    name: string
    keywords: string[]
  }>
  projects?: Array<{
    name: string
    description: string
    url: string
    keywords: string[]
  }>
  awards?: Array<{
    title: string
    date: string
    awarder: string
    summary: string
  }>
  certificates?: Array<{
    name: string
    date: string
    issuer: string
    url: string
  }>
  languages?: Array<{
    language: string
    fluency: string
  }>
  interests?: Array<{
    name: string
    keywords: string[]
  }>
}

export function getResume(): Resume {
  return resumeData as Resume
}

