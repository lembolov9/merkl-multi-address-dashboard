import { NextResponse } from 'next/server';

const MERKL_API_BASE_URL = 'https://api.merkl.xyz';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ address: string }> }
) {
    const { address } = await params;

    try {
        // Fetch all chains
        const chainsResponse = await fetch(`${MERKL_API_BASE_URL}/v4/chains`);
        if (!chainsResponse.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch chains from Merkl API' },
                { status: chainsResponse.status }
            );
        }
        const chains = await chainsResponse.json();

        // Build chainId array from all chains
        const chainIds = chains.map((chain: any) => chain.id);
        const chainIdParams = chainIds.map((id: number) => `chainId=${id}`).join('&');
        const url = `${MERKL_API_BASE_URL}/v4/users/${address}/rewards?${chainIdParams}`;

        const response = await fetch(url);

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch rewards from Merkl API' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
