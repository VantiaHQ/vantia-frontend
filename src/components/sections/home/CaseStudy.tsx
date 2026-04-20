import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { AppImages } from '@/lib/appImages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instrument_Serif } from 'next/font/google';
import { caseStudies } from '@/components/sections/home/CaseStudy.content';
import type { CaseStudyItem } from '@/components/sections/home/CaseStudy.content';

const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400' });

function CaseStudyCard({ content }: { content: CaseStudyItem }) {
    const caseStudyImage = AppImages.find((img) => img.id === content.imageId);
    if (!caseStudyImage) return null;

    return (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl lg:h-full">
                <Image
                    src={caseStudyImage.imageUrl}
                    alt={caseStudyImage.description}
                    data-ai-hint={caseStudyImage.imageHint}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-semibold text-white/80">{content.challenge.title}</h3>
                    <p className="mt-2 text-foreground/90">{content.challenge.text}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-white/80">{content.solution.title}</h3>
                    <p className="mt-2 text-foreground/90">{content.solution.text}</p>
                </div>
                <blockquote className="relative border-l-4 border-primary pl-6 py-6 text-white/80">
                    <p className={`text-3xl ${instrumentSerif.className}`}>"{content.quote.text}"</p>
                    <footer className="mt-4 text-base font-light text-foreground/80">- {content.quote.author}</footer>
                </blockquote>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-white/90">{content.results.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3 text-white/90">{content.results.keyResultsTitle}</h4>
                            <ul className="space-y-2">
                                {content.results.items.map((result, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-white/90" />
                                        <span>{result}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 text-white/90">{content.modules.title}</h4>
                            <div className="flex flex-wrap gap-2">
                                {content.modules.items.map((module) => (
                                    <Badge key={module} variant="secondary">{module}</Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function CaseStudy() {
    const visibleStudies = caseStudies.filter((c) =>
        AppImages.some((img) => img.id === c.imageId)
    );

    if (visibleStudies.length === 0) return null;

    return (
        <section id="case-study" className="py-20 sm:py-28">
            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <span className="block text-base font-light uppercase tracking-widest text-white/40 mb-2">
                        Casos de éxito
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Lo que hemos logrado con nuestros clientes
                    </h2>
                </div>
                <div className="space-y-24">
                    {visibleStudies.map((content, index) => (
                        <div key={index}>
                            <div className="mx-auto max-w-4xl text-center mb-10">
                                <h3 className="text-2xl font-bold text-white">{content.title}</h3>
                                <p className="mt-2 text-lg font-light text-white/60">{content.subtitle}</p>
                            </div>
                            <CaseStudyCard content={content} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
