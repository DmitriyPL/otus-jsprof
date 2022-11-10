export function merge_sort(A) {

  if (A.length === 1 || A.length === 0) {
    return A;
  }

  const mid = Math.floor(A.length / 2);
  let L = merge_sort(A.slice(0, mid));
  let R = merge_sort(A.slice(mid));

  let C = merge(L, R);

  for (let i = 0; i < A.length; i++) {
    A[i] = C[i];
  }

  return A;
}

export function merge(L, R){

  let n = 0;
  let m = 0;
  let k = 0;

  const lengthL = L.length;
  const lengthR = R.length;

  let C = new Array(lengthL + lengthR).fill(0);

  while (n < lengthL && m < lengthR) {
    if (L[n] <= R[m]) {
      C[k] = L[n];
      n++;
    } else {
      C[k] = R[m];
      m++;
    }
    k++;
  }

  while (n < lengthL) {
    C[k] = L[n];
    n++;
    k++;
  }

  while (m < lengthR) {
    C[k] = R[m];
    m++;
    k++;
  }

  return C;

}