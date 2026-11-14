#include "ft_printf.h"

int ft_print_ptr(void *ptr)
{
    unsigned long long addr;
    int                count;

    if (!ptr)
        return (ft_print_str("(nil)"));
    addr = (unsigned long long)ptr;
    count = ft_print_str("0x");
    count += ft_print_unsigned(addr, 16, 0);
    return (count);
}