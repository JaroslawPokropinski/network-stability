export async function ping(): Promise<number> {
  const headers = new Headers();
  headers.append('pragma', 'no-cache');
  headers.append('cache-control', 'no-cache');

  let start = Date.now();

  return Promise.race([
    fetch('p.txt', { headers }).then(
      () => Date.now() - start,
      () => 500
    ),
    new Promise<number>((_, rejectTimeout) =>
      setTimeout(() => rejectTimeout(new Error()), 500)
    ),
  ]);
}
