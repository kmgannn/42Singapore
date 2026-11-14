#include "ft_printf.h"

int ft_print_str(char *s)
{
    int count;

    if (!s)
        return (ft_print_str("(null)")); // Handles NULL string safety per 42 norm/tests
    count = 0;
    while (s[count])
    {
        ft_print_char(s[count]);
        count++;
    }
    return (count); // Returns total characters printed
}