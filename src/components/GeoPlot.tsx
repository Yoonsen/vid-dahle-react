import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cardService } from '../services/cardService';

// Fix default marker icon issue in Leaflet + Webpack
const iconUrl = require('leaflet/dist/images/marker-icon.png');
const iconShadowUrl = require('leaflet/dist/images/marker-shadow.png');
const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface CardGeo {
  id: string;
  latitude: number;
  longitude: number;
  label: string;
  model: string;
}

type ModelType = 'llama' | 'anthropic';

const GeoPlot: React.FC = () => {
  const [points, setPoints] = useState<CardGeo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<ModelType>('llama');

  useEffect(() => {
    const fetchAndExtract = async () => {
      setLoading(true);
      const cards = await cardService.getCards();
      // Filter by model first
      const filtered = cards.filter(card => card.model === selectedModel);
      // Group by unique (latitude, longitude, label)
      const placeMap = new Map<string, CardGeo>();
      filtered.forEach(card => {
        const lat = (card as any).latitude;
        const lng = (card as any).longitude;
        if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) return;
        const label = (card as any).place_modernized?.trim() || card.place?.trim() || '(no place)';
        const key = `${lat},${lng},${label}`;
        if (!placeMap.has(key)) {
          placeMap.set(key, { id: card.id, latitude: lat, longitude: lng, label, model: card.model });
        }
      });
      const pts = Array.from(placeMap.values());
      console.log(`GeoPlot: plotting ${pts.length} unique places for model '${selectedModel}'`);
      setPoints(pts);
      setLoading(false);
    };
    fetchAndExtract();
  }, [selectedModel]);

  // Center on Madagascar, but zoom out to show Norway and Middle East
  const center: [number, number] = [-18.766947, 46.869107];
  const zoom = 2.5;

  return (
    <div className="app-content">
      <h2>Geo Plot</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="model-select" style={{ marginRight: '0.5rem' }}>Select Model:</label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={e => setSelectedModel(e.target.value as ModelType)}
          style={{ padding: '0.3rem 1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="llama">llama</option>
          <option value="anthropic">anthropic</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem', color: '#007bff', fontWeight: 500 }}>
        Showing {points.length} unique places for model <span style={{ textTransform: 'capitalize' }}>{selectedModel}</span>.
      </div>
      {loading ? (
        <p>Loading map...</p>
      ) : (
        <>
          <MapContainer center={center} zoom={zoom} style={{ height: '600px', width: '100%', borderRadius: '16px' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map(point => (
              <Marker key={point.id + point.latitude + point.longitude} position={[point.latitude, point.longitude]}>
                <Popup>
                  <strong>{point.label}</strong>
                  <br />
                  Card ID: {point.id}
                  <br />
                  Model: {point.model}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          {/* Debug table for first 10 points */}
          <div style={{ marginTop: '2rem' }}>
            <h3>Debug: First 10 Unique Places</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.3rem' }}>ID</th>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.3rem' }}>Model</th>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.3rem' }}>Latitude</th>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.3rem' }}>Longitude</th>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.3rem' }}>Label</th>
                </tr>
              </thead>
              <tbody>
                {points.slice(0, 10).map(pt => (
                  <tr key={pt.id + pt.latitude + pt.longitude}>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.3rem' }}>{pt.id}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.3rem' }}>{pt.model}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.3rem' }}>{pt.latitude}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.3rem' }}>{pt.longitude}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.3rem' }}>{pt.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Showing up to 10 unique places for debugging.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default GeoPlot; 