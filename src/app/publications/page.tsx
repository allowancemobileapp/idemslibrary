import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const allPublications = [
    { title: 'The Application of Plea Bargaining and Restorative Justice in Criminal Trials in Nigeria', year: '2019', topic: 'Criminal Justice', summary: 'Analyzes plea bargaining in Nigerian law, comparing with India and Pakistan models to recommend legislative rules.', imageId: 'publication-1', url: '/sample.pdf' },
    { title: 'Administration of Criminal Justice and the Relevancy of Judges’ Rules and Police Interrogation in Nigeria', year: '2020', topic: 'Criminal Justice', summary: 'Examines Nigeria’s adherence to Judges’ Rules, documenting issues of forced confessions and recommending procedural updates.', imageId: 'publication-2', url: '/sample.pdf' },
    { title: 'Corporate Manslaughter Law in Nigeria: A Comparative Study', year: '2020', topic: 'Commercial Law', summary: 'Explores the absence of corporate manslaughter statutes and suggests legislative amendments based on other common-law countries.', imageId: 'publication-3', url: '/sample.pdf' },
    { title: 'Children’s Evidence under Nigerian Law: The New Approach after the Evidence Act, 2011', year: '2019', topic: 'Evidence Law', summary: 'Reviews how the Evidence Act changed rules for children’s testimony, and proposes reforms to improve child-witness protections.', imageId: 'publication-1', url: '/sample.pdf' },
    { title: 'A Critical Appraisal of the Organic Theory of Management in Nigerian Company Law', year: '2018', topic: 'Commercial Law', summary: 'Evaluates the application of the organic theory in corporate governance within the Nigerian legal context.', imageId: 'publication-2', url: '/sample.pdf' },
    { title: 'The Admissibility of Hearsay Evidence: A Post-2011 Act Analysis', year: '2021', topic: 'Evidence Law', summary: 'Assesses the current state of hearsay evidence rules and their exceptions under the new Evidence Act.', imageId: 'publication-3', url: '/sample.pdf' },
    { title: 'A Comparative Analysis of E-commerce Legal Frameworks in Nigeria and South Africa', year: '', topic: 'Commercial Law', summary: 'A comparative study of e-commerce laws.', imageId: 'publication-1', url: 'https://drive.google.com/file/d/1NiMX17S_FA0Wy8b6jPv40sTF2DbL30PX/view?usp=drive_link' },
    { title: 'An overview of Legal and Regulatory Framework for Micro, Small and Medium Enterprises in Nigeria', year: '', topic: 'Commercial Law', summary: 'Overview of the legal framework for SMEs in Nigeria.', imageId: 'publication-2', url: 'https://drive.google.com/file/d/1GHzjhu4u3J27_YWVpQ0ENFqYFirLnlYi/view?usp=drive_link' },
    { title: 'Analysis of Electronic Commerce for the Promotion of Sustainable Development in Nigeria', year: '', topic: 'Commercial Law', summary: 'Analyzing e-commerce for sustainable development.', imageId: 'publication-3', url: 'https://drive.google.com/file/d/18IvRbBqGeWEMVlWNhP9-Z9gzZZBrZIK8/view?usp=drive_link' },
    { title: 'Assessing the Adequacy of the Legal Framework in Facilitating E-Commerce in Nigeria', year: '', topic: 'Commercial Law', summary: 'An assessment of the legal framework for e-commerce.', imageId: 'publication-1', url: 'https://drive.google.com/file/d/1b501k1iUricC1-aRXyC-PxOU_ErK80Pv/view?usp=drive_link' },
    { title: 'Child evidence under the nigerian law', year: '', topic: 'Evidence Law', summary: 'Exploring child evidence in Nigerian law.', imageId: 'publication-2', url: 'https://docs.google.com/document/d/147BLqQKd6BSRX5dpFOdgTPS_djjp-YPRb9b53RkuVdI/edit?usp=drive_link' },
    { title: 'Corporate Criminal Liability', year: '', topic: 'Criminal Justice', summary: 'A look into corporate criminal liability.', imageId: 'publication-3', url: 'https://docs.google.com/document/d/1U95PccJ89neh-5UZVSS4aUsp8KlYapwSs1TIEmMjiFs/edit?usp=drive_link' },
    { title: 'Corporate Criminal Responsibility (new article 2022)', year: '2022', topic: 'Criminal Justice', summary: 'A 2022 article on corporate criminal responsibility.', imageId: 'publication-1', url: 'https://docs.google.com/document/d/1qmLNd3J3oBU73DErM7SGT_ymNcYMOu4c0dKzSr0V0VM/edit?usp=drive_link' },
    { title: 'Corporate Manslaughter Comparison in UK and Canada (paper 05)', year: '', topic: 'Criminal Justice', summary: 'Comparing corporate manslaughter laws.', imageId: 'publication-2', url: 'https://docs.google.com/document/d/1s5KisX1QFXVVUfcK8jY1oy6QpuV8GhNYtqWy5ZjC0CQ/edit?usp=drive_link' },
    { title: 'CORPORATIONS DONt kill people (paper 3)', year: '', topic: 'Criminal Justice', summary: 'An article on corporate accountability.', imageId: 'publication-3', url: 'https://docs.google.com/document/d/16yGbHL_1HAAJOjX0pCpFe0uKS-Aep2fa9eJ8A5Pr4uo/edit?usp=drive_link' },
    { title: 'Cybercrime Activities and the Emergence of Yahoo Boys in Nigeria', year: '', topic: 'Criminal Justice', summary: 'On cybercrime and "Yahoo Boys" in Nigeria.', imageId: 'publication-1', url: 'https://drive.google.com/file/d/1ryxsZR-b6yzN2lAMK1kHdRhn32xgLsz4/view?usp=drive_link' },
    { title: 'Cybercrime and its Negative Effects on Youth\'s Development, the Economy and Nigeria', year: '', topic: 'Criminal Justice', summary: 'The negative effects of cybercrime in Nigeria.', imageId: 'publication-2', url: 'https://drive.google.com/file/d/1XGMRsrxZddW-jNqtiDoJj7cCpYivDmO5/view?usp=drive_link' },
    { title: 'CYBERCRIME CONSCIOUSNESS AMONG UNDERGRADUATE STUDENTS', year: '', topic: 'Criminal Justice', summary: 'Study on cybercrime awareness among students.', imageId: 'publication-3', url: 'https://drive.google.com/file/d/1Zb5DUv8keXiwexUGxdle8T5bzbmJHoBb/view?usp=drive_link' },
    { title: 'Digital Forensic Accounting and Cyber Fraud in Nigeria', year: '', topic: 'Criminal Justice', summary: 'Forensic accounting in relation to cyber fraud.', imageId: 'publication-1', url: 'https://drive.google.com/file/d/1HhuuonrN_sO4_I6LAif-xEvb7G38Yxrc/view?usp=drive_link' },
    { title: 'Digitally Designed Forensic Procedure a Panacea to Cyber Fraud Control in Nigeria', year: '', topic: 'Criminal Justice', summary: 'Forensic procedures for cyber fraud control.', imageId: 'publication-2', url: 'https://drive.google.com/file/d/1Dcvhzu5noFBvpkIFNGYYsukwQidbEsT-/view?usp=drive_link' },
    { title: 'E-commerce and e-health in Nigeria: Prospects and challenges of effective legislative framework for sustainable development', year: '', topic: 'Commercial Law', summary: 'Prospects and challenges for e-commerce and e-health.', imageId: 'publication-3', url: 'https://drive.google.com/file/d/1EyG9z-FfFzZxi0wWMWMACme97eQyGCiF/view?usp=drive_link' },
    { title: 'Exploring the Legal Framework for E-commerce in Nigeria with Insights from UK and Malaysia', year: '', topic: 'Commercial Law', summary: 'Exploring Nigeria\'s e-commerce legal framework.', imageId: 'publication-1', url: 'https://drive.google.com/file/d/1aXwmhhH7-m2U2Or6pYuUceCK1ZRaJD3x/view?usp=drive_link' },
    { title: 'FINANCING OF SMALL AND MEDIUM SCALE ENTERPRISES A PANACEA TO POVERTY', year: '', topic: 'Commercial Law', summary: 'SME financing as a solution to poverty.', imageId: 'publication-2', url: 'https://drive.google.com/file/d/1VUVPlt7E68NlM5F_16rUQkayg2mgh_aK/view?usp=drive_link' },
    { title: 'JUDICIAL DETERMINATION OF CHILDREN1 (2)-2 - Latest Version', year: '', topic: 'Evidence Law', summary: 'On judicial determination of children.', imageId: 'publication-3', url: 'https://docs.google.com/document/d/1hlxYJ_FKo075v-pZjX4BBMFEPs_bHHYvYEZJUR5wPA0/edit?usp=drive_link' },
    { title: 'NEW HEARSAY EVIDENCE', year: '', topic: 'Evidence Law', summary: 'An article on new hearsay evidence.', imageId: 'publication-1', url: 'https://docs.google.com/document/d/1dkU6h-lY3Bo1zSH9LpreYNRcu7JlpC7Xnv0-LhAEe5s/edit?usp=drive_link' },
    { title: 'Reformation of Nigerian Legal and Regulatory Framework for Islamic Banking Sector', year: '', topic: 'Commercial Law', summary: 'Reforming legal framework for Islamic banking.', imageId: 'publication-2', url: 'https://drive.google.com/file/d/1rPB4h2ZqDKKL0wMgsvmS7TywV5SoE6gp/view?usp=drive_link' },
    { title: 'SHAREHOLDER DEMOCRACY', year: '', topic: 'Commercial Law', summary: 'An article on shareholder democracy.', imageId: 'publication-3', url: 'https://docs.google.com/document/d/1b94THZF5CrdI3h6chPyB1mTgxys6D_9N0YkdTOg25Z4/edit?usp=drive_link' },
    { title: 'The Legal Approach for Fighting Cybercrimes in Nigeria: Some Lessons from the United States and the United Kingdom', year: '', topic: 'Criminal Justice', summary: 'Legal approaches to fighting cybercrime.', imageId: 'publication-1', url: 'https://drive.google.com/file/d/1kCOHE1Kz1pX44e_YNSpdX23O4ZHJ2YYi/view?usp=drive_link' },
    { title: 'The Prosecution of Cybercrimes in Nigeria Challenges and Prospects', year: '', topic: 'Criminal Justice', summary: 'Challenges and prospects of prosecuting cybercrime.', imageId: 'publication-2', url: 'https://drive.google.com/file/d/1QCo32tcQdsWJYf42Lbzx8FiO_rK-JtaA/view?usp=drive_link' },
    { title: 'THE RULE OF LAW AND THE COURTS IN NIGERIA - CORRECTED VERSION - Copy', year: '', topic: 'Evidence Law', summary: 'On the rule of law and courts in Nigeria.', imageId: 'publication-3', url: 'https://docs.google.com/document/d/1778ln6cVMXlRYz_6t7k2_xzIn7qvVMibKWuBYHMLjR0/edit?usp=drive_link' },
    { title: 'Towards A Corporate Manslaughter Law for Nigeria', year: '', topic: 'Criminal Justice', summary: 'Proposing a corporate manslaughter law for Nigeria.', imageId: 'publication-1', url: 'https://docs.google.com/document/d/1QgqaPNmyfEuDx8tMqimmOm4X0PCnqNH5AGt6rIv42xA/edit?usp=drive_link' },
    { title: 'Trends and Challenges of E-Commerce in Nigeria', year: '', topic: 'Commercial Law', summary: 'Trends and challenges of e-commerce in Nigeria.', imageId: 'publication-2', url: 'https://drive.google.com/file/d/1Jcxwm9sjCzbN_dt5H59UhveUADU2Jbs4/view?usp=drive_link' },
    { title: 'WOMEN ACCESS TO JUSTICE IN NIGERIA', year: '', topic: 'Criminal Justice', summary: 'On women\'s access to justice in Nigeria.', imageId: 'publication-3', url: 'https://docs.google.com/document/d/1i-ShgVg9vExAM-vhnwS8d4d8KWt6hpmu1Cp82nnbaa8/edit?usp=drive_link' },
];


export default function PublicationsPage() {
    const years = [...new Set(allPublications.map(p => p.year).filter(y => y))].sort((a, b) => b.localeCompare(a));
    const topics = [...new Set(allPublications.map(p => p.topic).filter(t => t))].sort();

    return (
        <>
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Articles &amp; Publications</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A collection of peer-reviewed articles, book chapters, and scholarly work.</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container">
                    <Card className="mb-8 p-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-grow">
                                <Input placeholder="Search publications by title or keyword..." />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />
                                <Select>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by Topic" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {topics.map(topic => (
                                            <SelectItem key={topic} value={topic.toLowerCase().replace(' ', '-')}>{topic}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map(year => (
                                          <SelectItem key={year} value={year}>{year}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allPublications.map((pub) => {
                             const pubImage = PlaceHolderImages.find(p => p.id === pub.imageId);
                             return (
                                <Card key={pub.title} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
                                    {pubImage && (
                                        <div className="aspect-video relative">
                                            <Image
                                               src={pubImage.imageUrl}
                                               alt={pub.title}
                                               fill
                                               className="object-cover"
                                               data-ai-hint={pubImage.imageHint}
                                             />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                                            <span>{pub.topic}</span>
                                            {pub.year && <span className="font-medium text-accent">{pub.year}</span>}
                                        </div>
                                        <CardTitle className="font-headline text-xl leading-snug pt-2">{pub.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground text-sm">{pub.summary}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" asChild>
                                          <a href={pub.url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Read More
                                          </a>
                                        </Button>
                                    </CardFooter>
                                </Card>
                             )
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
