import ChainRewards from './ChainRewards';

interface RewardItem {
    tokenSymbol: string;
    claimable: bigint;
    pending: bigint;
    decimals: number;
    price?: number;
}

interface ChainRewardsData {
    chainName: string;
    chainId: number;
    rewards: RewardItem[];
    totalUSD?: number;
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
                        let rewardsToProcess = chainRewards.rewards;

                        if (showOnlyClaimable) {
                            // Filter out rewards with claimable === 0
                            rewardsToProcess = chainRewards.rewards.filter(
                                (reward) => reward.claimable > 0n
                            );
                        }

                        // Calculate total claimable USD value for this chain
                        const totalUSD = rewardsToProcess.reduce((acc, reward) => {
                            if (reward.price && reward.claimable > 0n) {
                                const amountFloat = Number(reward.claimable) / Math.pow(10, reward.decimals);
                                return acc + (amountFloat * reward.price);
                            }
                            return acc;
                        }, 0);

                        return {
                            ...chainRewards,
                            rewards: rewardsToProcess,
                            totalUSD
                        };
                    })
                    .filter((chainRewards) => chainRewards.rewards.length > 0)
                    // Sort chains by totalUSD in descending order
                    .sort((a, b) => b.totalUSD - a.totalUSD);

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
                                totalUSD={chainRewards.totalUSD ?? 0}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
