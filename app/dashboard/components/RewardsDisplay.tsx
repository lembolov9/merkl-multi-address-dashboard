interface RewardItem {
    tokenSymbol: string;
    claimable: string;
    pending: string;
}

interface ChainRewards {
    chainName: string;
    chainId: number;
    rewards: RewardItem[];
}

interface RewardsDisplayProps {
    addressRewards: Map<string, ChainRewards[]>;
    showOnlyClaimable: boolean;
}

export default function RewardsDisplay({ addressRewards, showOnlyClaimable }: RewardsDisplayProps) {
    return (
        <div style={{ marginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Rewards</h2>

            {Array.from(addressRewards.entries()).map(([address, chainRewardsList]) => {
                // Filter chains and rewards based on showOnlyClaimable flag
                const filteredChains = chainRewardsList
                    .map((chainRewards) => {
                        if (!showOnlyClaimable) {
                            return chainRewards;
                        }

                        // Filter out rewards with claimable === '0.0000'
                        const filteredRewards = chainRewards.rewards.filter(
                            (reward) => parseFloat(reward.claimable) > 0
                        );

                        return {
                            ...chainRewards,
                            rewards: filteredRewards
                        };
                    })
                    .filter((chainRewards) => chainRewards.rewards.length > 0);

                // If no chains have rewards after filtering, don't render this address
                if (filteredChains.length === 0) {
                    return null;
                }

                return (
                    <div
                        key={address}
                        style={{
                            marginBottom: '2rem',
                            padding: '1.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <h3 style={{
                            marginBottom: '1rem',
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            wordBreak: 'break-all'
                        }}>
                            {address}
                        </h3>

                        {filteredChains.map((chainRewards) => (
                            <div
                                key={chainRewards.chainId}
                                style={{
                                    marginBottom: '1.5rem',
                                    padding: '1rem',
                                    backgroundColor: 'white',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '4px'
                                }}
                            >
                                <h4 style={{ marginBottom: '0.75rem', color: '#333' }}>
                                    {chainRewards.chainName} (Chain ID: {chainRewards.chainId})
                                </h4>

                                {chainRewards.rewards.length > 0 ? (
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid #ddd' }}>
                                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Token</th>
                                                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Claimable</th>
                                                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Pending</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chainRewards.rewards.map((reward, idx) => (
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
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
