import { useState, ChangeEvent, FormEvent } from 'react';

interface AddressInputProps {
    onFetchRewards: (addresses: string[]) => void;
}

export default function AddressInput({ onFetchRewards }: AddressInputProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Parse addresses from textarea (one per line)
        // Trim whitespace and remove empty lines
        const parsedAddresses = input
            .split('\n')
            .map(addr => addr.trim())
            .filter(addr => addr.length > 0);

        if (parsedAddresses.length === 0) {
            alert('Please enter at least one address');
            return;
        }

        // Deduplicate addresses (case-insensitive)
        // Ethereum addresses are case-insensitive, so normalize to lowercase for comparison
        const seenAddresses = new Set<string>();
        const uniqueAddresses: string[] = [];

        for (const address of parsedAddresses) {
            const normalized = address.toLowerCase();
            if (!seenAddresses.has(normalized)) {
                seenAddresses.add(normalized);
                uniqueAddresses.push(address); // Keep original casing
            }
        }

        onFetchRewards(uniqueAddresses);
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <label
                    htmlFor="addresses"
                    style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500'
                    }}
                >
                    Ethereum Addresses (one per line)
                </label>
                <textarea
                    id="addresses"
                    value={input}
                    onChange={handleChange}
                    placeholder="0x1234567890abcdef1234567890abcdef12345678&#10;0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
                    rows={8}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        fontSize: '0.95rem',
                        fontFamily: 'monospace',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        resize: 'vertical'
                    }}
                />
            </div>

            <button
                type="submit"
                style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: '#0070f3',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#0051cc';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#0070f3';
                }}
            >
                Fetch Rewards
            </button>
        </form>
    );
}
