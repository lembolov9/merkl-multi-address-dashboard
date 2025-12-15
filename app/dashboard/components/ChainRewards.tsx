interface RewardItem {
    tokenSymbol: string;
    claimable: string;
    pending: string;
}

interface ChainRewardsProps {
    chainName: string;
    chainId: number;
    rewards: RewardItem[];
}

export default function ChainRewards({ chainName, chainId, rewards }: ChainRewardsProps) {
    return (
        <div
            style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px'
            }}
        >
            <h4 style={{ marginBottom: '0.75rem', color: '#333' }}>
                {chainName} (Chain ID: {chainId})
            </h4>

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
                                    {reward.claimable}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'right', fontFamily: 'monospace' }}>
                                    {reward.pending}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={{ color: '#999', fontStyle: 'italic' }}>No rewards found</p>
            )}
        </div>
    );
}
