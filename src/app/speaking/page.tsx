import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Mic } from 'lucide-react';

const speakingEvents = [
    { title: 'Keynote on Criminal Justice Reform', date: 'October 28, 2023', location: 'Nigerian Bar Association Annual Conference, Abuja', type: 'Conference', imageId: 'speaking-event' },
    { title: 'Workshop on Corporate Governance', date: 'June 15, 2023', location: 'Lagos Business School', type: 'Workshop', imageId: 'speaking-event' },
    { title: 'TV Appearance: "Law & Society"', date: 'March 05, 2023', location: 'Channels Television', type: 'Media', imageId: 'speaking-event' },
    { title: 'Panel Discussion on Evidence Act 2011', date: 'January 20, 2023', location: 'Afe Babalola University', type: 'Seminar', imageId: 'speaking-event' },
    { title: 'Guest Lecture on Foreign Investment Law', date: 'November 18, 2022', location: 'University of Uyo Alumni', type: 'Lecture', imageId: 'speaking-event' },
    { title: 'Radio Interview on Plea Bargaining', date: 'September 02, 2022', location: 'Nigeria Info FM', type: 'Media', imageId: 'speaking-event' },
];

export default function SpeakingPage() {
    return (
        <>
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Speaking & Media</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Engagements at conferences, seminars, workshops, and media appearances.</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {speakingEvents.map((event, index) => {
                            const eventImage = PlaceHolderImages.find(img => img.id === event.imageId);
                            return (
                                <Card key={index} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
                                    {eventImage && (
                                        <div className="relative aspect-video">
                                            <Image src={eventImage.imageUrl} alt={event.title} fill className="object-cover" data-ai-hint={eventImage.imageHint} />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <span className="text-sm font-semibold text-accent">{event.type}</span>
                                        <CardTitle className="font-headline text-xl pt-1">{event.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 flex-grow text-muted-foreground text-sm">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-start">
                                            <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                                            <span>{event.location}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            <Mic className="mr-2 h-4 w-4" />
                                            View Event Details
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
