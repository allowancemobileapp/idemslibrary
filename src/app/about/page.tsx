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
                                <p>Professor Udosen Jacob Idem, PhD, FCArb is a seasoned legal academic and consultant. He holds a Bachelor of Laws (LL.B. Hons) degree from the University of Uyo, a Bachelor of Laws (B.L.) from the Nigerian Law School, Lagos, and a Master of Laws (LL.M.) degree from the University of Uyo. He also earned a Doctor of Philosophy (Ph.D.) in Law (Public and Private Law) from the University of Nigeria, Nsukka.</p>
                                <p>He is a Solicitor and Advocate of the Supreme Court of Nigeria, having been called to the Nigerian Bar on 26 February 1998. He is currently a lecturer in the College of Law at Afe Babalola University, Ado-Ekiti, where he also serves as the Head of the Department of Private and Business Law.</p>
                                <p>Professor Idem has previously served as a Senior State Counsel in the Ministry of Justice and as a Chief Magistrate in the Akwa Ibom State Judiciary. At the undergraduate level, he has taught a wide range of courses, including Corporate and Commercial Law, Company Law, Criminal Law, Law of Evidence, Introduction to Legal Practice, Banking and Insurance Law, and Alternative Dispute Resolution (ADR). At the postgraduate level, he has taught Comparative Criminal Law, Corporate Law Management and Finance, and Comparative Corporate Crimes.</p>
                                <p>He has authored and co-authored several peer-reviewed scholarly articles in these areas, contributing consistently to legal scholarship. Professor Udosen Idem is the author of Law of Banking and Insurance in Nigeria and a co-author of Introduction to Legal Practice and Lawyering Skills in Nigeria.</p>
                                <p>His practice and consultancy expertise span Criminal Law and Justice, Company and Commercial Law, Evidence and Procedure, and Legal Policy. With extensive experience in teaching and mentoring law students, he offers expert legal consultancy services within his areas of specialisation.</p>
                                <p>Professor Udosen Idem is open to legal consultations in the areas of academic legal consultancy, legal drafting and documentation, legal advisory and consultation services, client counselling, alternative dispute resolution in family disputes, provision of legal opinions on complex issues, advising suspects and accused persons on criminal liability, and the drafting of pleadings, motions, briefs, and affidavits.</p>
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
