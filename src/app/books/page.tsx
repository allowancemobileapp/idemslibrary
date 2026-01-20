import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Download, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const allBooks = [
    { 
        title: 'Introduction to Legal Practice and Lawyering Skills in Nigeria', 
        year: '2021',
        topic: 'Legal Practice', 
        summary: 'Co-authored by Prof. Udosen Jacob Idem, this book provides an essential guide to legal practice and lawyering skills in Nigeria.', 
        imageId: 'book-cover-legal-practice',
        href: '/books/introduction-to-legal-practice' 
    },
    { title: 'The Nigerian Law of Evidence', year: '2022', topic: 'Evidence Law', summary: 'A comprehensive guide to the principles and application of evidence law in Nigeria, post-2011 Evidence Act.', imageId: 'book-cover-1' },
    { title: 'Corporate Governance and Practices in Nigeria', year: '2021', topic: 'Commercial Law', summary: 'An in-depth analysis of corporate governance frameworks, exploring the roles of management and boards.', imageId: 'book-cover-2' },
    { title: 'Criminal Procedure in Nigerian Courts', year: '2023', topic: 'Criminal Justice', summary: 'This book provides a procedural roadmap for criminal litigation, from arrest to appeal.', imageId: 'book-cover-3' },
    { title: 'Understanding Plea Bargaining', year: '2020', topic: 'Criminal Justice', summary: 'Explores the concept of plea bargaining within the Nigerian criminal justice system and its implications.', imageId: 'book-cover-1' },
];


export default function BooksPage() {
    return (
        <>
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">Books</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Authored and co-authored books on various legal subjects.</p>
                </div>
            </section>

            <section className="py-16 lg:py-24">
                <div className="container">
                    <Card className="mb-8 p-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-grow">
                                <Input placeholder="Search books by title or keyword..." />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />
                                <Select>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Filter by Topic" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="legal-practice">Legal Practice</SelectItem>
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
                                        <SelectItem value="2023">2023</SelectItem>
                                        <SelectItem value="2022">2022</SelectItem>
                                        <SelectItem value="2021">2021</SelectItem>
                                        <SelectItem value="2020">2020</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allBooks.map((book) => {
                             const bookImage = PlaceHolderImages.find(p => p.id === book.imageId);
                             return (
                                <Card key={book.title} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
                                    {bookImage && (
                                        <div className="aspect-[3/4] relative">
                                            <Image
                                               src={bookImage.imageUrl}
                                               alt={book.title}
                                               fill
                                               className="object-cover"
                                               data-ai-hint={bookImage.imageHint}
                                             />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                                            <span>{book.topic}</span>
                                            <span className="font-medium text-accent">{book.year}</span>
                                        </div>
                                        <CardTitle className="font-headline text-xl leading-snug pt-2">{book.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground text-sm">{book.summary}</p>
                                    </CardContent>
                                    <CardFooter>
                                        {book.href ? (
                                            <Button className="w-full" asChild>
                                                <Link href={book.href}>
                                                    <Book className="mr-2 h-4 w-4" />
                                                    View Details
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button className="w-full" asChild>
                                                <a href="/sample.pdf" download>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download Sample Chapter
                                                </a>
                                            </Button>
                                        )}
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
