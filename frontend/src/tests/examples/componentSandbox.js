import { unmountComponentAtNode } from 'react-dom';

let testContainer = null;

beforeEach(() => {
    testContainer = document.createElement('div');
    testContainer.id = 'test-root';
    document.body.appendChild(testContainer);
});

afterEach(() => {
    unmountComponentAtNode(testContainer);
    testContainer.remove();
    testContainer = null;
});
