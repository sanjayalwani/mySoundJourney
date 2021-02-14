import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { findByRole, getQueriesForElement, screen, waitFor, within, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Footer from '../../components/MainUI/Footer';

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


test("Has an About and Privacy button", () => {
  
  const { getByText } = getQueriesForElement(testContainer);
  render(<Footer />, testContainer);

  getByText('About');
  getByText('Privacy');
});

describe("The About and Privacy modal opens and closes", () => {
  testContainer = document.createElement('div');
  testContainer.id = 'test-root';
  document.body.appendChild(testContainer);
  const { getByText, findByRole, getByRole } = getQueriesForElement(testContainer);
  render(<Footer />, testContainer);

  let AboutModal, PrivacyModal;

  test("Renders About modal", async () => {
    const AboutButton = getByText('About');
    userEvent.click(AboutButton);
    AboutModal = await findByRole('dialog', {hidden: true});
    expect(AboutModal).toBeTruthy();
    within(AboutModal).getByText('About');
  });

  test("About modal closes", async () => {
    const ModalButton = within(AboutModal).getByRole('button', {hidden: true, label: 'Close'});
    expect(ModalButton).toBeTruthy();

    userEvent.click(ModalButton);
    await waitForElementToBeRemoved(() => getByRole('dialog', {hidden: true}));
  });

  test("Renders Privacy modal", async () => {
    const PrivacyButton = getByText('Privacy');
    userEvent.click(PrivacyButton);
    PrivacyModal = await findByRole('dialog', {hidden: true});
    expect(PrivacyModal).toBeTruthy();
    within(PrivacyModal).getByText('Privacy');
  });

  test("Privacy modal closes", async () => {
    const ModalButton = within(PrivacyModal).getByRole('button', {hidden: true, label: 'Close'});
    expect(ModalButton).toBeTruthy();

    userEvent.click(ModalButton);
    await waitForElementToBeRemoved(() => getByRole('dialog', {hidden: true}));
  });
});
