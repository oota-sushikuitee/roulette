import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DrawLotsPage from '../../app/page';

describe('DrawLotsPage', () => {
  test('renders correctly', () => {
    render(<DrawLotsPage />);
    expect(
      screen.getByPlaceholderText('Enter strings separated by new lines')
    ).toBeInTheDocument();
    expect(screen.getByText('Draw')).toBeInTheDocument();
    expect(screen.getByText('Remove winner from the list')).toBeInTheDocument();
    expect(screen.getByText('Result: No result yet')).toBeInTheDocument();
  });

  test('draws a winner and displays the result', () => {
    render(<DrawLotsPage />);
    const textarea = screen.getByPlaceholderText(
      'Enter strings separated by new lines'
    );
    const drawButton = screen.getByText('Draw');

    fireEvent.change(textarea, { target: { value: 'item1\nitem2\nitem3' } });
    fireEvent.click(drawButton);

    expect(screen.getByText(/^Result:/)).not.toHaveTextContent('No result yet');
  });

  test('removes the winner from the list if the checkbox is checked', () => {
    render(<DrawLotsPage />);
    const textarea = screen.getByPlaceholderText(
      'Enter strings separated by new lines'
    );
    const drawButton = screen.getByText('Draw');
    const checkbox = screen.getByLabelText('Remove winner from the list');

    fireEvent.change(textarea, { target: { value: 'item1\nitem2\nitem3' } });
    fireEvent.click(checkbox);
    fireEvent.click(drawButton);

    expect(textarea).not.toHaveValue('item1\nitem2\nitem3');
  });
});
