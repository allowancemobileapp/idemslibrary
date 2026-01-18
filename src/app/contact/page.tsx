'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.204-1.634a11.86 11.86 0 005.785 1.63c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
    </svg>
  );

export default function ContactPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const whatsAppNumber = "2348106468420";
        const messageBody = `*New message from your website*:\n\n*Name*: ${values.name}\n*Email*: ${values.email}\n*Subject*: ${values.subject}\n\n*Message*:\n${values.message}`;
        const encodedMessage = encodeURIComponent(messageBody);
        const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');

        toast({
            title: "Redirecting to WhatsApp",
            description: "Your message is ready to be sent.",
        });
        form.reset();
    }

    return (
        <>
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Contact & Consultation</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">For consultations, speaking engagements, or research inquiries, please use the contact form below or book a consultation directly.</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="font-headline text-3xl font-bold">Send a Message</h2>
                        <Card className="mt-6">
                            <CardContent className="p-6">
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
                                         <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Subject</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Regarding a consultation..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Message</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Your message here..." {...field} className="min-h-[120px]" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1DAE5A] text-white" size="lg">
                                            <WhatsAppIcon className="mr-2 h-5 w-5" />
                                            Send via WhatsApp
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="font-headline text-3xl font-bold">Book a Consultation</h2>
                             <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Schedule a Meeting</CardTitle>
                                    <CardDescription>Use the widget below to book a time that works for you.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center">
                                        <p className="text-muted-foreground">[Calendly Embed Placeholder]</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <div>
                             <h3 className="font-headline text-2xl font-bold">Direct Contact</h3>
                             <div className="mt-6 space-y-4">
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 mr-3 text-accent"/>
                                    <a href="mailto:idemudosen@gmail.com" className="text-muted-foreground hover:text-foreground">idemudosen@gmail.com</a>
                                </div>
                                 <div className="flex items-center">
                                    <Phone className="h-5 w-5 mr-3 text-accent"/>
                                    <a href="tel:+2348106468420" className="text-muted-foreground hover:text-foreground">+2348106468420</a>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
