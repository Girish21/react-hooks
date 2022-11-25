import '@testing-library/jest-dom/extend-expect'

import {fetch} from 'cross-fetch'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

global.fetch = fetch

vi.stubGlobal('localStorage', localStorageMock)
