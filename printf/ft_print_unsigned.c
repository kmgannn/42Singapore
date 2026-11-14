#include "ft_printf.h"

int ft_print_unsigned(unsigned int n, unsigned int base, int uppercase)
{
    int     count;
    char    *symbols;

    if (uppercase)
        symbols = "0123456789ABCDEF";
    else
        symbols = "0123456789abcdef";
    count = 0;
    if (n >= base)
        count += ft_print_unsigned(n / base, base, uppercase);
    count += ft_print_char(symbols[n % base]);
    return (count);
}