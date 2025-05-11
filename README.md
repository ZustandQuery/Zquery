<h1 align="left">ZQuery</h1>

###

<div align="center">
  <img height="200" src="https://github.com/user-attachments/assets/a5cfa971-ce43-4b1a-8314-80ebd8b1e835"  />
</div>

###

The `ZQuery` middleware efficiently manages complex asynchronous functions.

###

<h2 align="left">Types</h2>

###

<h3 align="left">Signature</h3>

###

<div align="center">
  <img height="300" src="https://github.com/user-attachments/assets/8bb5329e-2b78-4e54-af83-401e5d3e227c"  />
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
  <img height="400" src="https://github.com/user-attachments/assets/b36b04c7-8751-48d5-a9e2-b1987d0b678f"  />
</div>

Then, while your data is fresh, you can always use it without fetch.

<div align="center">
  <img height="400" src="https://github.com/user-attachments/assets/3de0f31e-95b8-4c41-bcc3-cb63812407ad"  />
</div>
