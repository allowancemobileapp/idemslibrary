'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { BookText, FileText, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const bookImage = PlaceHolderImages.find((img) => img.id === 'book-cover-banking-insurance');

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function BookDetailPage() {
    const [open, setOpen] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const handlePayment = (values: z.infer<typeof formSchema>) => {
        const flutterwaveKey = "FLWPUBK_TEST-8f173fb39182df82191a8366a28b195f-X";
        const txRef = `BOOK2-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

        // @ts-ignore
        if (window.FlutterwaveCheckout) {
            // @ts-ignore
            window.FlutterwaveCheckout({
                public_key: flutterwaveKey,
                tx_ref: txRef,
                amount: 15000,
                currency: "NGN",
                payment_options: "card, banktransfer, ussd",
                customer: {
                    email: values.email,
                    name: values.name,
                },
                customizations: {
                    title: "Idem Library",
                    description: "Purchase: Law of Banking and Insurance",
                    logo: "https://picsum.photos/seed/legal/200/200",
                },
                callback: (data: any) => {
                    setPaymentSuccess(true);
                    toast({
                        title: "Payment Successful",
                        description: "Redirecting you to WhatsApp to coordinate your order.",
                    });

                    const whatsAppNumber = "2348106468420";
                    const messageBody = `Hello, I just paid N15000 for the book "Law of Banking and Insurance in Nigeria".\n\nTransaction Ref: ${data.tx_ref}\nEmail: ${values.email}\nName: ${values.name}\n\nPlease confirm receipt and let me know about the delivery. Thank you.`;
                    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(messageBody)}`;
                    
                    setTimeout(() => {
                        window.open(whatsappUrl, '_blank');
                    }, 2000);
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
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Book Details</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Law of Banking and Insurance in Nigeria</p>
                </div>
            </section>
            
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        <div className="md:col-span-1">
                            <Card className="sticky top-24">
                                {bookImage && (
                                    <Image
                                        src={bookImage.imageUrl}
                                        alt="Book Cover"
                                        width={600}
                                        height={800}
                                        className="rounded-t-lg object-cover w-full aspect-[3/4]"
                                        data-ai-hint={bookImage.imageHint}
                                    />
                                )}
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground">ISBN: 978-978-54874-8-0</p>
                                    <p className="text-3xl font-bold font-headline mt-2">N15,000</p>
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger asChild>
                                            <Button size="lg" className="w-full mt-4">
                                                <ShoppingCart className="mr-2"/>
                                                Purchase Book
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>{paymentSuccess ? 'Payment Successful' : 'Complete Purchase'}</DialogTitle>
                                                <DialogDescription>
                                                    {paymentSuccess 
                                                        ? 'Verification complete. Opening WhatsApp to coordinate delivery.' 
                                                        : 'Enter your details to pay N15,000 for this book.'}
                                                </DialogDescription>
                                            </DialogHeader>

                                            {paymentSuccess ? (
                                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                                    <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                                                    <p className="font-medium">Order Notified</p>
                                                    <p className="text-sm text-muted-foreground mt-2">Redirecting to WhatsApp...</p>
                                                </div>
                                            ) : (
                                                <Form {...form}>
                                                    <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-6">
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
                                                        <Button type="submit" className="w-full" size="lg">
                                                            Pay N15,000 with Flutterwave
                                                        </Button>
                                                    </form>
                                                </Form>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="md:col-span-2">
                             <h2 className="font-headline text-3xl font-bold">Law of Banking and Insurance in Nigeria</h2>
                             <p className="mt-2 text-lg text-muted-foreground">By Prof. Udosen Jacob Idem PhD, FCArb</p>
                            
                            <Tabs defaultValue="about" className="mt-8">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="about"><BookText className="mr-2"/>About the Book</TabsTrigger>
                                    <TabsTrigger value="toc"><FileText className="mr-2"/>Table of Contents</TabsTrigger>
                                </TabsList>
                                <TabsContent value="about" className="mt-6 space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>About the Author</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 text-muted-foreground">
                                           <p>Dr. Idem, Udosen Jacob is a Professor at the College of Law, Department of Private and Business Law, Afe Babalola University, Ado-Ekiti, Ekiti State, Nigeria. He obtained his Doctor of Laws Degree (PhD) from the University of Nigeria, Nsukka, and a Master of Laws (LL.M) from the University of Uyo, Nigeria. Dr Idem received his Bachelor of Laws (LL.B) Degree from the University of Uyo and thereafter proceeded to the Nigerian law school, Victoria Island, Lagos, where he bagged the Barrister-at-Law and was called to the Nigerian bar as solicitor and advocate of the Supreme Court of Nigeria. Dr Idem was at various times a State Counsel in the Ministry of Justice, Uyo and a Chief Magistrate in Akwa Ibom State Judiciary before joining academic. He is also a fellow of the Nigerian Institute of Chartered Arbitrators (NICA). He teaches Law of Evidence, Criminal Law, Company Law, Introduction to Legal Practice, Human Rights Law, Law of Banking, comparative criminal law, corporate law, management and finance in Undergraduate and post-graduate classes. Dr Idem is a co-author of the text Introduction to Legal Practice and Lawyering Skills in Nigeria. His experience is multifaceted, encompassing legal, regulatory, industrial, banking, finance, commercial, and corporate law. He is a prolific author and has published many articles in local and international peer-reviewed journals with high-impact indexed on Scopus, among others. He is a member of international and national professional bodies. The author could be reached via email at: idemudosen@gmail.com and idemudosen@abuad.edu.ng and by Tel. at: +2348106468420 and +2348023719463.</p>
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader>
                                            <CardTitle>About the Book</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 text-muted-foreground">
                                           <p>The book on the Law of Banking and Insurance in Nigeria provides a comprehensive and up-to-date exposition on the current and topical issues surrounding the Nigerian banking and Insurance Industries. It expounds on the recent emerging concepts, theories and practices of e-banking and cashless policy which revolutionised the way financial and insurance services are delivered in Nigeria. The book also addresses current academic literature on laws, regulatory frameworks, case laws, perspectives and challenges in the Nigerian banking sector. The interaction of Insurance law and regulative developments with digital innovation is explored, shedding light on how insurance is adapted to technological advancements, embracing new concepts and theoretical frameworks and addressing the legal challenges posed by this paradigm shift. This book is written with the view to fill the gap created by the absence of current local text in the areas of banking and insurance especially the ones about emerging procedures of technological advancement and the development of various theories, that provide a clear understanding of how stakeholders and policymakers can adapt these theories into our legal system to promote financial framework stability, environmental sustainability, and economic and social equity. The book is designed to serve as a textbook for students of law and finance, reference material for researchers and professionals, the bench, lawyers, banking and insurance practitioners, lecturers, law and policymakers and members of the public with an interest in the law of banking and insurance.</p>
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader>
                                            <CardTitle>Preface</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 text-muted-foreground">
                                           <p>The emergence of the Law of Banking and Insurance in Nigeria is rooted in the recognition of the dynamic and diversified nature of the financial industry in Nigeria. This book is not merely intended to be a comprehensive, straightforward, and up-to-date expression of the Nigerian academic literature on Banking and Insurance Law but as a living document that responds to the evolving complexities of law, banking, and insurance in a nation undergoing economic growth and transformation. The recently introduced cashless policy and e-banking in Nigeria by the Central Bank of Nigeria (CBN) in January 2023 stand as transformative milestones. This compendium volume, "The Law of Banking and Insurance in Nigeria," carefully examines not only the long-standing complexities of these crucial domains but also the contemporary forces shaping their evolution, with a special focus on the paradigm-shifting introduction of a cashless policy and the ascendance of e-banking. The intersection of former traditional banking laws with the novel challenges posed by these technological innovations is explored, providing readers with a comprehensive understanding underpinning the legal application in this digital era.</p>
                                           <p>On the other hand, the recent interaction of insurance law, theories, and practices with digital innovation is explored, shedding light on how insurance companies are adapting to technological advancements, embracing insurtech, and addressing the legal and regulatory challenges posed by this paradigm shift. This book has taken into consideration the fundamental changes in the curriculum of the university and the method of teaching and deals with the main topics in the law of banking and insurance for undergraduate and postgraduate students. The book is divided into twenty-seven (27) chapters and two broad parts. Part I covers fourteen (14) chapters on the law of banking and finance in Nigeria. The first chapter provides a basic introduction and historical history of the Nigerian banking industry, while the second chapter explores the ideas and theoretical foundation for banking. The third chapter focuses on the legislative framework in Nigeria for the formation and operation of the banking industry. The fourth chapter provides an overview of the regulatory framework in Nigeria for the formation and operation of the banking industry. Chapter Five explores the various types and functions of Nigerian banks. The banker-customer interaction is discussed in Chapter Six. Negotiable instruments are discussed in Chapter Seven. The bill of exchange is examined in Chapter Eight. Cheques are the focus of Chapter Nine. Overdrafts are covered in Chapter Ten, while bank drafts are covered in Chapter Eleven. Promissory notes are discussed in Chapter Twelve. The cashless policy in the Nigerian financial sector has been thoroughly examined in Chapter Thirteen. The topic of discussion in Chapter Fourteen is e-banking. Part two of this book discusses insurance law in Nigeria, and it contains thirteen (13) chapters. The fifteenth chapter discusses the historical origins, growth, and development of Nigerian insurance. The concept and theoretical framework, underpinning insurance, are highlighted in Chapter sixteen. The legal and regulatory frameworks for the insurance industry in Nigeria are discussed in Chapter seventeen. The parties and intermediaries to an insurance contract are covered in Chapter Eighteen. The assignment of insurance policies is covered in Chapter Nineteen. The principle of indemnity is the focus of Chapter Twenty. The principle of insurable interest is discussed in Chapter twenty-one. The principle of Utmost Good Faith (Ubberimae Fidei) in insurance law is addressed in Chapter twenty-two. Insurance claims are covered in Chapter twenty-three. The nature of insurance is discussed in Chapter twenty-four. The establishment of an insurance contract is explained in Chapter twenty-five. The principle of subrogation is covered in Chapter twenty-six, while reinsurance is covered in Chapter twenty-seven.</p>
                                           <p>I wish to thank some learned scholars and authors like I. J. Goldface-Irokalibe and Olusegun Yerokun and countless other scholars and jurists whose erudite and scholarly works provided fundamental and valuable sources of materials that have enriched this work. This book lays no claim to perfection and therefore takes full responsibility for any errors or omissions or commissions that may be found therein. This book is written in a very simple plain, attractive, enjoyable, and intellectually stimulating language which makes it easy to read and understandable by students of law and finance, legal practitioners, the bench, law and policymakers, researchers, lecturers, litigants, secretaries to banks and Insurance Companies and all those in related disciplines.</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="toc" className="mt-6">
                                     <Card>
                                        <CardContent className="p-6">
                                            <ScrollArea className="h-[600px] pr-4">
                                                <div className="text-muted-foreground space-y-4">
                                                    <p>Dedication</p>
                                                    <p>Foreword I & II</p>
                                                    <p>Preface</p>
                                                    <p>Acknowledgements</p>
                                                    <p>Table of Cases</p>
                                                    <p>Table of Statutes</p>
                                                    <p>Table of Abbreviations</p>

                                                    <h3 className="font-bold text-foreground pt-4 text-lg">PART ONE: BANKING</h3>
                                                    
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER ONE: Historical Development of Banking in Nigeria</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWO: The Concept of and Theoretical Framework for Banking</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER THREE: The Legal Framework for the Establishment and Operation of the Banking Industry in Nigeria</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER FOUR: The Regulatory Framework for the Establishment and Operation of the Banking Industry in Nigeria</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER FIVE: Types and Functions of Nigerian Banks</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER SIX: Banker and Customer</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER SEVEN: Negotiable Instruments</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER EIGHT: Bills of Exchange</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER NINE: Cheques</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TEN: Overdraft</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER ELEVEN: Bank Drafts</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWELVE: Promissory Notes</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER THIRTEEN: Cashless Policy in the Nigerian Banking System</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER FOURTEEN: E-Banking in Nigeria</h4>

                                                    <h3 className="font-bold text-foreground pt-8 text-lg">PART TWO: INSURANCE</h3>

                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER FIFTEEN: Historical Origins, Growth and Development of Nigerian Insurance</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER SIXTEEN: Conceptual and Theoretical Framework</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER SEVENTEEN: Legal and Regulatory Frameworks</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER EIGHTEEN: Nature of Insurance</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER NINETEEN: Parties and Intermediaries to an Insurance Contract</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWENTY: Assignments of Insurance Policies</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWENTY-ONE: The Principle of Indemnity</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWENTY-TWO: The Principle of Insurable Interest</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWENTY-THREE: The Principle of Utmost Good Faith (Uberrimae Fidei)</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWENTY-FOUR: Insurance Claims</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWENTY-FIVE: Formation of an Insurance Contract</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWENTY-SIX: The Principle of Subrogation</h4>
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWENTY-SEVEN: Reinsurance</h4>
                                                    
                                                     <h4 className="font-bold text-foreground pt-4">Appendices & Index</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>APPENDIX I</li>
                                                        <li>APPENDIX II</li>
                                                        <li>APPENDIX III</li>
                                                        <li>APPENDIX IV</li>
                                                        <li>INDEX</li>
                                                      </ul>
                                                </div>
                                            </ScrollArea>
                                        </CardContent>
                                     </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
