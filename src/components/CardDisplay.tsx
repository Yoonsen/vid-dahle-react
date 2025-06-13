import React from 'react';
import { Card } from '../types/Card';
import { cardService } from '../services/cardService';

interface CardDisplayProps {
    card: Card;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
    const imageUrl = cardService.getCardImageUrl(card.id);

    return (
        <div style={{
            display: 'inline-block',
            margin: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            width: '600px'
        }}>
            <div style={{ display: 'flex' }}>
                {/* Image column */}
                <div style={{ width: '50%' }}>
                    <img 
                        src={imageUrl} 
                        alt={`Card ${card.id}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </div>
                
                {/* Info column */}
                <div style={{ 
                    width: '50%', 
                    padding: '12px',
                    fontSize: '0.875rem'
                }}>
                    <p style={{ marginBottom: '4px' }}><strong>ID:</strong> {card.id}</p>
                    <p style={{ marginBottom: '4px' }}><strong>Codes:</strong> {card.codes}</p>
                    <p style={{ marginBottom: '4px' }}><strong>Title:</strong> {card.title}</p>
                    <p style={{ marginBottom: '4px' }}><strong>Author:</strong> {card.author} → {card.author_normalized}</p>
                    <p style={{ marginBottom: '4px' }}><strong>Place:</strong> {card.place} → {card.place_normalized} → {card.place_modernized}</p>
                    <p style={{ marginBottom: '4px' }}><strong>Year/Edition:</strong> {card.publication_year} → {card.year} → {card.year_end}/ {card.edition}</p>
                    <p style={{ marginBottom: '4px' }}><strong>Notes:</strong> {card.notes}</p>
                </div>
            </div>
        </div>
    );
}; 