import React from 'react';
import { Card } from '../types/Card';
import { cardService } from '../services/cardService';

interface CardDisplayProps {
    card: Card;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
    const imageUrl = cardService.getCardImageUrl(card.id);

    return (
        <div className="card h-100">
            <div className="row g-0 h-100">
                <div className="col-md-6">
                    <img
                        src={imageUrl}
                        alt={`Card ${card.id}`}
                        className="img-fluid h-100 object-fit-contain"
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">Card {card.id}</h5>
                        <p className="card-text mb-1"><small className="text-muted">Codes:</small> {card.codes}</p>
                        <p className="card-text mb-1"><small className="text-muted">Title:</small> {card.title}</p>
                        <p className="card-text mb-1"><small className="text-muted">Author:</small> {card.author} → {card.author_normalized}</p>
                        <p className="card-text mb-1"><small className="text-muted">Place:</small> {card.place} → {card.place_normalized} → {card.place_modernized}</p>
                        <p className="card-text mb-1"><small className="text-muted">Year/Edition:</small> {card.publication_year} → {card.year} → {card.year_end}/ {card.edition}</p>
                        <p className="card-text mb-1"><small className="text-muted">Notes:</small> {card.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}; 