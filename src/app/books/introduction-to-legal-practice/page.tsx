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
  DialogClose
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { BookUser, FileText, ShoppingCart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const bookImage = PlaceHolderImages.find((img) => img.id === 'book-cover-legal-practice');

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.204-1.634a11.86 11.86 0 005.785 1.63c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
    </svg>
);


export default function BookDetailPage() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const whatsAppNumber = "2348106468420";
        const messageBody = `Hello, I would like to purchase the book 'Introduction to Legal Practice and Lawyering Skills in Nigeria'.\n\nMy Details:\nName: ${values.name}\nEmail: ${values.email}\n\nPlease send me the account details for payment. Thank you.`;
        const encodedMessage = encodeURIComponent(messageBody);
        const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');

        toast({
            title: "Redirecting to WhatsApp",
            description: "Please complete the purchase process on WhatsApp.",
        });
        form.reset();
        setOpen(false);
    }
    
    return (
        <>
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Book Details</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Introduction to Legal Practice and Lawyering Skills in Nigeria</p>
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
                                    <p className="text-sm text-muted-foreground">ISBN: 978-978-50061-8-4</p>
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
                                                <DialogTitle>Purchase Confirmation</DialogTitle>
                                                <DialogDescription>
                                                    To purchase the book, please provide your details. You will be redirected to WhatsApp to complete the transaction.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                </CardContent>
                            </Card>
                        </div>

                        <div className="md:col-span-2">
                             <h2 className="font-headline text-3xl font-bold">Introduction to Legal Practice and Lawyering Skills in Nigeria</h2>
                             <p className="mt-2 text-lg text-muted-foreground">By Prof. Elisabeta Smaranda Olarinde, FCArb, FCAL and Prof. Udosen Jacob Idem, FCArb</p>
                            
                            <Tabs defaultValue="authors" className="mt-8">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="authors"><BookUser className="mr-2"/>About the Authors</TabsTrigger>
                                    <TabsTrigger value="toc"><FileText className="mr-2"/>Table of Contents</TabsTrigger>
                                </TabsList>
                                <TabsContent value="authors" className="mt-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Prof. Elisabeta Smaranda Olarinde, FCArb, FCAL</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 text-muted-foreground">
                                            <p>Elisabeta Smaranda Olarinde is a Professor of Law and Vice-Chancellor, Afe Babalola University, Ado-Ekiti, Ekiti State, Nigeria. She is a law teacher, scholar and researcher, university administrator and Legal Practitioner for over 37 years. Professor Olarinde joined Nigeria’s Premier University, the University of Ibadan, Ibadan in 1984 and later continued her academic career at Afe Babalola University, Ado-Ekiti, in 2010 where she became a full Professor in October 2015. Professor Olarinde has many articles in local and international peer-reviewed Journals. She was a researcher to the International Documentation and Research Centre (IPROF.C) on Land Tenure and Access to Land for Women; a researcher to UNICEF on the Joint Research Initiated by the Word Bank on Law, Development and the Status of Women Towards a Gender Strategy in Nigeria; Legal Researcher for Niger and Oyo States; member of the Netherland, Israel and Nigeria joint research on the Girl Child’s Sexuality. She is a founding member of the first Nigerian Interdisciplinary Research Network on Social Sciences and Reproductive Health (SSRHN), University Teaching Hospital (UCH) Ibadan, a Research funded by Ford and Mc Arthur Foundations. Her legal background in both Civil Law (Romania) and Common Law (Nigeria) adds to her diverse multidisciplinary expertise that offers her a distinctive comparative perspective on national and international legal research, where her focus has been on Medical Law, Private Law, Women, ChilProf.en and Young Adolescents’ Rights and Protection. She is a Fellow of the Nigerian Institute of Chartered Arbitrators (NICA); Fellow, Institute of Corporate Administration of Nigeria; Pioneer member and Fellow, Centre for Peace and Conflict Studies (CEPACS), University of Ibadan. She has co-authored the Book on Modern Law of Torts: A Kaleidoscopic Perspective. She was the Editor-in-Chief of the maiden edition of the Law Journal of the Public & International Law Department, University of Ibadan and she has been the Editor-in-Chief ABUAD Law Journal, College of Law, ABUAD, from 2014 to 2021. She was the Provost College of Law and the Pioneer Director of Law Clinic ABUAD from 2011 to March 2021. She has brought innovation into the Nigeria Law curriculum by introducing in the College of Law ABUAD curriculum in 2011 the course titled Introduction of Legal Practice that has 3 distinctive components: the mandatory Chambers attachment, after the 3rd and 4th year, the Clinical component and the theory that is taught in modules. She is a member of many National and International Professional Bodies.</p>
                                            <p>Currently, she is the West Africa Representative of the Association of African Universities (AAU) Governing Board (2021-2025) and a member of the West Africa Regional Committee of the Association of Commonwealth Universities. She is trained in Quality Assurance and Accreditation in Higher Education and she is a certified Accreditor by Global University Network for Innovation (GUNi-Africa) and African Quality Assurance Network (AfriQAN).</p>
                                        </CardContent>
                                    </Card>
                                     <Card className="mt-6">
                                        <CardHeader>
                                            <CardTitle>Prof. Udosen Jacob Idem, PhD, FCArb</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4 text-muted-foreground">
                                           <p>Udosen Jacob IDEM, PhD is a Barrister and Solicitor of the Supreme Court of Nigeria and a Fellow of the Nigerian Institute of Chartered Arbitrators (NICA). He is currently a Professor of Law in the Department of Private and Business Law, College of Law, Afe Babalola University, Ado-Ekiti, Ekiti State, Nigeria. Prof. Idem began his professional career as a State Counsel in the Ministry of Justice, Uyo, Akwa Ibom State, where he engaged in various aspects of legal activities and gained extensive solicitor and litigation experience. Due to his outstanding impute as a legal practitioner, Prof. Idem was later appointed a Magistrate and rose to the position of a Chief Magistrate before joining Afe Babalola University. He is an Alumnus of the University of Uyo, Akwa-Ibom State of Nigeria, from where he earned his Bachelor of Law Degree LL. B (Hons) in 1997. Prof. Idem thereafter proceeded to the Nigerian Law School, Victoria Island, Lagos, where he bagged the Barrister-at-Law (B.L) and was called to the Nigerian Bar in 1998.</p>
                                           <p>In 2005, Prof. Idem enrolled for a Higher Degree at the Postgraduate Studies of the University of Uyo where he obtained the Master of Laws (LL. M) degree, specializing in Industrial and Corporate Law in 2009. Just after that, Prof. Idem was admitted into the School of Postgraduate Studies, University of Nigeria, Nsukka, where he earned the prestigious Doctor of Philosophy Degree (PhD) specializing in Commercial and Corporate Law in 2013. Prof. Idem is a prolific writer and published many articles in local and international peer-reviewed Journals with high-impact indexed on Scopus. His primary interest however remains his academic career. While teaching the Introduction to Legal Practice Course especially, at the College of Law, ABUAD, he has used his vast experience and practical skills to share with his law students some of the secrets of the legal profession and the art of advocacy. He is also a member of various international and national professional bodies.</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="toc" className="mt-6">
                                     <Card>
                                        <CardContent className="p-6">
                                            <ScrollArea className="h-[600px] pr-4">
                                                <div className="text-muted-foreground space-y-4">
                                                    <p>Dedication</p>
                                                    <p>Foreword</p>
                                                    <p>Preface</p>
                                                    <p>Acknowledgements</p>
                                                    <p>Table of Cases</p>
                                                    <p>Table of Statutes and Rules</p>
                                                    <p>Table of Abbreviations</p>
                                                    
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER ONE: Historical Development of the Legal Profession in England and Nigeria</h4>
                                                    <ul className="list-disc pl-6 space-y-1">
                                                        <li>The English Legal Profession</li>
                                                        <li>The Origin</li>
                                                        <li>The Earliest Legal Profession</li>
                                                        <li>The Pleaders and Attorneys</li>
                                                        <li>The Writ of 1292 and Apprentices at Law</li>
                                                        <li>The Inns of Court</li>
                                                        <li>The Modern Legal Profession</li>
                                                        <li>Barristers</li>
                                                        <li>Solicitors</li>
                                                        <li>Clementi Report</li>
                                                        <li>The 2007 Legal Services Act</li>
                                                        <li>Independence of the Legal Profession</li>
                                                        <li>The Legal Profession in Nigeria</li>
                                                        <li>The Period from 1876 to 1914</li>
                                                        <li>The Period Between 1914 and 1962</li>
                                                        <li>The Period Between 1962 till Date</li>
                                                    </ul>
                                                    
                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER TWO: Rights, Restrictions, and Precedence of a Legal Practitioner</h4>
                                                    <ul className="list-disc pl-6 space-y-1">
                                                        <li>Right of Audience and Representation of Litigants in Court</li>
                                                        <li>Appointment as a Judicial Officer</li>
                                                        <li>Preparation of Documents in Probate</li>
                                                        <li>Conveyancing (Preparation of Land Instruments)</li>
                                                        <li>Appointment as Attorney-General of the Federation or a State</li>
                                                        <li>Notary Public</li>
                                                        <li>Matters Incidental to Formation of Companies</li>
                                                        <li>Drafting of Document Relating to the Proceedings in Court</li>
                                                        <li>Restrictions on the Rights of a Legal Practitioner to Practise</li>
                                                        <li>Public Officers and Private Practice</li>
                                                        <li>Privileges of Law Officers</li>
                                                        <li>Order of Precedence in Court</li>
                                                    </ul>

                                                    <h4 className="font-bold text-foreground pt-4">CHAPTER THREE: Controlling Bodies in the Legal Profession in Nigeria</h4>
                                                    <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>The Council of Legal Education</li>
                                                        <li>The Body of Benchers</li>
                                                        <li>Legal Practitioners’ Disciplinary Committee</li>
                                                        <li>Legal Practitioners Privileges Committee (LPPC)</li>
                                                        <li>The Nigerian Bar Association</li>
                                                        <li>Legal Practitioners’ Remuneration Committee</li>
                                                        <li>The General Council of the Bar</li>
                                                        <li>The National Judicial Council (NJC)</li>
                                                    </ul>

                                                     <h4 className="font-bold text-foreground pt-4">CHAPTER FOUR: Duties of Counsel to Client</h4>
                                                     <ul className="list-disc pl-6 space-y-1">
                                                         <li>Duty to Accept Brief</li>
                                                         <li>Duty to Take Instruction in Chambers</li>
                                                         <li>Duty to Take Full Instructions</li>
                                                         <li>Duty to Be Diligent</li>
                                                         <li>Representing a Client within the Bounds of the Law</li>
                                                         <li>Representing Client Competently</li>
                                                         <li>Duty to Disclose Conflicting Interest</li>
                                                         <li>Lawyer’s Duty to Preserve Client’s Confidential Information</li>
                                                         <li>Withdrawal from Client’s Employment as Counsel</li>
                                                         <li>The Lawyer and Client’s Property</li>
                                                         <li>Duty to Investigate Facts Stated by Client and Production of Witnesses</li>
                                                         <li>Duty to Draw up Pleadings</li>
                                                         <li>Duty to Offer Candid and Honest Advice</li>
                                                         <li>Duty to Control Incidents of Trial</li>
                                                     </ul>

                                                     <h4 className="font-bold text-foreground pt-4">CHAPTER FIVE: Duties of Counsel to the Court</h4>
                                                     <ul className="list-disc pl-6 space-y-1">
                                                         <li>Introduction</li>
                                                         <li>Duty of a Lawyer as an Officer of Court</li>
                                                         <li>Respect for the Court</li>
                                                         <li>Punctuality to Court</li>
                                                         <li>Proper Dressing to Court</li>
                                                         <li>Correct Courtroom Decorum and Etiquette in Court</li>
                                                         <li>Mandatory Court Attendance Unless Leave Obtained</li>
                                                         <li>Conduct of Cases in Logical Sequence</li>
                                                         <li>Trial Publicity</li>
                                                         <li>Relationship with Judges</li>
                                                     </ul>

                                                     <h4 className="font-bold text-foreground pt-4">CHAPTER SIX: Duties of Legal Practitioners to the Legal Profession, State, and to Fellow Lawyers</h4>
                                                     <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>Duty of a Lawyer to the Profession</li>
                                                        <li>Lawyers’ Duties to the State</li>
                                                        <li>Duties of a Lawyer to Fellow Lawyers at the Bar</li>
                                                        <li>The Lawyer’s Duty to the Community</li>
                                                     </ul>

                                                     <h4 className="font-bold text-foreground pt-4">CHAPTER SEVEN: Ethics and Professional Discipline of Legal Practitioners</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Infamous Conduct in Any Professional Respect</li>
                                                        <li>Conviction by A Court in Nigeria</li>
                                                        <li>Obtaining Enrolment by Fraud</li>
                                                        <li>Conduct Incompatible with the Status of Legal Practitioners</li>
                                                        <li>Punishment for Professional Misconduct</li>
                                                        <li>Other Disciplinary Authorities</li>
                                                        <li>Procedural Steps before the Legal Practitioners Disciplinary Committee (LPDC)</li>
                                                     </ul>

                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER EIGHT: Duties of Court to Counsel and the General Public</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>Duty to the Right to Fair Hearing</li>
                                                        <li>Duty not to Interrupt Proceedings</li>
                                                        <li>Respect for the Lawyer and Other Persons in Court</li>
                                                        <li>Duty of Prompt Disposal of Cases</li>
                                                        <li>Duty not to Make Unfair Remarks in the Court</li>
                                                        <li>Prohibition Against Ex-Parte or Other Communication with Parties</li>
                                                        <li>Private Life of a Judge</li>
                                                        <li>Acceptance of Gifts</li>
                                                      </ul>

                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER NINE: Alternative Dispute Resolution</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>What is the Alternative Dispute Resolution (ADR)?</li>
                                                        <li>Models of Alternative Dispute Resolution (ADR)</li>
                                                        <li>Nature of Alternative Dispute Resolution (ADR) Processes</li>
                                                        <li>The Purpose of Alternative Dispute Resolution (ADR)</li>
                                                        <li>Advantages of Alternative Dispute Resolution (ADR)</li>
                                                        <li>Disadvantages of Alternative Dispute Resolution (ADR)</li>
                                                        <li>Cases that Cannot be Resolved through the Use of ADR Machanism</li>
                                                        <li>Multi-Door Courthouse</li>
                                                      </ul>

                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER TEN: Arbitration</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>What is Arbitration?</li>
                                                        <li>Major Features of Arbitration</li>
                                                        <li>Types/Forms of Arbitration</li>
                                                        <li>Non-Arbitrable Matters</li>
                                                        <li>Arbitrable Disputes</li>
                                                        <li>Appointment of Arbitrators</li>
                                                        <li>Sources of Nigerian Arbitration Laws and Rules</li>
                                                        <li>Forms of Arbitration Agreement</li>
                                                        <li>Contents of Arbitration Agreement</li>
                                                        <li>Arbitration Process</li>
                                                        <li>Advantages of Arbitration</li>
                                                        <li>Disadvantages of Arbitration</li>
                                                        <li>Challenge and Replacement of Arbitrators</li>
                                                        <li>Parties to an Arbitration by Agreement</li>
                                                        <li>Arbitration Awards</li>
                                                        <li>Enforcement of Awards</li>
                                                        <li>Grounds for Setting Aside an Award</li>
                                                        <li>Legal Effect of a Successful Challenge</li>
                                                      </ul>

                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER ELEVEN: Interviewing and Counselling of Client</h4>
                                                        <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>The Meaning of Interview and Counselling</li>
                                                        <li>The Purpose of Clients’ Interviewing and Counselling</li>
                                                        <li>The Initial Interview and Stages for an Effective Interviewing</li>
                                                        <li>The Human Elements of Interviewing</li>
                                                        <li>Effects of Legal Counselling Language</li>
                                                      </ul>
                                                      
                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER TWELVE: Letter Writing</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>Legal Writing Designed to Inform</li>
                                                        <li>Legal Writing Designed to Persuade</li>
                                                        <li>Legal Writing Designed to Record Information</li>
                                                        <li>Basics of Legal Writing Skills</li>
                                                        <li>Basic Components of Effective Letter Writing</li>
                                                        <li>Types of Letter</li>
                                                      </ul>

                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER THIRTEEN: Legal Research</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>What is Research?</li>
                                                        <li>What Then is Legal Research?</li>
                                                        <li>Nature, Scope and the Subject Matter of Research</li>
                                                        <li>Importance of Research to Legal Studies and Practice</li>
                                                        <li>Types of Research</li>
                                                        <li>Objectives of Legal Research</li>
                                                        <li>Doctrinal or Library-Based Research</li>
                                                        <li>Non-Doctrinal or Empirical Legal Research</li>
                                                        <li>Research Into Law</li>
                                                        <li>Sources of Materials in Legal Research</li>
                                                        <li>Curriculum Vitae</li>
                                                      </ul>

                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER FOURTEEN: Contempt of Court</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>Meaning of Contempt of Court</li>
                                                        <li>The Purpose of Contempt of Court</li>
                                                        <li>Types of Contempt</li>
                                                        <li>Conducts and Acts that Amount to Contempt</li>
                                                        <li>Standard of Proof in Contempt Proceedings</li>
                                                        <li>The Procedure of Trial of Contempt</li>
                                                        <li>Fair Hearing in Contempt Cases</li>
                                                        <li>Jurisdiction of Court to Punish for Contempt</li>
                                                        <li>Punishment for Contempt</li>
                                                      </ul>

                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER FIFTEEN: Advocacy Skills</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>Essential Qualities of a Good Advocate</li>
                                                        <li>Essentials of a Good Advocate’s Skills</li>
                                                        <li>Trial Advocacy</li>
                                                        <li>What a Good Advocate Should Avoid Doing</li>
                                                        <li>Examination of Witness</li>
                                                        <li>Judgment Writing</li>
                                                      </ul>

                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER SIXTEEN: Law Office Management</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>The Necessity for the Establishment of a Law Firm</li>
                                                        <li>Qualities for Establishing a Law Firm</li>
                                                        <li>Types of Law Firms/Models of Legal Practice</li>
                                                        <li>Financing Law Firms</li>
                                                        <li>Law Office Administration</li>
                                                        <li>Management Structure of a Law Firm</li>
                                                        <li>Charging Professional Fees</li>
                                                      </ul>

                                                      <h4 className="font-bold text-foreground pt-4">CHAPTER SEVENTEEN: Interlocutory Applications</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Introduction</li>
                                                        <li>Motions</li>
                                                        <li>Types of Interlocutory Applications</li>
                                                        <li>The Use of Affidavit Evidence</li>
                                                        <li>Injunctions</li>
                                                        <li>Other Special Interlocutory Injuctions</li>
                                                        <li>Forms of Commencement of Civil Action in High Court</li>
                                                      </ul>

                                                     <h4 className="font-bold text-foreground pt-4">Appendices & Index</h4>
                                                      <ul className="list-disc pl-6 space-y-1">
                                                        <li>Bibliography</li>
                                                        <li>Appendix A</li>
                                                        <li>Appendix B</li>
                                                        <li>Appendix C</li>
                                                        <li>Appendix D</li>
                                                        <li>Index</li>
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
