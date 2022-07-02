export async function ping(): Promise<number> {
  let start = Date.now();

  return Promise.race([
    fetch('p.txt').then(
      () => Date.now() - start,
      () => 500
    ),
    new Promise<number>((_, rejectTimeout) =>
      setTimeout(() => rejectTimeout(new Error()), 500)
    ),
  ]);
}
