jest.setTimeout(100000);

const mockLocalStorage = {};
let mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
mockSetItem.mockImplementation((key, value) => {
  mockLocalStorage[key] = value;
});

let mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
mockGetItem.mockImplementation((key) => {
   return mockLocalStorage[key];
});

let mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');
mockRemoveItem.mockImplementation((key) => {
   mockLocalStorage[key] = null;
});
