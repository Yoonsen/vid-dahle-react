import React, { useState, useEffect, useCallback } from 'react';
import { Card, ModelType } from '../types/Card';
import { cardService } from '../services/cardService';
import { CardDisplay } from './CardDisplay';

export const CardSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedModel, setSelectedModel] = useState<ModelType>('llama');
    const [cards, setCards] = useState<Card[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const results = await cardService.searchCards(searchTerm, selectedModel);
            setCards(results);
        } catch (error) {
            console.error('Error searching cards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="row mb-4">
                <div className="col-md-3">
                    <label className="form-label">Select Model:</label>
                    <select
                        value={selectedModel}
                        onChange={(e) => {
                            setSelectedModel(e.target.value as ModelType);
                            if (searchTerm) {
                                handleSearch();
                            }
                        }}
                        className="form-select"
                    >
                        <option value="llama">llama</option>
                        <option value="anthropic">anthropic</option>
                    </select>
                </div>
                
                <div className="col-md-6">
                    <label className="form-label">Search (author/title):</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter search term"
                        className="form-control"
                    />
                </div>
                
                <div className="col-md-3 d-flex align-items-end">
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="btn btn-primary w-100"
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            <div className="bg-white bg-opacity-75 p-4 rounded">
                {cards.length > 0 ? (
                    <div>
                        <div className="mb-3 fw-bold">
                            Showing {cards.length} hits
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {cards.map((card) => (
                                <div key={card.id} className="col">
                                    <CardDisplay card={card} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>No matching cards found.</div>
                )}
            </div>
        </div>
    );
}; 