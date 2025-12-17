import { useState } from 'react';

interface RewardItem {
    tokenSymbol: string;
    claimable: bigint;
    pending: bigint;
    decimals: number;
    price?: number;
}

interface ChainRewardsProps {
    chainName: string;
    chainId: number;
    rewards: RewardItem[];
    totalUSD: number;
}

export default function ChainRewards({ chainName, chainId, rewards, totalUSD }: ChainRewardsProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Helper to format BigInt amount to string with 4 decimals
    const formatAmount = (amount: bigint, decimals: number): string => {
        const divisor = BigInt(10 ** decimals);
        const integerPart = amount / divisor;
        const fractionalPart = amount % divisor;

        // Pad fractional part with leading zeros if needed
        let fractionalStr = fractionalPart.toString().padStart(decimals, '0');

        // Truncate to 4 decimal places
        fractionalStr = fractionalStr.substring(0, 4);

        return `${integerPart}.${fractionalStr}`;
    };

    // Format the totalUSD received from props
    const formattedTotalUSD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(totalUSD);

    return (
        <div
            style={{
                marginBottom: '1.5rem',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden'
            }}
        >
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    padding: '1rem',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    userSelect: 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        display: 'inline-block',
                        fontSize: '0.8rem'
                    }}>
                        ▶
                    </span>
                    <h4 style={{ margin: 0, color: '#333' }}>
                        {chainName} <span style={{ color: '#666', fontWeight: 'normal', fontSize: '0.9em' }}>(Chain ID: {chainId})</span>
                    </h4>
                </div>
                <div style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                    {formattedTotalUSD}
                </div>
            </div>

            {isExpanded && (
                <div style={{ padding: '1rem', borderTop: '1px solid #e0e0e0' }}>
                    {rewards.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #ddd' }}>
                                    <th style={{ padding: '0.5rem', textAlign: 'left' }}>Token</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right' }}>Claimable</th>
                                    <th style={{ padding: '0.5rem', textAlign: 'right' }}>Pending</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rewards.map((reward, idx) => (
                                    <tr
                                        key={idx}
                                        style={{ borderBottom: '1px solid #eee' }}
                                    >
                                        <td style={{ padding: '0.5rem', fontWeight: '500' }}>
                                            {reward.tokenSymbol}
                                        </td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', fontFamily: 'monospace' }}>
                                            {formatAmount(reward.claimable, reward.decimals)}
                                        </td>
                                        <td style={{ padding: '0.5rem', textAlign: 'right', fontFamily: 'monospace' }}>
                                            {formatAmount(reward.pending, reward.decimals)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ color: '#999', fontStyle: 'italic' }}>No rewards found</p>
                    )}
                </div>
            )}
        </div>
    );
}
