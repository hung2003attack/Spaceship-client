import '@testing-library/jest-dom';
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '~/redux/configStore';
const ReduxWrapper: React.FC<{ children: any }> = ({ children }) => <Provider store={store}>{children}</Provider>;
test('shows the children when the checkbox is checked', async () => {
    const testMessage = 'Test Message';
    await act(async () => {
        render(<App />, { wrapper: ReduxWrapper });
        // Thực hiện tác vụ bất đồng bộ, chẳng hạn như fetching data từ API hoặc resolving promise
    });
    // query* functions will return the element or null if it cannot be found
    // get* functions will return the element or throw an error if it cannot be found

    // the queries can accept a regex to make your selectors more resilient to content tweaks and changes.

    // .toBeInTheDocument() is an assertion that comes from jest-dom
    // otherwise you could use .toBeDefined()
    const foundElement = await screen.findByText((content, element) => {
        // Kiểm tra nếu văn bản chứa 'Test Message'
        if (element && element.textContent === testMessage) {
            return true;
        }
        // Kiểm tra nếu văn bản bao gồm 'Test Message' trong một phần tử khác
        if (content.includes(testMessage)) {
            return true;
        }
        return false;
    });

    expect(foundElement).toBeInTheDocument();
});
