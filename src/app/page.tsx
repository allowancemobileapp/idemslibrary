import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Gavel, Scale } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
const professorImage = PlaceHolderImages.find((img) => img.id === 'professor-portrait');

const expertiseAreas = [
  { title: 'Criminal Law & Justice', description: 'Sentencing, plea bargaining, police interrogation, and criminal responsibility.', icon: Gavel, href: '/expertise' },
  { title: 'Company & Commercial Law', description: 'Nigerian company law, corporate governance, foreign investment, and contract issues.', icon: BookOpen, href: '/expertise' },
  { title: 'Evidence & Procedure', description: 'Trial procedure, evidence law concerning children, hearsay rules, and legal ethics.', icon: Scale, href: '/expertise' },
];

const publications = [
  {
    title: 'The Application of Plea Bargaining and Restorative Justice in Criminal Trials in Nigeria',
    year: '2019',
    summary: 'Analyzes plea bargaining in Nigerian law, comparing with India and Pakistan models to recommend legislative rules.',
    imageId: 'publication-1'
  },
  {
    title: 'Administration of Criminal Justice and the Relevancy of Judges’ Rules and Police Interrogation in Nigeria',
    year: '2020',
    summary: 'Examines Nigeria’s adherence to Judges’ Rules, documenting issues of forced confessions and recommending procedural updates.',
    imageId: 'publication-2'
  },
  {
    title: 'Corporate Manslaughter Law in Nigeria: A Comparative Study',
    year: '2020',
    summary: 'Explores the absence of corporate manslaughter statutes and suggests legislative amendments based on other common-law countries.',
    imageId: 'publication-3'
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative container mx-auto flex h-full items-center">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="font-headline text-4xl md:text-6xl font-bold">
              Professor Idem Udosen Jacob
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-primary-foreground/90">
              Professor of Law
              <br />
              Expert in Corporate Law, Criminal Justice, and Evidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="accent">
                <Link href="/contact">Request a Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-accent hover:text-accent-foreground">
                <Link href="/publications">View Publications</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section id="about" className="py-16 lg:py-24">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1">
            {professorImage && (
              <Image
                src={professorImage.imageUrl}
                alt={professorImage.description}
                width={400}
                height={500}
                className="rounded-lg shadow-lg object-cover aspect-[4/5]"
                data-ai-hint={professorImage.imageHint}
              />
            )}
          </div>
          <div className="md:col-span-2">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">About Professor Jacob</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professor Idem Udosen Jacob is a seasoned law academic and consultant. He holds a Ph.D. and lectures in the Department of Private & Business Law at Afe Babalola University, Ado-Ekiti. His research and practice focus on Criminal Law and Justice, Company & Commercial Law, and Evidence Law.
            </p>
            <p className="mt-4 text-muted-foreground">
              Prof. Idem is author of multiple peer-reviewed articles and book chapters in these fields, and he regularly contributes to legal education and policy discussions. He has extensive experience teaching and mentoring law students, and offers expert legal consultancy in his areas of specialization.
            </p>
            <Button asChild className="mt-8">
              <Link href="/about">Learn More <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-16 lg:py-24 bg-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Areas of Expertise</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Specialized knowledge across key areas of Nigerian and international law.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area) => (
              <Card key={area.title} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="bg-primary text-primary-foreground h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                    <area.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{area.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" asChild className="p-0 text-primary">
                    <Link href={area.href}>Read More <ArrowRight className="ml-2" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section id="publications" className="py-16 lg:py-24">
        <div className="container">
          <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
             <div className="max-w-2xl">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Recent Publications</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Contributions to legal scholarship and discourse.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/publications">View All Publications</Link>
              </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((pub) => {
              return (
                <Card key={pub.title} className="flex flex-col overflow-hidden">
                  <CardContent className="flex-grow p-6">
                    <p className="text-sm font-semibold text-accent">{pub.year}</p>
                    <h3 className="font-headline text-lg font-semibold mt-2">{pub.title}</h3>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                     <Button variant="link" asChild className="p-0 text-primary">
                       <Link href="/publications">View Details <ArrowRight className="ml-2" /></Link>
                     </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
