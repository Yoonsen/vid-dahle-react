export type ModelType = 'llama' | 'anthropic';

export interface Card {
    id: string;
    codes: string;
    title: string;
    author: string;
    author_normalized: string;
    place: string;
    place_normalized: string;
    place_modernized: string;
    publication_year: string;
    year: string;
    year_end: string;
    edition: string;
    notes: string;
    model: ModelType;
} 