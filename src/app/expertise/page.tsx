import { BookOpen, Gavel, Scale, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const expertiseDetails = [
  {
    icon: Gavel,
    title: 'Criminal Law & Justice',
    summary: 'Sentencing guidelines, plea bargaining reforms, police interrogation and Judges’ Rules, criminal responsibility (insanity defenses).',
    details: [
      'Analysis of sentencing guidelines and disparity.',
      'Implementation frameworks for plea bargaining.',
      'Adherence to Judges’ Rules in police interrogations.',
      'The evolution of insanity and diminished responsibility defenses.'
    ]
  },
  {
    icon: Briefcase,
    title: 'Company & Commercial Law',
    summary: 'Nigerian company law, corporate governance (organic theory of management), foreign investment, contract issues.',
    details: [
        'Corporate governance models and the organic theory of management.',
        'Legal frameworks for foreign direct investment (FDI) in Nigeria.',
        'Complex contract negotiations and dispute resolution.',
        'Corporate manslaughter and statutory liability.'
    ]
  },
  {
    icon: Scale,
    title: 'Evidence & Procedure',
    summary: 'Trial procedure, evidence law (youth and children’s testimony post-Evidence Act 2011), hearsay rules, legal ethics and practice norms.',
    details: [
      'Impact of the Evidence Act 2011 on child testimony.',
      'Application and exceptions to the hearsay rule.',
      'Best practices in trial procedure and advocacy.',
      'Ethical standards and professional responsibility for legal practitioners.'
    ]
  },
  {
    icon: BookOpen,
    title: 'Legal Education & Policy',
    summary: 'Curriculum development, teaching methodologies, and policy reforms to enhance legal training in Nigeria.',
    details: [
      'Innovations in legal pedagogy and clinical legal education.',
      'Policy recommendations for the Council of Legal Education.',
      'Mentorship programs for aspiring law students.',
      'Bridging the gap between academic law and legal practice.'
    ]
  },
];


export default function ExpertisePage() {
    return (
        <>
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Areas of Expertise</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">In-depth knowledge and research across several critical domains of law, combining academic rigor with practical application.</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="space-y-12">
                        {expertiseDetails.map((area) => (
                            <Card key={area.title} className="overflow-hidden transition-shadow hover:shadow-lg">
                                <div className="grid md:grid-cols-3">
                                    <div className="md:col-span-1 bg-primary/5 p-8 flex flex-col items-center justify-center text-center">
                                        <div className="bg-primary text-primary-foreground h-16 w-16 rounded-full flex items-center justify-center mb-4 shrink-0">
                                            <area.icon className="h-8 w-8" />
                                        </div>
                                        <h2 className="font-headline text-2xl font-bold">{area.title}</h2>
                                        <p className="mt-2 text-muted-foreground text-sm">{area.summary}</p>
                                    </div>
                                    <div className="md:col-span-2 p-8">
                                        <h3 className="font-bold text-lg mb-4">Key Focus Areas:</h3>
                                        <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                            {area.details.map((detail, index) => (
                                                <li key={index}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
