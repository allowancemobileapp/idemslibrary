import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/expertise', label: 'Expertise' },
    { href: '/publications', label: 'Publications' },
    { href: '/speaking', label: 'Speaking' },
    { href: '/contact', label: 'Contact' },
  ];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo className="text-primary-foreground" />
            <p className="text-sm text-primary-foreground/80">
              Professor Idem Udosen Jacob is a seasoned law academic and consultant.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-accent">
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-primary-foreground/80 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold">Newsletter</h3>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Subscribe for legal commentary and announcements.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-background/20 text-primary-foreground border-border/50 placeholder:text-primary-foreground/60" 
                aria-label="Email for newsletter"
              />
              <Button type="submit" variant="accent" className="shrink-0">Subscribe</Button>
            </form>
          </div>
          
          <div className="text-sm text-primary-foreground/60">
             <h3 className="font-headline text-lg font-semibold text-primary-foreground">Legal Disclaimer</h3>
            <p className="mt-4">
                The information provided on this website is for general informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by viewing this website.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Professor Idem Udosen Jacob. All Rights Reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms" className="hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
