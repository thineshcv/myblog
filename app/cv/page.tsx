import { getResume } from '@/lib/resume'
import type { Metadata } from 'next'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'CV',
  description: 'Curriculum Vitae and professional experience.',
  openGraph: {
    title: 'CV | Personal Blog',
    description: 'Curriculum Vitae and professional experience.',
  },
}

export default function CVPage() {
  const resume = getResume()

  return (
    <div 
      className="transition-colors"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            {resume.basics.name}
          </h1>
          <p 
            className="text-lg sm:text-xl mb-4 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {resume.basics.label}
          </p>
          <p 
            className="text-sm sm:text-base mb-6 leading-7 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {resume.basics.summary}
          </p>
          
          {/* Contact Info */}
          <div 
            className="flex flex-wrap gap-4 text-sm transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <a 
              href={`mailto:${resume.basics.email}`} 
              className="link-muted"
            >
              {resume.basics.email}
            </a>
            <span>•</span>
            <span>{resume.basics.phone}</span>
            <span>•</span>
            <span>{resume.basics.location.city}, {resume.basics.location.region}</span>
          </div>

          {/* Social Profiles */}
          <div className="flex flex-wrap gap-4 mt-4">
            {resume.basics.profiles.map((profile) => (
              <a
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm link-accent"
              >
                {profile.network}
              </a>
            ))}
          </div>
        </header>

        {/* Work Experience */}
        <section className="mb-12 sm:mb-16">
          <h2 
            className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 border-b pb-2 transition-colors"
            style={{ 
              color: 'var(--text-primary)',
              borderColor: 'var(--border)'
            }}
          >
            Experience
          </h2>
          <div className="space-y-8 sm:space-y-10">
            {resume.work.map((job, index) => (
              <div 
                key={index} 
                className="border-l-2 pl-4 sm:pl-6 transition-colors"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="mb-2">
                  <h3 
                    className="text-xl sm:text-2xl font-light transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {job.position}
                  </h3>
                  <div 
                    className="flex flex-wrap items-center gap-2 text-sm sm:text-base mb-1 transition-colors"
                    style={{ color: 'var(--accent)' }}
                  >
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-accent"
                    >
                      {job.name}
                    </a>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {format(new Date(job.startDate), 'MMM yyyy')} -{' '}
                      {job.endDate ? format(new Date(job.endDate), 'MMM yyyy') : 'Present'}
                    </span>
                  </div>
                </div>
                <p 
                  className="text-sm sm:text-base mb-3 transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {job.summary}
                </p>
                {job.highlights && job.highlights.length > 0 && (
                  <ul 
                    className="list-disc list-inside space-y-1 text-sm sm:text-base ml-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {job.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12 sm:mb-16">
          <h2 
            className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 border-b pb-2 transition-colors"
            style={{ 
              color: 'var(--text-primary)',
              borderColor: 'var(--border)'
            }}
          >
            Education
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {resume.education.map((edu, index) => (
              <div 
                key={index} 
                className="border-l-2 pl-4 sm:pl-6 transition-colors"
                style={{ borderColor: 'var(--border)' }}
              >
                <h3 
                  className="text-xl sm:text-2xl font-light mb-1 transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {edu.studyType} in {edu.area}
                </h3>
                <div 
                  className="flex flex-wrap items-center gap-2 text-sm sm:text-base mb-2 transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  <a
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent"
                  >
                    {edu.institution}
                  </a>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {format(new Date(edu.startDate), 'MMM yyyy')} -{' '}
                    {format(new Date(edu.endDate), 'MMM yyyy')}
                  </span>
                  {edu.score && (
                    <>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <span style={{ color: 'var(--text-muted)' }}>{edu.score}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12 sm:mb-16">
          <h2 
            className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 border-b pb-2 transition-colors"
            style={{ 
              color: 'var(--text-primary)',
              borderColor: 'var(--border)'
            }}
          >
            Skills
          </h2>
          <div className="space-y-6">
            {resume.skills.map((skill, index) => (
              <div key={index}>
                <h3 
                  className="text-lg sm:text-xl font-light mb-2 transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {skill.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-0.5 text-xs sm:text-sm border transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                        borderColor: 'var(--border-light)'
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 
              className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 border-b pb-2 transition-colors"
              style={{ 
                color: 'var(--text-primary)',
                borderColor: 'var(--border)'
              }}
            >
              Projects
            </h2>
            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div 
                  key={index} 
                  className="border-l-2 pl-4 sm:pl-6 transition-colors"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <h3 
                    className="text-xl sm:text-2xl font-light mb-2 transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-primary"
                    >
                      {project.name}
                    </a>
                  </h3>
                  <p 
                    className="text-sm sm:text-base mb-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 text-xs border transition-colors"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-muted)',
                          borderColor: 'var(--border-light)'
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {resume.certificates && resume.certificates.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 
              className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 border-b pb-2 transition-colors"
              style={{ 
                color: 'var(--text-primary)',
                borderColor: 'var(--border)'
              }}
            >
              Certificates
            </h2>
            <div className="space-y-4">
              {resume.certificates.map((cert, index) => (
                <div 
                  key={index} 
                  className="border-l-2 pl-4 sm:pl-6 transition-colors"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <h3 
                    className="text-lg sm:text-xl font-light mb-1 transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-primary"
                    >
                      {cert.name}
                    </a>
                  </h3>
                  <div 
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {cert.issuer} • {format(new Date(cert.date), 'MMM yyyy')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {resume.awards && resume.awards.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 
              className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 border-b pb-2 transition-colors"
              style={{ 
                color: 'var(--text-primary)',
                borderColor: 'var(--border)'
              }}
            >
              Awards
            </h2>
            <div className="space-y-4">
              {resume.awards.map((award, index) => (
                <div 
                  key={index} 
                  className="border-l-2 pl-4 sm:pl-6 transition-colors"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <h3 
                    className="text-lg sm:text-xl font-light mb-1 transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {award.title}
                  </h3>
                  <div 
                    className="text-sm mb-1 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {award.awarder} • {format(new Date(award.date), 'MMM yyyy')}
                  </div>
                  <p 
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {award.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {resume.languages && resume.languages.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 
              className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 border-b pb-2 transition-colors"
              style={{ 
                color: 'var(--text-primary)',
                borderColor: 'var(--border)'
              }}
            >
              Languages
            </h2>
            <div className="space-y-2">
              {resume.languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span 
                    className="text-base sm:text-lg transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {lang.language}
                  </span>
                  <span 
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    —
                  </span>
                  <span 
                    className="text-sm sm:text-base transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {lang.fluency}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {resume.interests && resume.interests.length > 0 && (
          <section>
            <h2 
              className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 border-b pb-2 transition-colors"
              style={{ 
                color: 'var(--text-primary)',
                borderColor: 'var(--border)'
              }}
            >
              Interests
            </h2>
            <div className="space-y-4">
              {resume.interests.map((interest, index) => (
                <div key={index}>
                  <h3 
                    className="text-lg sm:text-xl font-light mb-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {interest.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {interest.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 text-xs border transition-colors"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-muted)',
                          borderColor: 'var(--border-light)'
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

