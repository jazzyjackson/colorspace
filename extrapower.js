function power(a, b, prime) {
    if (b <= 0) {
        return 1;
    } else if (b === 1) {
        return a % prime;
    } else if (b % 2 === 0) {
        return power((a * a) % prime, b / 2 | 0, prime) % prime;
    } else {
        return (power((a * a) % prime, b / 2 | 0, prime) * a) % prime;
    }
}