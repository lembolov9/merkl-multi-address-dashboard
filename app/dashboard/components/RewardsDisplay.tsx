import ChainRewards from './ChainRewards';

interface RewardItem {
    tokenSymbol: string;
    claimable: string;
    pending: string;
}

interface ChainRewardsData {
    chainName: string;
    chainId: number;
    rewards: RewardItem[];
}

interface RewardsDisplayProps {
    addressRewards: Map<string, ChainRewardsData[]>;
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
                            <ChainRewards
                                key={chainRewards.chainId}
                                chainName={chainRewards.chainName}
                                chainId={chainRewards.chainId}
                                rewards={chainRewards.rewards}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
