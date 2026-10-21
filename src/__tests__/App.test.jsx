import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from '../App.jsx'

const PHONE = '918483050143'

const decodeWhatsAppText = (url) => new URL(url).searchParams.get('text')

describe('App', () => {
  let openSpy

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    openSpy.mockRestore()
  })

  describe('rendering', () => {
    it('renders the main heading', () => {
      render(<App />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Precision service\.\s*Better cutting\./)
    })

    it('renders all six service cards', () => {
      const { container } = render(<App />)
      const cards = container.querySelectorAll('.service-card')
      expect(cards).toHaveLength(6)
      ;['01', '02', '03', '04', '05', '06'].forEach((n, i) => {
        expect(within(cards[i]).getByText(n)).toBeInTheDocument()
      })
    })

    it('renders every serviced brand in the brand strip', () => {
      const { container } = render(<App />)
      const list = container.querySelector('.brand-list')
      ;['RayTools', 'Precitec', 'WSX', 'OSPRI', 'Au3tech', 'BWT'].forEach(brand => {
        expect(within(list).getByText(brand)).toBeInTheDocument()
      })
    })

    it('renders the three service areas', () => {
      const { container } = render(<App />)
      const rows = container.querySelectorAll('.area-row')
      expect([...rows].map(r => r.querySelector('strong').textContent)).toEqual(['Kolhapur', 'Sangli', 'Satara'])
    })

    it('does not show pre-launch placeholder wording', () => {
      render(<App />)
      expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/before launch/i)).not.toBeInTheDocument()
    })

    it('shows the current year in the footer copyright', () => {
      render(<App />)
      expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} Soujany Mithari`))).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('every in-page link points to a section that exists', () => {
      const { container } = render(<App />)
      const hashLinks = [...container.querySelectorAll('a[href^="#"]')]
      expect(hashLinks.length).toBeGreaterThan(0)
      hashLinks.forEach(link => {
        const id = link.getAttribute('href').slice(1)
        expect(container.querySelector(`#${id}`), `missing target #${id}`).not.toBeNull()
      })
    })

    it('toggles the mobile menu open and closed', async () => {
      const user = userEvent.setup()
      const { container } = render(<App />)
      const nav = container.querySelector('nav')
      const toggle = screen.getByRole('button', { name: /toggle menu/i })

      expect(nav).not.toHaveClass('open')
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
      expect(toggle).toHaveAttribute('aria-controls', nav.id)
      await user.click(toggle)
      expect(nav).toHaveClass('open')
      expect(toggle).toHaveAttribute('aria-expanded', 'true')
      await user.click(toggle)
      expect(nav).not.toHaveClass('open')
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    })

    it('closes the mobile menu when a nav link is clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(<App />)
      const nav = container.querySelector('nav')

      await user.click(screen.getByRole('button', { name: /toggle menu/i }))
      expect(nav).toHaveClass('open')
      await user.click(within(nav).getByText('Services'))
      expect(nav).not.toHaveClass('open')
    })
  })

  describe('contact links', () => {
    it('all phone links dial the business number', () => {
      const { container } = render(<App />)
      const telLinks = [...container.querySelectorAll('a[href^="tel:"]')]
      expect(telLinks.length).toBeGreaterThanOrEqual(3)
      telLinks.forEach(link => expect(link).toHaveAttribute('href', `tel:+${PHONE}`))
    })

    it('all WhatsApp links use the business number, open in a new tab and include a default message', () => {
      const { container } = render(<App />)
      const waLinks = [...container.querySelectorAll('a[href^="https://wa.me/"]')]
      expect(waLinks.length).toBeGreaterThanOrEqual(3)
      waLinks.forEach(link => {
        const url = new URL(link.href)
        expect(url.pathname).toBe(`/${PHONE}`)
        expect(decodeWhatsAppText(link.href)).toMatch(/fiber laser head service/i)
        expect(link).toHaveAttribute('target', '_blank')
        expect(link.getAttribute('rel')).toMatch(/noreferrer/)
      })
    })

    it('every link opening a new tab is protected with rel="noreferrer"', () => {
      const { container } = render(<App />)
      container.querySelectorAll('a[target="_blank"]').forEach(link => {
        expect(link.getAttribute('rel')).toMatch(/noreferrer|noopener/)
      })
    })

    it('hides the Instagram contact until a username is configured', () => {
      const { container } = render(<App />)
      expect(screen.queryByText('INSTAGRAM')).not.toBeInTheDocument()
      expect(container.querySelector('a[href*="instagram.com"]')).toBeNull()
    })

    it('mailto links use a valid email address', () => {
      const { container } = render(<App />)
      const mailLinks = [...container.querySelectorAll('a[href^="mailto:"]')]
      expect(mailLinks.length).toBeGreaterThan(0)
      mailLinks.forEach(link => {
        expect(link.getAttribute('href')).toMatch(/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/)
      })
    })
  })

  describe('enquiry form', () => {
    it('opens WhatsApp with all entered details', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByLabelText(/your name/i), 'Ravi Patil')
      await user.type(screen.getByLabelText(/company name/i), 'Patil Industries')
      await user.type(screen.getByLabelText(/brand \/ model/i), 'RayTools BM111')
      await user.type(screen.getByLabelText(/how can we help/i), 'Lens burnt & cut quality poor?')
      await user.click(screen.getByRole('button', { name: /send enquiry on whatsapp/i }))

      expect(openSpy).toHaveBeenCalledTimes(1)
      const [url, target, features] = openSpy.mock.calls[0]
      expect(target).toBe('_blank')
      expect(features).toContain('noopener')
      expect(new URL(url).pathname).toBe(`/${PHONE}`)

      const text = decodeWhatsAppText(url)
      expect(text).toContain('Name: Ravi Patil')
      expect(text).toContain('Company: Patil Industries')
      expect(text).toContain('Laser head brand/model: RayTools BM111')
      expect(text).toContain('Issue: Lens burnt & cut quality poor?')
    })

    it('keeps special characters intact through URL encoding', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.type(screen.getByLabelText(/your name/i), 'Ravi')

      await user.type(screen.getByLabelText(/how can we help/i), 'a&b=c?d#e+f%g')
      await user.click(screen.getByRole('button', { name: /send enquiry on whatsapp/i }))

      expect(decodeWhatsAppText(openSpy.mock.calls[0][0])).toContain('Issue: a&b=c?d#e+f%g')
    })

    it('preserves line breaks typed into the message', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.type(screen.getByLabelText(/your name/i), 'Ravi')

      await user.type(screen.getByLabelText(/how can we help/i), 'line one{Enter}line two')
      await user.click(screen.getByRole('button', { name: /send enquiry on whatsapp/i }))

      expect(decodeWhatsAppText(openSpy.mock.calls[0][0])).toContain('Issue: line one\nline two')
    })

    it('requires a name and a description of the issue', () => {
      render(<App />)
      expect(screen.getByLabelText(/your name/i)).toBeRequired()
      expect(screen.getByLabelText(/how can we help/i)).toBeRequired()
      expect(screen.getByLabelText(/company name/i)).not.toBeRequired()
      expect(screen.getByLabelText(/brand \/ model/i)).not.toBeRequired()
    })

    it('does not open WhatsApp when required fields are empty', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByRole('button', { name: /send enquiry on whatsapp/i }))
      expect(openSpy).not.toHaveBeenCalled()
    })

    it('trims spaces and fills in placeholders for optional fields left blank', async () => {
      const user = userEvent.setup()
      render(<App />)

      await user.type(screen.getByLabelText(/your name/i), '  Ravi  ')
      await user.type(screen.getByLabelText(/company name/i), '   ')
      await user.type(screen.getByLabelText(/how can we help/i), ' Beam not centred ')
      await user.click(screen.getByRole('button', { name: /send enquiry on whatsapp/i }))

      const text = decodeWhatsAppText(openSpy.mock.calls[0][0])
      expect(text).toContain('Name: Ravi\n')
      expect(text).toContain('Company: Not provided')
      expect(text).toContain('Laser head brand/model: Not provided')
      expect(text).toContain('Issue: Beam not centred')
    })

    it('does not navigate the page away on submit', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.type(screen.getByLabelText(/your name/i), 'Ravi')
      await user.type(screen.getByLabelText(/how can we help/i), 'Service needed')
      // React handles events at its root, so check after bubbling reaches the document
      const submitEvent = vi.fn(e => e.defaultPrevented)
      document.addEventListener('submit', submitEvent)

      await user.click(screen.getByRole('button', { name: /send enquiry on whatsapp/i }))
      document.removeEventListener('submit', submitEvent)
      expect(submitEvent).toHaveReturnedWith(true)
    })
  })

  describe('FAQ', () => {
    it('renders three collapsible questions, closed by default', () => {
      const { container } = render(<App />)
      const items = container.querySelectorAll('.faq-list details')
      expect(items).toHaveLength(3)
      items.forEach(item => expect(item).not.toHaveAttribute('open'))
    })
  })
})
