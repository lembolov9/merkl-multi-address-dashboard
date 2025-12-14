'use client';

import { useState } from 'react';
import AddressInput from './components/AddressInput';
import ResultsPlaceholder from './components/ResultsPlaceholder';

export default function DashboardPage() {
    const [addresses, setAddresses] = useState<string[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleFetchRewards = (addressList: string[]) => {
        setAddresses(addressList);
        setHasSearched(true);
        // TODO: Fetch rewards logic will go here
        console.log('Fetching rewards for addresses:', addressList);
    };

    return (
        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Merkl Rewards Dashboard</h1>
            <p style={{ marginTop: '0.5rem', marginBottom: '2rem', color: '#666' }}>
                Enter Ethereum addresses to view their Merkl rewards
            </p>

            <AddressInput onFetchRewards={handleFetchRewards} />

            {hasSearched && (
                <ResultsPlaceholder addresses={addresses} />
            )}
        </main>
    );
}
