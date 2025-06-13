import React, { useState } from 'react';
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
        <div style={{ 
            maxWidth: '1300px',
            margin: '0 auto',
            padding: '16px',
            backgroundColor: '#f4ecd8',
            minHeight: '100vh'
        }}>
            <div style={{ 
                display: 'flex',
                alignItems: 'flex-end',
                gap: '16px',
                marginBottom: '24px'
            }}>
                <div style={{ width: '25%' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Select Model:</label>
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value as ModelType)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            height: '38px'
                        }}
                    >
                        <option value="llama">llama</option>
                        <option value="anthropic">anthropic</option>
                    </select>
                </div>
                
                <div style={{ width: '50%' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Search (author/title):</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter search term"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            height: '38px'
                        }}
                    />
                </div>
                
                <div style={{ width: '16.666%' }}>
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '8px',
                            backgroundColor: isLoading ? '#ccc' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            height: '38px'
                        }}
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '16px',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                {cards.length > 0 ? (
                    <div>
                        <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                            Showing {cards.length} hits
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '16px',
                            justifyContent: 'center'
                        }}>
                            {cards.map((card) => (
                                <CardDisplay key={card.id} card={card} />
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