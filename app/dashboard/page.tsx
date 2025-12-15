'use client';

import { useState, useEffect } from 'react';
import AddressInput from './components/AddressInput';
import RewardsDisplay from './components/RewardsDisplay';

interface Chain {
    id: number;
    name: string;
    icon: string;
    liveCampaigns: number;
}

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

export default function DashboardPage() {
    const [addresses, setAddresses] = useState<string[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [chains, setChains] = useState<Chain[]>([]);
    const [rewardsData, setRewardsData] = useState<Map<string, ChainRewards[]>>(new Map());
    const [showOnlyClaimable, setShowOnlyClaimable] = useState(false);

    // Fetch chains on mount
    useEffect(() => {
        const fetchChains = async () => {
            try {
                const response = await fetch('https://api.merkl.xyz/v4/chains');
                const data = await response.json();
                setChains(data);
            } catch (error) {
                console.error('Error fetching chains:', error);
            }
        };

        fetchChains();
    }, []);

    // Helper function to transform API response to display format
    const transformRewardsResponse = (apiResponse: any[]): ChainRewards[] => {
        return apiResponse
            .map((chainData) => {
                const rewardItems: RewardItem[] = chainData.rewards.map((reward: any) => {
                    const decimals = reward.token.decimals;
                    const amount = BigInt(reward.amount || '0');
                    const claimed = BigInt(reward.claimed || '0');
                    const pending = BigInt(reward.pending || '0');

                    const claimable = amount - claimed;

                    return {
                        tokenSymbol: reward.token.symbol,
                        claimable: (Number(claimable) / Math.pow(10, decimals)).toFixed(4),
                        pending: (Number(pending) / Math.pow(10, decimals)).toFixed(4)
                    };
                });

                return {
                    chainName: chainData.chain.name,
                    chainId: chainData.chain.id,
                    rewards: rewardItems
                };
            })
            .filter((chainRewards) => chainRewards.rewards.length > 0);
    };

    const handleFetchRewards = async (addressList: string[]) => {
        setAddresses(addressList);
        setHasSearched(true);

        const newRewardsData = new Map<string, ChainRewards[]>();

        // Fetch rewards for each address across all chains
        for (const address of addressList) {
            try {
                const response = await fetch(`/api/rewards/${address}`);
                const data = await response.json();

                const transformedRewards = transformRewardsResponse(data);
                newRewardsData.set(address, transformedRewards);
            } catch (error) {
                console.error(`Error fetching rewards for ${address}:`, error);
            }
        }

        setRewardsData(newRewardsData);
    };

    return (
        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Merkl Rewards Dashboard</h1>
            <p style={{ marginTop: '0.5rem', marginBottom: '2rem', color: '#666' }}>
                Enter Ethereum addresses to view their Merkl rewards
            </p>

            <AddressInput onFetchRewards={handleFetchRewards} />

            {hasSearched && rewardsData.size > 0 && (
                <>
                    <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}>
                            <input
                                type="checkbox"
                                checked={showOnlyClaimable}
                                onChange={(e) => setShowOnlyClaimable(e.target.checked)}
                                style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '1rem', fontWeight: '500' }}>
                                Show only claimable
                            </span>
                        </label>
                    </div>
                    <RewardsDisplay addressRewards={rewardsData} showOnlyClaimable={showOnlyClaimable} />
                </>
            )}
        </main>
    );
}
