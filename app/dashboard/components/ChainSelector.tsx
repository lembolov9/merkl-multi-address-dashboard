import { ChangeEvent } from 'react';

interface Chain {
    id: number;
    name: string;
    icon: string;
    liveCampaigns: number;
}

interface ChainSelectorProps {
    chains: Chain[];
    selectedChainId: number;
    onChainChange: (chainId: number) => void;
}

export default function ChainSelector({ chains, selectedChainId, onChainChange }: ChainSelectorProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChainChange(Number(e.target.value));
    };

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label
                htmlFor="chain-selector"
                style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                }}
            >
                Select Chain
            </label>
            <select
                id="chain-selector"
                value={selectedChainId}
                onChange={handleChange}
                style={{
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    minWidth: '200px'
                }}
            >
                {chains.map((chain) => (
                    <option key={chain.id} value={chain.id}>
                        {chain.name} (Chain ID: {chain.id})
                    </option>
                ))}
            </select>
        </div>
    );
}
