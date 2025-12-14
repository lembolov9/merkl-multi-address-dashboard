interface ResultsPlaceholderProps {
    addresses: string[];
}

export default function ResultsPlaceholder({ addresses }: ResultsPlaceholderProps) {
    return (
        <div
            style={{
                marginTop: '2rem',
                padding: '1.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9'
            }}
        >
            <h2 style={{ marginBottom: '1rem' }}>Results</h2>

            {addresses.length > 0 ? (
                <div>
                    <p style={{ marginBottom: '1rem', color: '#666' }}>
                        Showing {addresses.length} unique address{addresses.length !== 1 ? 'es' : ''}:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {addresses.map((address, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: '0.75rem',
                                    marginBottom: '0.5rem',
                                    backgroundColor: 'white',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '4px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <span style={{ color: '#666', marginRight: '1rem' }}>
                                    #{index + 1}
                                </span>
                                {address}
                            </li>
                        ))}
                    </ul>
                    <div
                        style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            backgroundColor: '#fff3cd',
                            border: '1px solid #ffc107',
                            borderRadius: '4px',
                            color: '#856404'
                        }}
                    >
                        <strong>Note:</strong> Reward fetching logic is not implemented yet.
                        This is a placeholder for displaying results.
                    </div>
                </div>
            ) : (
                <p style={{ color: '#999', fontStyle: 'italic' }}>
                    No addresses to display
                </p>
            )}
        </div>
    );
}
