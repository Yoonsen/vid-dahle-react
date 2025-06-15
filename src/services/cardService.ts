import { Card, ModelType } from '../types/Card';

let cardsCache: Card[] = [];

export const cardService = {
    async getCards(): Promise<Card[]> {
        if (cardsCache.length > 0) {
            console.log('Using cached cards:', cardsCache.length);
            return cardsCache;
        }

        try {
            console.log('Fetching cards from JSON...');
            const response = await fetch(`${process.env.PUBLIC_URL}/data/cards.json`);
            if (!response.ok) {
                throw new Error('Failed to load cards data');
            }
            const data = await response.json();
            
            // Transform the data to match our Card interface
            cardsCache = data.map((item: any) => ({
                id: item.id.replace('OCR', ''), // Remove OCR from the ID
                model: item.model,
                codes: Array.isArray(item.codes) ? item.codes.join(', ') : item.codes,
                title: item.title,
                author: item.author,
                author_normalized: item.author_normalized,
                place: item.place,
                place_normalized: item.place_normalized,
                place_modernized: item.place_modernized,
                publication_year: item.publication_year,
                year: item.year,
                year_end: item.year_end,
                edition: item.edition,
                notes: item.notes,
                latitude: item.latitude,
                longitude: item.longitude
            }));

            console.log('Loaded cards:', cardsCache.length);
            console.log('First card:', cardsCache[0]);
            return cardsCache;
        } catch (error) {
            console.error('Error loading cards:', error);
            return [];
        }
    },

    async searchCards(searchTerm: string, model: ModelType): Promise<Card[]> {
        console.log('Searching with term:', searchTerm, 'model:', model);
        const cards = await this.getCards();
        if (!searchTerm) {
            console.log('No search term, returning all cards');
            return cards;
        }

        const term = searchTerm.toLowerCase();
        const filtered = cards.filter(card => 
            card.model === model && (
                card.author_normalized.toLowerCase().includes(term) ||
                card.title.toLowerCase().includes(term)
            )
        );
        console.log('Found matches:', filtered.length);
        return filtered;
    },

    getCardImageUrl(cardId: string): string {
        // Use PUBLIC_URL to ensure correct path in all environments
        return `${process.env.PUBLIC_URL}/images/jpg_files/${cardId}OCR.jpg`;
    }
}; 