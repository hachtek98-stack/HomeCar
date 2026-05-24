import React from 'react';
import { Text, View, Button } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import { AppProvider, useAppContext } from '../AppContext';

const TestComponent = () => {
  const { requests, addRequest, updateRequestPayment, acceptRequest, completeRequest } = useAppContext();

  return (
    <View>
      <Text testID="request-count">{requests.length}</Text>
      <Button
        testID="add-btn"
        title="Add"
        onPress={() => addRequest({ patientId: 'p2', patientName: 'Bob' })}
      />
      {requests.map((req, index) => (
        <View key={req.id || index} testID={`req-view-${index}`}>
          <Text testID={`req-${index}-payment`}>{req.paymentStatus}</Text>
          <Text testID={`req-${index}-status`}>{req.status}</Text>
          <Text testID={`req-${index}-nurse`}>{req.nurseId || 'none'}</Text>

          <Button
            testID={`pay-btn-${index}`}
            title="Pay"
            onPress={() => updateRequestPayment(req.id)}
          />
          <Button
            testID={`pay-btn-invalid-${index}`}
            title="Pay Invalid"
            onPress={() => updateRequestPayment('invalid')}
          />
          <Button
            testID={`accept-btn-${index}`}
            title="Accept"
            onPress={() => acceptRequest(req.id, 'n1')}
          />
          <Button
            testID={`accept-btn-invalid-${index}`}
            title="Accept Invalid"
            onPress={() => acceptRequest('invalid', 'n1')}
          />
          <Button
            testID={`complete-btn-${index}`}
            title="Complete"
            onPress={() => completeRequest(req.id)}
          />
          <Button
            testID={`complete-btn-invalid-${index}`}
            title="Complete Invalid"
            onPress={() => completeRequest('invalid')}
          />
        </View>
      ))}
    </View>
  );
};

describe('AppContext', () => {
  it('provides initial state correctly', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(getByTestId('request-count').props.children).toBe(1);
    expect(getByTestId('req-0-payment').props.children).toBe('paid');
    expect(getByTestId('req-0-status').props.children).toBe('pending');
    expect(getByTestId('req-0-nurse').props.children).toBe('none');
  });

  it('adds a new request correctly', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.press(getByTestId('add-btn'));

    expect(getByTestId('request-count').props.children).toBe(2);
    expect(getByTestId('req-1-payment').props.children).toBe('pending');
    expect(getByTestId('req-1-status').props.children).toBe('pending');
    expect(getByTestId('req-1-nurse').props.children).toBe('none');
  });

  it('updates payment status correctly and ignores invalid IDs', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.press(getByTestId('add-btn'));
    expect(getByTestId('req-1-payment').props.children).toBe('pending');

    fireEvent.press(getByTestId('pay-btn-invalid-1'));
    expect(getByTestId('req-1-payment').props.children).toBe('pending');

    fireEvent.press(getByTestId('pay-btn-1'));
    expect(getByTestId('req-1-payment').props.children).toBe('paid');
  });

  it('accepts a request correctly and ignores invalid IDs', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(getByTestId('req-0-status').props.children).toBe('pending');
    expect(getByTestId('req-0-nurse').props.children).toBe('none');

    fireEvent.press(getByTestId('accept-btn-invalid-0'));
    expect(getByTestId('req-0-status').props.children).toBe('pending');

    fireEvent.press(getByTestId('accept-btn-0'));

    expect(getByTestId('req-0-status').props.children).toBe('accepted');
    expect(getByTestId('req-0-nurse').props.children).toBe('n1');
  });

  it('completes a request correctly and ignores invalid IDs', () => {
    const { getByTestId } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.press(getByTestId('complete-btn-invalid-0'));
    expect(getByTestId('req-0-status').props.children).toBe('pending');

    fireEvent.press(getByTestId('complete-btn-0'));
    expect(getByTestId('req-0-status').props.children).toBe('completed');
  });
});
