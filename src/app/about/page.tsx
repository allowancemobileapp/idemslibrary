import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const professorImage = PlaceHolderImages.find((img) => img.id === 'professor-portrait');

const education = [
    { degree: 'Ph.D. in Private and Public Law', institution: 'University of Nigeria, Nsukka' },
    { degree: 'LL.M', institution: 'University of Uyo' },
    { degree: 'Called to the Nigerian Bar', institution: 'Nigerian Law School, Lagos' },
    { degree: 'LL.B (Hons)', institution: 'University of Uyo' },
];

const roles = [
    { role: 'Professor of Law', institution: 'Afe Babalola University, Ado-Ekiti' },
    { role: 'Former Chief Magistrate', institution: 'Akwa Ibom State Judiciary' },
];

export default function AboutPage() {
    return (
        <>
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Biography</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A distinguished academic and legal scholar with a passion for justice and education.</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                    <div className="md:col-span-1 space-y-6 md:sticky top-24">
                        {professorImage && (
                            <Image
                                src={professorImage.imageUrl}
                                alt={professorImage.description}
                                width={400}
                                height={500}
                                className="rounded-lg shadow-lg object-cover w-full"
                                data-ai-hint={professorImage.imageHint}
                            />
                        )}
                         <Button asChild className="w-full">
                            <a href="/cv.pdf" download>Download CV <Download className="ml-2 h-4 w-4" /></a>
                        </Button>
                    </div>
                    <div className="md:col-span-2 space-y-12">
                        <div>
                            <h2 className="font-headline text-3xl font-bold border-l-4 border-accent pl-4">Professional Journey</h2>
                            <div className='space-y-4 mt-6 text-muted-foreground'>
                                <p>Professor Idem Udosen Jacob is a seasoned law academic and consultant. He is a Professor of Law at Afe Babalola University, Ado-Ekiti, and a former Chief Magistrate of the Akwa Ibom State Judiciary. His scholarship spans corporate/commercial law, criminal justice, evidence law, and legal education.</p>
                                <p>He has authored and co-authored multiple peer-reviewed articles and books on these subjects, contributing regularly to legal scholarship. His practice/consulting expertise includes Criminal Law & Justice, Company & Commercial Law, Evidence & Procedure, and Legal Policy. With extensive experience teaching and mentoring law students, he offers expert legal consultancy in his areas of specialization.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-headline text-2xl font-bold border-l-4 border-accent pl-4">Education</h3>
                            <div className="mt-6 space-y-4">
                                {education.map((item, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle className="text-lg font-body font-bold">{item.degree}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{item.institution}</p>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-headline text-2xl font-bold border-l-4 border-accent pl-4">Academic & Professional Roles</h3>
                            <div className="mt-6 space-y-4">
                                {roles.map((item, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle className="text-lg font-body font-bold">{item.role}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{item.institution}</p>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
