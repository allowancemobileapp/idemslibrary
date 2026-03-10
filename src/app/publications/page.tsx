'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter, ShoppingCart, CheckCircle2 } from 'lucide-react';
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

export default function PublicationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [topicFilter, setTopicFilter] = useState('all');
    const [yearFilter, setYearFilter] = useState('all');

    const years = [...new Set(allPublications.map(p => p.year).filter(y => y))].sort((a, b) => b.localeCompare(a));
    const topics = [...new Set(allPublications.map(p => p.topic).filter(t => t))].sort();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    });

    const filteredPublications = allPublications.filter((pub) => {
        const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             pub.summary.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTopic = topicFilter === 'all' || pub.topic.toLowerCase().replace(' ', '-') === topicFilter;
        const matchesYear = yearFilter === 'all' || pub.year === yearFilter;
        return matchesSearch && matchesTopic && matchesYear;
    });

    const handlePurchaseClick = (publication: Publication) => {
        setSelectedPub(publication);
        setPaymentSuccess(null);
        form.reset();
        setIsDialogOpen(true);
    };

    const handlePayment = (values: z.infer<typeof formSchema>) => {
        if (!selectedPub) return;

        const flutterwaveKey = "FLWPUBK_TEST-8f173fb39182df82191a8366a28b195f-X";
        const txRef = `PUB-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

        // @ts-ignore
        if (window.FlutterwaveCheckout) {
            // @ts-ignore
            window.FlutterwaveCheckout({
                public_key: flutterwaveKey,
                tx_ref: txRef,
                amount: 1000,
                currency: "NGN",
                payment_options: "card, banktransfer, ussd",
                customer: {
                    email: values.email,
                    name: values.name,
                },
                customizations: {
                    title: "Idem Library",
                    description: `Article: ${selectedPub.title}`,
                    logo: "https://picsum.photos/seed/legal/200/200",
                },
                callback: (data: any) => {
                    setPaymentSuccess(selectedPub.title);
                    
                    toast({
                        title: "Payment Successful",
                        description: "Your article is ready for download.",
                    });

                    // Forward to WhatsApp
                    const whatsAppNumber = "2348106468420";
                    const messageBody = `*Article Purchase Confirmation*\n\nHello, I have successfully paid N1000 for the article: "${selectedPub.title}".\n\n*Transaction Details*:\n- Name: ${values.name}\n- Email: ${values.email}\n- Ref: ${data.tx_ref}\n- Status: ${data.status}`;
                    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(messageBody)}`;
                    
                    // Automatically trigger download/open link
                    window.open(selectedPub.url, '_blank');
                    
                    // Open WhatsApp in new tab
                    setTimeout(() => {
                        window.open(whatsappUrl, '_blank');
                    }, 1000);
                },
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Payment system is loading. Please try again.",
            });
        }
    };

    return (
        <>
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Articles & Publications</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A collection of peer-reviewed articles, book chapters, and scholarly work.</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container">
                    <Card className="mb-8 p-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-grow">
                                <Input 
                                    placeholder="Search publications by title or keyword..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />
                                <Select value={topicFilter} onValueChange={setTopicFilter}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by Topic" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Topics</SelectItem>
                                        {topics.map(topic => (
                                            <SelectItem key={topic} value={topic.toLowerCase().replace(' ', '-')}>{topic}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={yearFilter} onValueChange={setYearFilter}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Years</SelectItem>
                                        {years.map(year => (
                                          <SelectItem key={year} value={year}>{year}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPublications.map((pub) => {
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
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>{paymentSuccess ? 'Payment Successful' : 'Purchase Article'}</DialogTitle>
                            <DialogDescription>
                                {paymentSuccess 
                                    ? `Thank you! You can download the article "${selectedPub.title}" below if it didn't open automatically.`
                                    : `To purchase "${selectedPub.title}", please provide your details and proceed to payment.`
                                }
                            </DialogDescription>
                        </DialogHeader>

                        {paymentSuccess === selectedPub.title ? (
                            <div className="space-y-6 py-4">
                                <div className="flex flex-col items-center justify-center text-center space-y-4">
                                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                                    <h4 className="font-bold text-lg">Transaction Complete</h4>
                                    <Button asChild className="w-full" size="lg">
                                        <a href={selectedPub.url} target="_blank" rel="noopener noreferrer">
                                            <Download className="mr-2 h-5 w-5" />
                                            Manual Download Link
                                        </a>
                                    </Button>
                                    <p className="text-xs text-muted-foreground">
                                        A WhatsApp notification has been prepared for the Professor.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Full Name" {...field} />
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
                                                    <Input type="email" placeholder="Email Address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full" size="lg">
                                        Pay N1000 with Flutterwave
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
