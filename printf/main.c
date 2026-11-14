#include "ft_printf.h"
#include <stdio.h>
#include <limits.h>

int main(void)
{
    int ret1;
    int ret2;

    printf("=== TESTING CONVERSION SPECIFIERS ===\n\n");

    // 1. Characters and Strings (%c, %s)
    ret1 = ft_printf("FT -> Char: %c | Str: %s | Percent: %%\n", 'A', "Hello 42");
    ret2 =    printf("OR -> Char: %c | Str: %s | Percent: %%\n", 'A', "Hello 42");
    printf("[Return] ft: %d | orig: %d\n\n", ret1, ret2);

    // 2. Null Strings and Edge Cases (%s)
    ret1 = ft_printf("FT -> Null String: %s\n", (char *)NULL);
    ret2 =    printf("OR -> Null String: %s\n", (char *)NULL);
    printf("[Return] ft: %d | orig: %d\n\n", ret1, ret2);

    // 3. Signed Decimals and Integers (%d, %i)
    ret1 = ft_printf("FT -> Dec: %d | Int: %i | Min: %d | Max: %d\n", 42, -42, INT_MIN, INT_MAX);
    ret2 =    printf("OR -> Dec: %d | Int: %i | Min: %d | Max: %d\n", 42, -42, INT_MIN, INT_MAX);
    printf("[Return] ft: %d | orig: %d\n\n", ret1, ret2);

    // 4. Unsigned Numbers (%u)
    ret1 = ft_printf("FT -> Unsigned: %u | Max: %u\n", 0U, 4294967295U);
    ret2 =    printf("OR -> Unsigned: %u | Max: %u\n", 0U, 4294967295U);
    printf("[Return] ft: %d | orig: %d\n\n", ret1, ret2);

    // 5. Hexadecimals lowercase and uppercase (%x, %X)
    ret1 = ft_printf("FT -> Hex low: %x | Hex high: %X\n", 48879, 48879);
    ret2 =    printf("OR -> Hex low: %x | Hex high: %X\n", 48879, 48879);
    printf("[Return] ft: %d | orig: %d\n\n", ret1, ret2);

    // 6. Pointers and Null Pointers (%p)
    int x = 42;
    ret1 = ft_printf("FT -> Ptr: %p | Null Ptr: %p\n", &x, (void *)NULL);
    ret2 =    printf("OR -> Ptr: %p | Null Ptr: %p\n", &x, (void *)NULL);
    printf("[Return] ft: %d | orig: %d\n\n", ret1, ret2);

    return (0);
}