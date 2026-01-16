import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const allPublications = [
    { title: 'The Application of Plea Bargaining and Restorative Justice in Criminal Trials in Nigeria', year: '2019', topic: 'Criminal Justice', summary: 'Analyzes plea bargaining in Nigerian law, comparing with India and Pakistan models to recommend legislative rules.', imageId: 'publication-1' },
    { title: 'Administration of Criminal Justice and the Relevancy of Judges’ Rules and Police Interrogation in Nigeria', year: '2020', topic: 'Criminal Justice', summary: 'Examines Nigeria’s adherence to Judges’ Rules, documenting issues of forced confessions and recommending procedural updates.', imageId: 'publication-2' },
    { title: 'Corporate Manslaughter Law in Nigeria: A Comparative Study', year: '2020', topic: 'Commercial Law', summary: 'Explores the absence of corporate manslaughter statutes and suggests legislative amendments based on other common-law countries.', imageId: 'publication-3' },
    { title: 'Children’s Evidence under Nigerian Law: The New Approach after the Evidence Act, 2011', year: '2019', topic: 'Evidence Law', summary: 'Reviews how the Evidence Act changed rules for children’s testimony, and proposes reforms to improve child-witness protections.', imageId: 'publication-1' },
    { title: 'A Critical Appraisal of the Organic Theory of Management in Nigerian Company Law', year: '2018', topic: 'Commercial Law', summary: 'Evaluates the application of the organic theory in corporate governance within the Nigerian legal context.', imageId: 'publication-2' },
    { title: 'The Admissibility of Hearsay Evidence: A Post-2011 Act Analysis', year: '2021', topic: 'Evidence Law', summary: 'Assesses the current state of hearsay evidence rules and their exceptions under the new Evidence Act.', imageId: 'publication-3' },
];


export default function PublicationsPage() {
    return (
        <>
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Publications</h1>
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
                                        <SelectItem value="criminal">Criminal Justice</SelectItem>
                                        <SelectItem value="commercial">Commercial Law</SelectItem>
                                        <SelectItem value="evidence">Evidence Law</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2021">2021</SelectItem>
                                        <SelectItem value="2020">2020</SelectItem>
                                        <SelectItem value="2019">2019</SelectItem>
                                        <SelectItem value="2018">2018</SelectItem>
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
                                            <span className="font-medium text-accent">{pub.year}</span>
                                        </div>
                                        <CardTitle className="font-headline text-xl leading-snug pt-2">{pub.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground text-sm">{pub.summary}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" asChild>
                                          <a href="/sample.pdf" download>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download PDF
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
