<h1 align="left">ZQuery</h1>

###

<div align="center">
  <img height="200" src="https://github.com/user-attachments/assets/f8d06d44-e020-4a30-919c-532fce4dc8fe"  />
</div>

###

The `ZQuery` middleware efficiently manages complex asynchronous functions.

###

<h2 align="left">Types</h2>

###

<h3 align="left">Signature</h3>

###

<div align="center">
  <img height="200" src="https://github.com/user-attachments/assets/5ebef45c-5457-4c04-8be0-e67491a37c73"  />
</div>

###

<h2 align="left">Reference</h2>

###

### `useZQuery(key, queryFn, options)`

###

## Parameters

- `key` : A key name to distinguish fetched data. This key must be in the form of an array.
- `queryFn` : A function that calls data from the server.
- `options` : An object to define query options.
  - optional `staleTime` : Time before the data staled.
  - optional `retry` : Not yet.
  - optional `enable` : Not yet.

## Returns

- `useZQuery` : Return the data and its state.
- `data` : Returns the data received from the server.
- `isLoading` : Returns the state during data fetching.
- `error` : Returns details when an error occurs.

## Usage

First, make a query statement

<div align="center">
  <img height="400" src="https://github.com/user-attachments/assets/9451b9fc-ddfe-45e5-be9e-24f0512aa99e"  />
</div>

Then, while your data is fresh, you can always use it without fetch.

<div align="center">
  <img height="400" src="https://github.com/user-attachments/assets/083e25a4-77e8-412c-9cc0-40cb59f1453e"  />
</div>