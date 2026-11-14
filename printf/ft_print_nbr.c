#include "ft_printf.h"

int ft_print_nbr(long n, int base, int uppercase)
{
    int     count;
    char    *symbols;

    if (uppercase)
        symbols = "0123456789ABCDEF";
    else
        symbols = "0123456789abcdef";
    count = 0;
    if (n < 0)
    {
        count += ft_print_char('-');
        n = -n;
    }
    if (n >= base)
        count += ft_print_nbr(n / base, base, uppercase);
    count += ft_print_char(symbols[n % base]);
    return (count);
}