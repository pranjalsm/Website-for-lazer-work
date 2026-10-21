import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

const root = resolve(__dirname, '../..')
const read = (p) => readFileSync(resolve(root, p), 'utf8')

const html = read('index.html')
const sitemap = read('public/sitemap.xml')
const robots = read('public/robots.txt')

const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]

describe('SEO files', () => {
  it('has a canonical URL', () => {
    expect(canonical).toMatch(/^https:\/\//)
  })

  it('sitemap lists the canonical URL', () => {
    expect(sitemap).toContain(`<loc>${canonical}</loc>`)
  })

  it('robots.txt points to the sitemap on the canonical domain', () => {
    expect(robots).toContain(`Sitemap: ${canonical}sitemap.xml`)
  })

  it('has a title and meta description of sensible length', () => {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
    expect(title.length).toBeGreaterThan(10)
    expect(title.length).toBeLessThanOrEqual(70)
    expect(description.length).toBeGreaterThan(50)
    expect(description.length).toBeLessThanOrEqual(160)
  })

  it('has valid JSON-LD structured data matching the site', () => {
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
    const data = JSON.parse(json)
    expect(data['@type']).toBe('ProfessionalService')
    expect(data.telephone).toBe('+918483050143')
    expect(data.url).toBe(canonical)
    expect(data.areaServed).toEqual(['Kolhapur', 'Sangli', 'Satara'])
  })
})
