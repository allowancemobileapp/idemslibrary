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
        console.log(values);
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We will get back to you shortly.",
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
                                        <Button type="submit" className="w-full" size="lg">Send Message</Button>
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
                                    <a href="mailto:info@idemlegal.com" className="text-muted-foreground hover:text-foreground">info@idemlegal.com</a>
                                </div>
                                 <div className="flex items-center">
                                    <Phone className="h-5 w-5 mr-3 text-accent"/>
                                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-foreground">+123 456 7890</a>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
