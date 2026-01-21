'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type Publication = (typeof allPublications)[0];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.204-1.634a11.86 11.86 0 005.785 1.63c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
    </svg>
);


export default function PublicationsPage() {
    const years = [...new Set(allPublications.map(p => p.year).filter(y => y))].sort((a, b) => b.localeCompare(a));
    const topics = [...new Set(allPublications.map(p => p.topic).filter(t => t))].sort();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPub, setSelectedPub] = useState<Publication | null>(null);

    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    });

    const handlePurchaseClick = (publication: Publication) => {
        setSelectedPub(publication);
        form.reset();
        setIsDialogOpen(true);
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!selectedPub) return;
        const whatsAppNumber = "2348106468420";
        const messageBody = `Hello, I would like to purchase the article "${selectedPub.title}".\n\nMy Details:\nName: ${values.name}\nEmail: ${values.email}\n\nPlease send me the account details for payment of N1000. Thank you.`;
        const encodedMessage = encodeURIComponent(messageBody);
        const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');

        toast({
            title: "Redirecting to WhatsApp",
            description: "Please complete the purchase process on WhatsApp.",
        });
        form.reset();
        setIsDialogOpen(false);
    }

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
                             return (
                                <Card key={pub.title} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
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
                                       <Button className="w-full" onClick={() => handlePurchaseClick(pub)}>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Purchase Article (N1000)
                                        </Button>
                                    </CardFooter>
                                </Card>
                             )
                        })}
                    </div>
                </div>
            </section>
             {selectedPub && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Purchase Article</DialogTitle>
                            <DialogDescription>
                                To receive a copy of "{selectedPub.title}", please provide your details. You will be redirected to WhatsApp to complete the purchase.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="john.doe@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1DAE5A] text-white" size="lg">
                                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                                    Proceed to WhatsApp
                                </Button>
                            </form>
                         </Form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
